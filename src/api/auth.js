import axios from 'axios';

// Địa chỉ API của bạn
const API_URL = 'http://localhost:5000/api/auth';

// Hàm đăng ký
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Xử lý lỗi với thông báo chi tiết
    if (error.response) {
      // Nếu có phản hồi từ server (ví dụ: 400, 500)
      console.error('Lỗi từ server:', error.response.data.message);
      throw new Error(error.response.data.message); // Ném lỗi ra ngoài
    } else if (error.request) {
      // Nếu không có phản hồi từ server
      console.error('Không nhận được phản hồi từ server:', error.request);
      throw new Error('Không thể kết nối với server, vui lòng thử lại');
    } else {
      // Nếu có lỗi xảy ra khi thiết lập yêu cầu
      console.error('Lỗi xảy ra khi thiết lập yêu cầu:', error.message);
      throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
    }
  }
};

// Hàm đăng nhập
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Xử lý lỗi với thông báo chi tiết
    if (error.response) {
      // Nếu có phản hồi từ server (ví dụ: 400, 500)
      console.error('Lỗi từ server:', error.response.data.message);
      throw new Error(error.response.data.message); // Ném lỗi ra ngoài
    } else if (error.request) {
      // Nếu không có phản hồi từ server
      console.error('Không nhận được phản hồi từ server:', error.request);
      throw new Error('Không thể kết nối với server, vui lòng thử lại');
    } else {
      // Nếu có lỗi xảy ra khi thiết lập yêu cầu
      console.error('Lỗi xảy ra khi thiết lập yêu cầu:', error.message);
      throw new Error('Đã có lỗi xảy ra, vui lòng thử lại');
    }
  }
};
