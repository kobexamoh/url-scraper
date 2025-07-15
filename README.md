# Design URL Scraper

A URL scraper for making mockups with real content on work sites.

## Heads up: this is a WIP and only works for certain pages currently as a precursor to wireframing. It's a very specific use case and will (probably) not work for your needs. Do not use it for your work unless you know what you're doing!

## ✨ Features

- 🕷️ **Web Scraping** - Extract semantic HTML from target pages
- 📄 **Subpage Support** - Automatically scrape sidebar links
- 🎨 **Clean Output** - Renders semantic HTML with Tailwind styling
- 📊 **Table Support** - Preserves table structure and formatting
- 📋 **Export Options** - Copy to clipboard or download as HTML file
- 🎯 **Mockup Ready** - Clean content perfect for wireframing and redesign

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/kobexamoh/url-scraper.git
   cd url-scraper
   ```

2. Install dependencies:
   ```bash
   npm install
   cd backend && npm install
   ```

3. Start both servers:
   ```bash
   npm run dev:all
   ```

4. Open http://localhost:5173 to use the scraper

## 🎯 How to Use

1. Enter a URL in the input field
2. Choose whether to scrape sidebar subpages
3. Click "Scrape" to extract content
4. Review the rendered HTML results
5. Use "Copy HTML" or "Download HTML" to export content for mockups

**Note:** Currently optimized for pages with `.row.left-nav-row` structure containing `.col-12.col-lg-9` main content areas.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint your code

## 🏗️ Project Structure

```
url-scraper/
├── backend/           # Express server with scraping logic
├── src/              # React frontend
├── public/           # Static assets
└── package.json      # Frontend dependencies and scripts
```

## 🔧 Customization

### Modifying Tailwind Configuration

Edit `tailwind.config.js` to customize:
- Colour schemes
- Font families
- Container settings
- Animations
- Other theme extensions

### Environment Variables

Create a `.env.local` file in the root directory for local environment variables.

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📄 License

This project is open source and available under the MIT License. Seriously. Remix it! Use your colours instead of mine!
