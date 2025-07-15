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

export default function App() {
  const [url, setUrl] = useState('');
  const [scrapeSubpages, setScrapeSubpages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
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
      {result && (
        <div className="mt-8 w-full max-w-3xl">
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
