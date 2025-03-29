import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomList from "./pages/RoomList";  // Trang danh sách phòng
import RoomDetails from "./pages/RoomDetails";  // Trang chi tiết phòng
import Navbar from "./components/Navbar";  // Component Navbar
import Footer from "./components/Footer";  // Component Footer
import { Login } from './pages/Login';  // Trang đăng nhập (named export)
import { Register } from './pages/Register';  // Trang đăng ký (named export)

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar sẽ xuất hiện ở tất cả các trang */}
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<RoomList />} /> {/* Trang danh sách phòng */}
          <Route path="/rooms/:id" element={<RoomDetails />} /> {/* Trang chi tiết phòng */}
          <Route path="/login" element={<Login />} /> {/* Trang đăng nhập */}
          <Route path="/register" element={<Register />} /> {/* Trang đăng ký */}
        </Routes>
      </div>
      <Footer /> {/* Footer sẽ luôn ở dưới */}
    </Router>
  );
}

export default App;
