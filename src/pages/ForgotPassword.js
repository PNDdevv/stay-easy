import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Vui lòng nhập email.');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/forgot-password`, {
        email,
      });

      setMessage(res.data.message);
      setError('');
      setTimeout(() => navigate('/login'), 3000); // Điều hướng sau 3 giây
    } catch (err) {
      setError(
        err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
      );
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Quên mật khẩu</h2>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm"
              placeholder="Nhập email bạn đã đăng ký"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
