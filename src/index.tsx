import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Ensure this path is correct
import reportWebVitals from './reportWebVitals'; // Optional: Only if you need performance monitoring

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Only if you need performance monitoring
reportWebVitals();