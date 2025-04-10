require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const OpenAI = require('openai');

// Khởi tạo app & server
const app = express();
const server = http.createServer(app);

// Khởi tạo socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Có thể thay bằng http://localhost:3000 nếu chỉ cho frontend local
    methods: ['GET', 'POST'],
  },
});

// Kiểm tra biến môi trường
const REQUIRED_ENV_VARS = ['OPENAI_API_KEY', 'JWT_SECRET', 'MONGO_URI'];
REQUIRED_ENV_VARS.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Thiếu biến môi trường: ${key}`);
    process.exit(1);
  }
});

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch((err) => {
    console.error('❌ Lỗi kết nối MongoDB:', err.message);
    process.exit(1);
  });

// Cấu hình OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const roomRoutes = require('./routes/rooms');
const authRoutes = require('./routes/auth.routes');
app.use('/api/rooms', roomRoutes);
app.use('/api/auth', authRoutes);

// WebSocket – Chat AI realtime
io.on('connection', (socket) => {
  console.log(`🟢 Kết nối mới: ${socket.id}`);

  socket.on('message', async ({ message }) => {
    console.log(`📩 [${socket.id}] User: ${message}`);

    try {
      const aiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      });

      const botMessage = aiResponse.choices[0]?.message?.content || 'Xin lỗi, tôi không hiểu yêu cầu.';
      socket.emit('bot-message', { message: botMessage });
      console.log(`🤖 AI: ${botMessage}`);
    } catch (err) {
      console.error('❌ Lỗi gọi OpenAI:', err.message);
      socket.emit('bot-message', { message: '⚠️ Lỗi khi kết nối AI. Vui lòng thử lại sau.' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Ngắt kết nối: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
