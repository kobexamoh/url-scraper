const express = require('express');
const app = express();
const PORT = 3001;
const fetch = require('node-fetch');
const cheerio = require('cheerio');

app.use(express.json());

// Test endpoint for scraping
app.post('/scrape', async (req, res) => {
  const { url, scrapeSubpages } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Helper to resolve relative URLs
  function resolveUrl(base, relative) {
    try {
      return new URL(relative, base).href;
    } catch {
      return relative;
    }
  }

  // Helper to extract and clean content
  function extractSemanticHtml($, contentRoot) {
    const allowedTags = ['h1','h2','h3','h4','h5','h6','p','ul','ol','li','a','button','img','strong','em','b','i','blockquote'];
    contentRoot.find('*').each(function() {
      if (!allowedTags.includes(this.tagName)) {
        $(this).replaceWith($(this).contents());
      }
    });
    const imageCount = contentRoot.find('img').length;
    contentRoot.find('img').remove();
    return {
      semanticHtml: contentRoot.html(),
      imageCount
    };
  }

  // Main scraping logic
  async function scrapePage(pageUrl, isSubpage = false) {
    const response = await fetch(pageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${pageUrl}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const row = $('.row.left-nav-row').first();
    if (!row.length) {
      throw new Error('Main row.left-nav-row not found');
    }
    // Title: use first h1 in main content for top-level, h1 or h2 for subpages
    const mainContent = row.find('.col-12.col-lg-9').first();
    let title = mainContent.find('h1').first().text().trim();
    if (!title && isSubpage) {
      title = mainContent.find('h2').first().text().trim();
    }
    if (!title) {
      title = $('title').text().trim() || 'Untitled';
    }
    const { semanticHtml, imageCount } = extractSemanticHtml($, mainContent.clone());
    return { title, semanticHtml, imageCount };
  }

  // Scrape subpages if requested
  async function scrapeWithSubpages(mainUrl) {
    const response = await fetch(mainUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${mainUrl}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const row = $('.row.left-nav-row').first();
    if (!row.length) {
      throw new Error('Main row.left-nav-row not found');
    }
    // Main content
    const mainContent = row.find('.col-12.col-lg-9').first();
    let title = mainContent.find('h1').first().text().trim();
    if (!title) {
      title = $('title').text().trim() || 'Untitled';
    }
    const { semanticHtml, imageCount } = extractSemanticHtml($, mainContent.clone());
    // Sidebar links
    const sidebar = row.find('.nav-wrapper.col-12.col-lg-3').first();
    const subpageLinks = [];
    sidebar.find('ul.list-group.list-group-flush.ps-4 li.list-group-item a').each((i, el) => {
      const href = $(el).attr('href');
      if (href) {
        subpageLinks.push(resolveUrl(mainUrl, href));
      }
    });
    // Scrape each subpage
    const subpages = [];
    for (const subUrl of subpageLinks) {
      try {
        const subResult = await scrapePage(subUrl, true);
        subpages.push({ url: subUrl, ...subResult });
      } catch (err) {
        subpages.push({ url: subUrl, error: err.message });
      }
    }
    return { title, semanticHtml, imageCount, subpages };
  }

  try {
    let result;
    if (scrapeSubpages) {
      result = await scrapeWithSubpages(url);
    } else {
      const { title, semanticHtml, imageCount } = await scrapePage(url);
      result = { title, semanticHtml, imageCount, subpages: [] };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Scraping failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
