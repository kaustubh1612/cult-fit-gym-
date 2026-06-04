// Gracefully handle environments attempting to mock or override window.fetch
try {
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    let customFetch = originalFetch;
    Object.defineProperty(window, 'fetch', {
      get() {
        return customFetch;
      },
      set(newFetch) {
        customFetch = newFetch;
      },
      enumerable: true,
      configurable: true
    });
  }
} catch (e) {
  console.warn("Prevented crash while preparing window.fetch access descriptor", e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
