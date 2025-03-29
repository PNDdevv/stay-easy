import { io } from "socket.io-client";

// Kết nối WebSocket với backend (cổng 5000)
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // Hỗ trợ cả websocket & polling
  reconnection: true, // Tự động kết nối lại khi mất kết nối
  reconnectionAttempts: 5, // Số lần thử kết nối lại
  reconnectionDelay: 2000, // Thời gian giữa các lần thử (2 giây)
});

// Lắng nghe sự kiện khi kết nối thành công
socket.on("connect", () => {
  console.log("✅ Connected to WebSocket server:", socket.id);
});

// Lắng nghe phản hồi từ AI chatbot
socket.on("bot-message", (data) => {
  console.log("🤖 AI Response:", data.message);
});

// Xuất socket để dùng trong các component khác
export default socket;
