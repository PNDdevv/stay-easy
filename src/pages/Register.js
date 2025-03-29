import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (email === '' || password === '' || confirmPassword === '') {
      setError('Vui lòng nhập đầy đủ thông tin.');
    } else if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
    } else {
      setError('');
      console.log('Đăng ký thành công với email:', email);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Logo StayEasy */}
        <div className="flex justify-center mb-6">
          <div className="text-3xl font-bold text-blue-600">StayEasy</div>
        </div>

        <h2 className="text-2xl font-semibold text-left mb-6">Đăng ký tài khoản</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md text-sm"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Đăng ký
          </button>
        </form>

        <div className="flex justify-center items-center mt-6">
          <button className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md mr-3 text-sm">
            Đăng ký bằng Google
          </button>
          <button className="flex items-center justify-center bg-blue-800 text-white py-2 px-4 rounded-md text-sm">
            Đăng ký bằng Facebook
          </button>
        </div>

        <div className="text-left mt-6">
          <span className="text-gray-700 text-sm">Đã có tài khoản? </span>
          <Link to="/login" className="text-blue-600 text-sm">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
