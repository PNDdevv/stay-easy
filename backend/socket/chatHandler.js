module.exports = (io, socket) => {
    socket.on('chat message', (msg) => {
      console.log('💬 Nhận tin nhắn:', msg);
      io.emit('chat message', msg); // Broadcast lại
    });
  };
  