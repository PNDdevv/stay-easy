import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomList from "./pages/RoomList";
import RoomDetails from "./pages/RoomDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from './context/AuthContext'; // ✅ THÊM DÒNG NÀY

function App() {
  return (
    <AuthProvider> {/* ✅ BỌC TOÀN BỘ APP */}
      <Router>
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<RoomList />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
