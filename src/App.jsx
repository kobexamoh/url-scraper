import { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // We'll add the actual scraping logic in the next step
    alert(`URL submitted: ${url}`);
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
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Scrape</button>
      </form>
    </div>
  );
}
