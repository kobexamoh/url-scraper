const express = require('express');
const app = express();
const PORT = 3001;
const fetch = require('node-fetch');
const cheerio = require('cheerio');

app.use(express.json());

// Test endpoint for scraping
app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch URL' });
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const mainContent = $('.col-12.col-lg-9').first();
    if (!mainContent.length) {
      return res.status(404).json({ error: 'Main content not found' });
    }
    // Extract semantic HTML (headings, paragraphs, lists, etc.)
    // We'll keep the HTML as-is for now, but only include semantic elements
    const allowedTags = ['h1','h2','h3','h4','h5','h6','p','ul','ol','li','a','button','img','strong','em','b','i','blockquote'];
    // Remove all elements that are not allowed
    mainContent.find('*').each(function() {
      if (!allowedTags.includes(this.tagName)) {
        $(this).replaceWith($(this).contents());
      }
    });
    // Count images
    const imageCount = mainContent.find('img').length;
    // Remove images (if you want to keep only the count)
    mainContent.find('img').remove();
    // Get cleaned HTML
    const semanticHtml = mainContent.html();
    res.json({
      semanticHtml,
      imageCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Scraping failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
