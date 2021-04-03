import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const { authenticated, loading, handleLogin, handleLogout } = useAuth();

  return (
    <Context.Provider
      value={{ loading, authenticated, handleLogin, handleLogout }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
