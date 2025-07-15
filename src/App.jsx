import { useState } from 'react';

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
        <pre className="mt-4 bg-gray-100 p-4 rounded text-xs max-w-2xl overflow-x-auto text-left">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
