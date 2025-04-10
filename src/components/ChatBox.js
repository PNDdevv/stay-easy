import React, { useState, useEffect, useRef } from 'react';
import { XIcon, PaperAirplaneIcon, ChatIcon } from '@heroicons/react/outline';
import socket from '../utils/socket';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Lắng nghe phản hồi từ AI
  useEffect(() => {
    const handleBotMessage = (data) => {
      setMessages((prev) => [...prev, { sender: 'bot', text: data.message }]);
      setIsTyping(false);
    };

    socket.on('bot-message', handleBotMessage);

    return () => {
      socket.off('bot-message', handleBotMessage);
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Gửi tin nhắn
  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setIsTyping(true);
    socket.emit('message', { message: trimmed });
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Nút mở chatbox khi thu nhỏ */}
      {isMinimized && (
        <div
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer flex items-center space-x-2"
          onClick={() => setIsMinimized(false)}
        >
          <ChatIcon className="w-5 h-5" />
          <span className="text-sm font-semibold">Chat hỗ trợ</span>
        </div>
      )}

      {/* Chatbox chính */}
      {!isMinimized && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 shadow-xl w-96 rounded-xl flex flex-col z-50">
          {/* Header */}
          <div className="p-3 bg-blue-600 text-white flex justify-between items-center rounded-t-xl">
            <span className="font-semibold text-base">Chat hỗ trợ</span>
            <button onClick={() => setIsMinimized(true)}>
              <XIcon className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          {/* Tin nhắn */}
          <div className="p-3 h-72 overflow-y-auto flex flex-col space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-gray-500 text-xs italic">AI đang nhập...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center bg-white">
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
