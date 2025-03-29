require('dotenv').config(); // Load biến môi trường từ .env
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const OpenAI = require('openai');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép tất cả domain, có thể thay đổi nếu cần
    methods: ["GET", "POST"]
  }
});

// Khởi tạo OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Lấy API Key từ .env
});

// Kiểm tra API Key khi khởi động server
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERROR: OPENAI_API_KEY is missing in .env file!");
  process.exit(1); // Dừng server nếu thiếu API Key
}

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// WebSocket kết nối
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Khi nhận tin nhắn từ client
  socket.on('message', async (data) => {
    console.log("📩 User message:", data.message);
    
    try {
      // Gửi tin nhắn đến OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: data.message }], // Dữ liệu tin nhắn gửi đến OpenAI
      });

      const botReply = response.choices[0]?.message?.content || "Xin lỗi, tôi chưa hiểu yêu cầu của bạn.";
      console.log("🤖 AI reply:", botReply);

      // Gửi lại tin nhắn từ AI về cho client
      socket.emit('bot-message', { message: botReply });
    } catch (error) {
      console.error("❌ Error with OpenAI API:", error.message);
      socket.emit('bot-message', { message: "Lỗi khi kết nối AI, vui lòng thử lại sau." });
    }
  });

  // Khi user ngắt kết nối
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
