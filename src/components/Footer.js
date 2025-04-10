import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Cột 1: Giới thiệu */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Về StayEasy</h2>
          <p className="text-gray-400 text-sm">
            StayEasy là nền tảng giúp bạn tìm kiếm phòng trọ nhanh chóng và dễ dàng.
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Liên kết nhanh</h2>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <Link to="/privacy-policy" className="hover:text-blue-400 transition">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-blue-400 transition">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Hỗ trợ khách hàng
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Mạng xã hội */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Kết nối với chúng tôi</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-gray-400 hover:text-blue-500 transition text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-blue-400 transition text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-pink-500 transition text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} StayEasy. All rights reserved.
      </div>
    </footer>
  );
}
