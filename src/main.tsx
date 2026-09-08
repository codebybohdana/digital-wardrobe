import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { resetDemoData, seedDemoDataIfEmpty } from './data/seed'

void seedDemoDataIfEmpty()

if (import.meta.env.DEV) {
  Object.assign(window, { resetDemoData })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
