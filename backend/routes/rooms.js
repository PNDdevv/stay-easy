const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); // Giả sử bạn đã có model Room
const verifyToken = require('../middleware/authMiddleware'); // Middleware bảo vệ route

// [GET] Lấy danh sách tất cả phòng trọ
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách phòng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// [POST] Tạo phòng trọ mới (Cần đăng nhập)
router.post('/', verifyToken, async (req, res) => {
  try {
    const room = new Room({ ...req.body, user: req.userId });
    await room.save();
    res.status(201).json({ message: 'Đăng tin phòng trọ thành công', room });
  } catch (error) {
    console.error('Lỗi khi tạo phòng trọ:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// [GET] Lấy thông tin chi tiết 1 phòng
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Không tìm thấy phòng' });
    res.status(200).json(room);
  } catch (error) {
    console.error('Lỗi khi lấy phòng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
