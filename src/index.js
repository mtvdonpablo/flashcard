import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Inject global styles dynamically
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
  }
`;
document.head.appendChild(globalStyle);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
