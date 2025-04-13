import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon, ChatIcon, UserIcon } from "@heroicons/react/outline";
import ChatBox from "./ChatBox";
import FilterBar from "./FilterBar";

export default function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    price: "",
    area: "",
    status: "",
    furniture: "",
  });

  const userDropdownRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-2xl">
            StayEasy
          </Link>

          {/* Thanh tìm kiếm */}
          <div className="w-full md:w-96 px-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
              placeholder="Tìm kiếm phòng trọ..."
            />
          </div>

          {/* Biểu tượng và hành động */}
          <div className="flex items-center space-x-4">
            {/* Nút đăng tin */}
            {isLoggedIn && (
              <Link
                to="/post-room"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition duration-200"
              >
                Đăng tin
              </Link>
            )}

            <BellIcon className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform" />
            <ChatIcon
              className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform"
              onClick={toggleChat}
            />
            <div className="relative" ref={userDropdownRef}>
              <UserIcon
                className="h-6 w-6 text-white cursor-pointer hover:scale-110 transition-transform"
                onClick={toggleUserDropdown}
              />
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md w-48">
                  {!isLoggedIn ? (
                    <>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                      >
                        Đăng ký
                      </Link>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                      >
                        Đăng nhập
                      </Link>
                    </>
                  ) : (
                    <button
                      className="block px-4 py-2 w-full text-left hover:bg-blue-500 hover:text-white"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bộ lọc */}
      <div className="max-w-7xl mx-auto flex mt-16 px-4">
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Chatbox */}
      {isChatOpen && <ChatBox onClose={toggleChat} />}
    </>
  );
}
