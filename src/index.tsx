import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { getBasename } from './lib/marketLocale';
import './theme';
import './i18n';
import './index.css';

// The market prefix in the URL becomes the router basename, so every existing
// <Link to="/about"> resolves to /en/about, /ar-eg/about or /ar-sa/about without
// any per-link changes. Unprefixed paths keep a root basename so local
// development and the SPA fallback still work.
const basename = getBasename(window.location.pathname);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
