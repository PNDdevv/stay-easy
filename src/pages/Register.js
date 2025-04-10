import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const requiredFields = ['username', 'email', 'password', 'confirmPassword', 'phone', 'gender', 'dateOfBirth', 'address'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError('Vui lòng nhập đầy đủ thông tin.');
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
      });

      setSuccess(res.data.message);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        address: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <div className="text-3xl font-bold text-blue-600">StayEasy</div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Đăng ký tài khoản</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Tên người dùng</label>
              <input
                type="text"
                name="username"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
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

            <div>
              <label className="text-sm">Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm">Nhập lại mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm">Giới tính</label>
              <select
                name="gender"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Chọn</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Ngày sinh</label>
              <input
                type="date"
                name="dateOfBirth"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm">Địa chỉ</label>
              <input
                type="text"
                name="address"
                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50"
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
