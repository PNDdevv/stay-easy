import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Tạo context
const AuthContext = createContext();

// Provider bao toàn bộ app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Kiểm tra token mỗi khi load lại trang
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      setUser(userInfo);
    }
  }, []);

  // Đăng nhập
  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  // Đăng ký
  const register = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
