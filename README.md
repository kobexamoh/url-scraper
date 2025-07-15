# Modern React Starter

A modern, opinionated React starter template built with Vite, Tailwind CSS, and best practices configurations. This template provides a robust foundation for building scalable React applications with an excellent developer experience.

## 🚀 Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast build tool
- ⚛️ [React 19](https://react.dev/) - Latest React version with improved features
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - Custom container configurations
  - Responsive padding defaults
  - Custom colour scheme
  - Animation utilities
- 🔧 Modern tooling
  - ESLint configuration for React
  - PostCSS setup
  - Proper Git ignore rules
- 📱 Responsive layouts by default
- 🎯 Optimized production builds

## 📦 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/kobexamoh/modern-react-starter.git your-project-name
   cd your-project-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 to view your application

## 🛠️ Project Structure

```
modern-react-starter/
├── public/             # Static assets
├── src/
│   ├── assets/        # Project assets
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles and Tailwind directives
├── .gitignore         # Git ignore rules
├── index.html         # HTML entry point
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js     # Vite configuration
```

## 🎨 Tailwind Configuration

This template includes a custom Tailwind configuration with:

- Custom colour scheme (primary, secondary, accent)
- Container configurations with responsive padding
- Custom font family configurations
- Animation utilities

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint your code

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
