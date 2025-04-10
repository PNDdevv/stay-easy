import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Điều hướng về trang chính nếu người dùng đã đăng nhập
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset lỗi

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      // Lưu token vào localStorage nếu đăng nhập thành công
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        // Điều hướng về trang chủ
        navigate('/');
      }
    } catch (err) {
      // Xử lý khi không có response hoặc message từ backend
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="text-3xl font-bold text-blue-600">StayEasy</div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Đăng nhập</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="text-sm">Mật khẩu</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm pr-10"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link to="/forgot-password" className="text-blue-600">Quên mật khẩu?</Link>
          <Link to="/register" className="text-blue-600">Tạo tài khoản</Link>
        </div>
      </div>
    </div>
  );
}
