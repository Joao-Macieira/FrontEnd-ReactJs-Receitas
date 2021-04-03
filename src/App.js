import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import history from './services/history';

import { AuthProvider } from './Context/AuthContext';

import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';

import Routes from './routes';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} className="toast-container" />
      </Router>
    </AuthProvider>
  );
}

export default App;
