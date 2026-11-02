import React from 'react'
import ReactDOM from 'react-dom/client'

// Primero los estilos globales, para que los CSS Modules de los componentes puedan sobrescribirlos
import './styles/global.css'
import App from './App'

const root = document.getElementById('root')

if (!root) throw new Error('No se encontró el elemento #root')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
