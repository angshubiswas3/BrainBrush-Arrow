import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { runGeneratorTest } from './engine/LevelGenerator';
import './index.css'

// Run the 1000-level verification test on boot
runGeneratorTest();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
