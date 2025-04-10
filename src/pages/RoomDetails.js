import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/solid'; // Thêm icon quay lại từ Heroicons v1

export default function RoomDetails() {
  const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  return (
    <div className="container mx-auto p-4">
      {/* Nút quay lại */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" /> {/* Thêm icon quay lại */}
          Quay lại
        </button>
      </div>
      
      {/* Nội dung chi tiết phòng */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Phòng trọ Quận 1</h2>
        <img
          src="https://source.unsplash.com/800x600/?room"
          alt="Room"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-xl font-semibold text-gray-700">Giá: 3.5 triệu/tháng</p>
        <p className="mt-4 text-gray-600">
          Phòng trọ rộng rãi, thoáng mát, đầy đủ tiện nghi, phù hợp cho sinh viên và người đi làm.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
          Liên hệ
        </button>
      </div>
    </div>
  );
}
