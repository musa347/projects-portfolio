import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { OSProvider } from './contexts/OSContext';
import './index.css';
import './os-styles.css';
import App from './App';

// Initialize theme variables on document
const root = document.documentElement;
root.style.setProperty('--primary-color', '#0078d7');
root.style.setProperty('--secondary-color', '#106ebe');
root.style.setProperty('--bg-color', '#f3f3f3');
root.style.setProperty('--text-color', '#000000');
root.style.setProperty('--accent-color', '#0078d7');
root.style.setProperty('--border-radius', '4px');
root.style.setProperty('--font-family', 'system-ui, -apple-system, sans-serif');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OSProvider>
      <App />
    </OSProvider>
  </StrictMode>
);