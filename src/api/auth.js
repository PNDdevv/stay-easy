import axios from 'axios';

// Địa chỉ API của bạn
const API_URL = 'http://localhost:5000/api/auth';

// Hàm đăng ký
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Nếu có lỗi, ném lỗi ra ngoài để xử lý ở nơi gọi
    console.error(error.response ? error.response.data.message : error);
    throw new Error(error.response ? error.response.data.message : 'Lỗi đăng ký');
  }
};

// Hàm đăng nhập
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    // Nếu có lỗi, ném lỗi ra ngoài để xử lý ở nơi gọi
    console.error(error.response ? error.response.data.message : error);
    throw new Error(error.response ? error.response.data.message : 'Lỗi đăng nhập');
  }
};
