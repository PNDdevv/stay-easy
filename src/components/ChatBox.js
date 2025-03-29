import React, { useState, useEffect, useRef } from 'react';
import { XIcon, PaperAirplaneIcon, ChatIcon } from '@heroicons/react/outline';
import socket from '../utils/socket'; // Import WebSocket

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // Trạng thái thu nhỏ chatbox
  const messagesEndRef = useRef(null);

  // Lắng nghe tin nhắn từ AI
  useEffect(() => {
    socket.on('bot-message', (data) => {
      console.log("🤖 AI trả lời:", data.message);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: data.message }]);
      setIsTyping(false);
    });

    return () => {
      socket.off('bot-message');
    };
  }, []);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Gửi tin nhắn
  const sendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { sender: 'user', text: input }]);
    setIsTyping(true);
    socket.emit('message', { message: input });
    setInput('');
  };

  // Gửi tin nhắn bằng Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Nút mở chatbox khi thu nhỏ */}
      {isMinimized && (
        <div 
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer flex items-center space-x-2"
          onClick={() => setIsMinimized(false)}
        >
          <ChatIcon className="w-6 h-6" />
          <span className="text-sm font-semibold">Chat hỗ trợ</span>
        </div>
      )}

      {/* Chatbox chính */}
      {!isMinimized && (
        <div className="fixed bottom-4 right-4 bg-white border shadow-lg w-96 rounded-lg flex flex-col">
          {/* Header Chat */}
          <div className="p-3 bg-blue-600 text-white flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Chat hỗ trợ</span>
            <button onClick={() => setIsMinimized(true)}>
              <XIcon className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          {/* Nội dung tin nhắn */}
          <div className="p-3 h-72 overflow-y-auto flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-500 text-xs italic">AI đang nhập...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="p-2 border-t flex items-center">
            <input
              type="text"
              className="flex-grow p-2 border rounded-lg text-sm outline-none"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button 
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={sendMessage}
            >
              <PaperAirplaneIcon className="w-5 h-5 transform rotate-45" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
