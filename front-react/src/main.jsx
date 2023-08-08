import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { LoadingBarContextProvider } from './context/LoadingBarContext.jsx';
import { UtilsContextProvider } from './context/UtilsContext.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoadingBarContextProvider>
    <UtilsContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </UtilsContextProvider>
  </LoadingBarContextProvider>
);
