require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

const runTest = async () => {
  try {
    await sendEmail(
      'your_test_email@gmail.com', // 👉 Nhập email bạn muốn test
      '🎉 Test gửi Email từ StayEasy',
      `
        <h2>Xin chào từ StayEasy 👋</h2>
        <p>Đây là email test chức năng gửi mail.</p>
        <p>Nếu bạn nhận được email này, nghĩa là chức năng gửi email đã hoạt động tốt! ✅</p>
      `
    );
    console.log('✅ Gửi email thành công!');
  } catch (error) {
    console.error('❌ Gửi email thất bại:', error.message);
  }
};

runTest();
