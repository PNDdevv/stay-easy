const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, phone = '', gender = '', dateOfBirth = '', address = '' } = req.body;

    // Kiểm tra tất cả trường bắt buộc
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập tên người dùng, email và mật khẩu.' });
    }

    // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại.' });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
      dateOfBirth,
      address,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Tạo JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Trả về thông tin người dùng và token
    res.status(201).json({
      message: 'Đăng ký thành công',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        gender: newUser.gender,
        dateOfBirth: newUser.dateOfBirth,
        address: newUser.address
      },
      token
    });
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err); // In thêm thông tin lỗi chi tiết
    res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    // Kiểm tra email có tồn tại không
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email chưa được đăng ký.' });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mật khẩu không đúng.' });

    // Tạo JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Trả về thông tin người dùng và token
    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        address: user.address
      },
      token
    });
  } catch (err) {
    console.error('Lỗi khi đăng nhập:', err); // Log lỗi chi tiết
    res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
  }
});

// Quên mật khẩu - Gửi email
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email không tồn tại trong hệ thống.' });

    // Tạo reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 giờ

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(user.email, 'Yêu cầu đặt lại mật khẩu', `
      <h3>Chào ${user.username},</h3>
      <p>Bạn vừa yêu cầu đặt lại mật khẩu. Nhấn vào liên kết dưới đây để tiếp tục:</p>
      <a href="${resetLink}" style="color: blue;">Đặt lại mật khẩu</a>
      <p>Liên kết có hiệu lực trong 1 giờ.</p>
    `);

    res.status(200).json({ message: 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.' });
  } catch (err) {
    console.error('Lỗi khi gửi email:', err);
    res.status(500).json({ message: 'Lỗi server khi xử lý quên mật khẩu.' });
  }
});

// Đặt lại mật khẩu
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });

    // Mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Mật khẩu đã được đặt lại thành công.' });
  } catch (err) {
    console.error('Lỗi khi đặt lại mật khẩu:', err);
    res.status(500).json({ message: 'Lỗi server khi đặt lại mật khẩu.' });
  }
});

module.exports = router;
