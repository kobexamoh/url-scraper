import { useState } from 'react';

function RenderPage({ title, semanticHtml, imageCount, headingLevel = 1 }) {
  const Heading = `h${headingLevel}`;
  return (
    <section className="mb-8 p-4 bg-white rounded shadow">
      <Heading className={`text-${headingLevel === 1 ? '3xl' : '2xl'} font-bold mb-2 text-primary`}>{title}</Heading>
      <div
        className="prose max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-blue-700 prose-h3:text-xl prose-h3:font-semibold prose-h3:text-blue-600"
        dangerouslySetInnerHTML={{ __html: semanticHtml }}
      />
      <div className="mt-2 text-sm text-gray-500">Images on page: {imageCount}</div>
    </section>
  );
}

function generateExportHTML(result) {
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Scraped Content</title>\n<style>\nbody { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }\nh1 { font-size: 2rem; font-weight: bold; color: #0F172A; margin-bottom: 1rem; }\nh2 { font-size: 1.5rem; font-weight: bold; color: #1e40af; margin-bottom: 0.75rem; }\nh3 { font-size: 1.25rem; font-weight: 600; color: #2563eb; margin-bottom: 0.5rem; }\np { margin-bottom: 1rem; }\nul, ol { margin-bottom: 1rem; }\ntable { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }\nth, td { border: 1px solid #ddd; padding: 8px; text-align: left; }\nth { background-color: #f2f2f2; }\n.section { margin-bottom: 2rem; }\n.image-count { font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem; }\n</style>\n</head>\n<body>\n';
  
  // Main page
  html += `<div class="section">\n<h1>${result.title}</h1>\n${result.semanticHtml}\n<div class="image-count">Images on page: ${result.imageCount}</div>\n</div>\n`;
  
  // Subpages
  if (result.subpages && result.subpages.length > 0) {
    html += '<h1>Subpages</h1>\n';
    result.subpages.forEach(sub => {
      if (!sub.error) {
        html += `<div class="section">\n<h2>${sub.title}</h2>\n${sub.semanticHtml}\n<div class="image-count">Images on page: ${sub.imageCount}</div>\n</div>\n`;
      }
    });
  }
  
  html += '</body>\n</html>';
  return html;
}

export default function App() {
  const [url, setUrl] = useState('');
  const [scrapeSubpages, setScrapeSubpages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [exportStatus, setExportStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    setExportStatus('');
    try {
      const res = await fetch('http://localhost:3001/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, scrapeSubpages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    try {
      const html = generateExportHTML(result);
      await navigator.clipboard.writeText(html);
      setExportStatus('Copied to clipboard!');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (err) {
      setExportStatus('Failed to copy to clipboard');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const downloadHTML = () => {
    if (!result) return;
    const html = generateExportHTML(result);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scraped-content.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExportStatus('Downloaded!');
    setTimeout(() => setExportStatus(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">URL Scraper</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded shadow">
        <label className="font-medium">Enter a URL to scrape:</label>
        <input
          type="url"
          className="border p-2 rounded"
          placeholder="https://example.com/page.html"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={scrapeSubpages}
            onChange={e => setScrapeSubpages(e.target.checked)}
          />
          Also scrape sidebar subpages
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? 'Scraping...' : 'Scrape'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">Error: {error}</div>}
      {exportStatus && <div className="mt-4 text-green-600">{exportStatus}</div>}
      {result && (
        <div className="mt-8 w-full max-w-3xl">
          <div className="flex gap-2 mb-4">
            <button onClick={copyToClipboard} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Copy HTML
            </button>
            <button onClick={downloadHTML} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              Download HTML
            </button>
          </div>
          <RenderPage title={result.title} semanticHtml={result.semanticHtml} imageCount={result.imageCount} headingLevel={1} />
          {result.subpages && result.subpages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-primary">Subpages</h2>
              {result.subpages.map((sub, i) =>
                sub.error ? (
                  <div key={sub.url || i} className="mb-4 p-4 bg-red-100 text-red-700 rounded">Error scraping {sub.url}: {sub.error}</div>
                ) : (
                  <RenderPage key={sub.url || i} title={sub.title} semanticHtml={sub.semanticHtml} imageCount={sub.imageCount} headingLevel={2} />
                )
              )}
            </div>
          )}
          <details className="mt-8">
            <summary className="cursor-pointer text-sm text-gray-500">Show raw JSON</summary>
            <pre className="bg-gray-100 p-4 rounded text-xs max-w-2xl overflow-x-auto text-left">
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
