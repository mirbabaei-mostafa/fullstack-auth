import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './utils/i18n.ts';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';
// import { persistor, store } from './app/store';
import { store } from './app/store';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </CookiesProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
