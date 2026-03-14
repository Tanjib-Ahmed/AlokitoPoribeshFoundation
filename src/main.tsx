import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './context/LanguageContext'
import { CMSProvider } from './context/CMSContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CMSProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CMSProvider>
  </StrictMode>,
)
