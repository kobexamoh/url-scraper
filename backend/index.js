const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Test endpoint for scraping
app.post('/scrape', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  // Placeholder response for now
  res.json({ message: `Received URL: ${url}` });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
