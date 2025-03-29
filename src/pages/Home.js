import React from "react";
import RoomList from "../pages/RoomList";  // Import RoomList

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?apartment')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold">Tìm phòng trọ dễ dàng với StayEasy</h1>
          <p className="text-lg mt-2">Nền tảng giúp bạn tìm kiếm nhà trọ nhanh chóng, an toàn và thuận tiện.</p>
          <button className="mt-4 px-6 py-3 bg-blue-500 rounded-md text-lg hover:bg-blue-600 transition">
            Bắt đầu ngay
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm nâng cao */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold">Tìm kiếm phòng trọ</h2>
        <div className="flex mt-3 gap-4">
          <input type="text" placeholder="Nhập địa điểm..." className="w-full p-3 border rounded-md" />
          <select className="p-3 border rounded-md">
            <option>Giá dưới 3 triệu</option>
            <option>3 - 5 triệu</option>
            <option>Trên 5 triệu</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Danh sách phòng trọ */}
      <RoomList />
    </div>
  );
}
