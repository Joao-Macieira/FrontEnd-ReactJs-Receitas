import { useState, useEffect } from 'react';

import axios from '../../services/axios';
import history from '../../services/history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin() {
    const {
      data: { token },
    } = await axios.post('/authenticate');

    localStorage.setItem('token', JSON.stringify(token));
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push('/users');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    axios.defaults.headers.Authorization = undefined;
    history.push('/login');
  }

  return { authenticated, loading, handleLogin, handleLogout };
}
