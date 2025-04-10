const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Đảm bảo bạn có models/User.js
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    // Tạo token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
