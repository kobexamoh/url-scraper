import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center space-x-8 mb-8">
            <a 
              href="https://vite.dev" 
              target="_blank"
              className="transition-transform hover:scale-110"
            >
              <img 
                src={viteLogo} 
                className="h-24 w-24 object-contain hover:drop-shadow-lg transition-all" 
                alt="Vite logo" 
              />
            </a>
            <a 
              href="https://react.dev" 
              target="_blank"
              className="transition-transform hover:scale-110"
            >
              <img 
                src={reactLogo} 
                className="h-24 w-24 object-contain hover:drop-shadow-lg transition-all animate-spin-slow" 
                alt="React logo" 
                style={{ animationDuration: '20s' }}
              />
            </a>
          </div>
          
          <h1 className="text-4xl font-bold text-center text-primary mb-6">
            Vite + React + Tailwind
          </h1>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="w-full bg-accent hover:bg-accent/80 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 mb-4"
            >
              Count is {count}
            </button>
            <p className="text-gray-700 text-center">
              Edit <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-sm">src/App.jsx</code> and save to test HMR
            </p>
          </div>
          
          <p className="text-center text-gray-500 text-sm">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
