import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalContextWrapper from './contexts/GlobalContextsWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalContextWrapper>
      <App />
    </GlobalContextWrapper>
  </React.StrictMode>,
);
