'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/utils/axiosConfig';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter()

  const loadUserFromCookies = () => {
    const token = Cookies.get('token');
    if (token) {
      axios.get('/api/getuser', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data.data))
        .catch(() => Cookies.remove('token'));
    }
  };

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (username, password, redirectTo) => {
    try {
      const res = await axios.post('/api/login', { username, password });
      if (res.data.token) {
        Cookies.set('token', res.data.token, { expires: 1 });
        setUser(res.data.user);
        enqueueSnackbar(res?.data?.message, { variant: 'success' })
        if (redirectTo) {
          setTimeout(() => {
            loadUserFromCookies()
            router.push(redirectTo)
          }, 500);
        }
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' })
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.refresh()
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
