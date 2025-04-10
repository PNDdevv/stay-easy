import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RoomList() {
  const rooms = [
    // Hồ Chí Minh
    { id: 1, title: "Phòng trọ Quận 1", price: "3.5 triệu/tháng", location: "Hồ Chí Minh", area: "20m²", status: "Còn phòng", amenities: ["Điều hòa", "Máy giặt", "Wifi miễn phí"], img: "/assets/images/OIP (1).jpg" },
    { id: 2, title: "Căn hộ mini Bình Thạnh", price: "4.8 triệu/tháng", location: "Hồ Chí Minh", area: "25m²", status: "Sắp hết phòng", amenities: ["Ban công", "Nội thất đầy đủ", "Chỗ để xe"], img: "/assets/images/OIP (2).jpg" },
    { id: 3, title: "Phòng trọ giá rẻ Gò Vấp", price: "2.7 triệu/tháng", location: "Hồ Chí Minh", area: "18m²", status: "Còn phòng", amenities: ["Nhà bếp", "Giờ giấc tự do"], img: "/assets/images/OIP (3).jpg" },
    { id: 4, title: "Phòng trọ Quận 3", price: "3 triệu/tháng", location: "Hồ Chí Minh", area: "22m²", status: "Hết phòng", amenities: ["Nước nóng lạnh", "Bảo vệ 24/7"], img: "/assets/images/OIP (4).jpg" },
    { id: 5, title: "Phòng trọ Quận 5", price: "4.2 triệu/tháng", location: "Hồ Chí Minh", area: "24m²", status: "Còn phòng", amenities: ["Wifi miễn phí", "Gần chợ", "Chỗ để xe"], img: "/assets/images/OIP (5).jpg" },
    { id: 6, title: "Căn hộ mini Quận 7", price: "5 triệu/tháng", location: "Hồ Chí Minh", area: "28m²", status: "Còn phòng", amenities: ["Thang máy", "Gần siêu thị", "Ban công"], img: "/assets/images/OIP (6).jpg" },

    // Hà Nội
    { id: 7, title: "Phòng trọ Quận Hoàn Kiếm", price: "4.5 triệu/tháng", location: "Hà Nội", area: "22m²", status: "Còn phòng", amenities: ["Điều hòa", "Ban công"], img: "/assets/images/OIP (7).jpg" },
    { id: 8, title: "Căn hộ mini Đống Đa", price: "5 triệu/tháng", location: "Hà Nội", area: "27m²", status: "Sắp hết phòng", amenities: ["Thang máy", "Gần siêu thị"], img: "/assets/images/OIP (8).jpg" },
    { id: 9, title: "Phòng trọ giá rẻ Ba Đình", price: "3.2 triệu/tháng", location: "Hà Nội", area: "20m²", status: "Hết phòng", amenities: ["Nội thất cơ bản", "Wifi miễn phí"], img: "/assets/images/OIP (9).jpg" },
    { id: 10, title: "Phòng trọ Tây Hồ", price: "4.3 triệu/tháng", location: "Hà Nội", area: "23m²", status: "Còn phòng", amenities: ["Bếp riêng", "Chỗ để xe"], img: "/assets/images/OIP (10).jpg" },
    { id: 11, title: "Căn hộ Quận Hai Bà Trưng", price: "6 triệu/tháng", location: "Hà Nội", area: "30m²", status: "Sắp hết phòng", amenities: ["Full nội thất", "Gần trường học"], img: "/assets/images/OIP (11).jpg" },
    { id: 12, title: "Phòng trọ Cầu Giấy", price: "3.7 triệu/tháng", location: "Hà Nội", area: "21m²", status: "Còn phòng", amenities: ["Wifi miễn phí", "Bảo vệ 24/7"], img: "/assets/images/OIP (12).jpg" },

    // Đà Nẵng
    { id: 13, title: "Phòng trọ Quận Hải Châu", price: "3.0 triệu/tháng", location: "Đà Nẵng", area: "20m²", status: "Còn phòng", amenities: ["Điều hòa", "Máy giặt", "Wifi miễn phí"], img: "/assets/images/OIP (13).jpg" },
    { id: 14, title: "Căn hộ mini Sơn Trà", price: "4 triệu/tháng", location: "Đà Nẵng", area: "22m²", status: "Còn phòng", amenities: ["Ban công", "Full nội thất"], img: "/assets/images/OIP (14).jpg" },
    { id: 15, title: "Phòng trọ giá rẻ Liên Chiểu", price: "2.5 triệu/tháng", location: "Đà Nẵng", area: "18m²", status: "Sắp hết phòng", amenities: ["Giờ giấc tự do", "Wifi miễn phí"], img: "/assets/images/OIP (15).jpg" },
    { id: 16, title: "Phòng trọ An Hải Bắc", price: "3.5 triệu/tháng", location: "Đà Nẵng", area: "25m²", status: "Còn phòng", amenities: ["Nội thất đầy đủ", "Máy lạnh"], img: "/assets/images/OIP (16).jpg" },
    { id: 17, title: "Căn hộ mini Ngũ Hành Sơn", price: "5 triệu/tháng", location: "Đà Nẵng", area: "30m²", status: "Còn phòng", amenities: ["Gần biển", "Thang máy"], img: "/assets/images/OIP (17).jpg" },

    // Nha Trang
    { id: 18, title: "Phòng trọ Khánh Hòa", price: "2.8 triệu/tháng", location: "Nha Trang", area: "20m²", status: "Còn phòng", amenities: ["Wifi miễn phí", "Điều hòa"], img: "/assets/images/OIP (18).jpg" },
    { id: 19, title: "Căn hộ mini Vĩnh Hải", price: "3.9 triệu/tháng", location: "Nha Trang", area: "24m²", status: "Còn phòng", amenities: ["Máy giặt", "Ban công"], img: "/assets/images/OIP (19).jpg" },
    { id: 20, title: "Phòng trọ giá rẻ Nha Trang", price: "2.3 triệu/tháng", location: "Nha Trang", area: "18m²", status: "Sắp hết phòng", amenities: ["Nhà bếp", "Gần trường học"], img: "/assets/images/OIP (20).jpg" }
  ];

  const [filters, setFilters] = useState({
    location: '',
    district: '',
    ward: '',
    price: '',
    area: '',
    status: '',
    furniture: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 7;

  // Lọc các phòng trọ theo bộ lọc
  const filteredRooms = rooms.filter((room) => {
    return (
      (filters.location ? room.location.includes(filters.location) : true) &&
      (filters.district ? room.title.includes(filters.district) : true) &&
      (filters.ward ? room.title.includes(filters.ward) : true) &&
      (filters.price ? room.price.includes(filters.price) : true) &&
      (filters.area ? room.area.includes(filters.area) : true) &&
      (filters.status ? room.status.includes(filters.status) : true) &&
      (filters.furniture ? room.furniture.includes(filters.furniture) : true)
    );
  });

  // Tính chỉ số các phòng trong trang hiện tại
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Chuyển trang
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);  // Cuộn trang về phía trên
  };

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="filter mb-6">
        {/* Bộ lọc */}
        <select name="location" onChange={handleFilterChange} value={filters.location}>
          <option value="">Chọn tỉnh</option>
          <option value="Hồ Chí Minh">Hồ Chí Minh</option>
          <option value="Hà Nội">Hà Nội</option>
          {/* Thêm các tỉnh khác */}
        </select>
        <select name="district" onChange={handleFilterChange} value={filters.district}>
          <option value="">Chọn quận</option>
          <option value="Quận 1">Quận 1</option>
          <option value="Bình Thạnh">Bình Thạnh</option>
          {/* Thêm các quận khác */}
        </select>
        <select name="ward" onChange={handleFilterChange} value={filters.ward}>
          <option value="">Chọn xã/phường</option>
          <option value="Phường 1">Phường 1</option>
          {/* Thêm các xã/phường */}
        </select>
        <select name="price" onChange={handleFilterChange} value={filters.price}>
          <option value="">Chọn giá</option>
          <option value="3 triệu">3 triệu</option>
          <option value="4 triệu">4 triệu</option>
          {/* Thêm các mức giá khác */}
        </select>
        <select name="area" onChange={handleFilterChange} value={filters.area}>
          <option value="">Chọn diện tích</option>
          <option value="20m²">20m²</option>
          <option value="30m²">30m²</option>
          {/* Thêm các diện tích khác */}
        </select>
        <select name="status" onChange={handleFilterChange} value={filters.status}>
          <option value="">Chọn tình trạng</option>
          <option value="Có sẵn">Có sẵn</option>
          <option value="Đang cho thuê">Đang cho thuê</option>
        </select>
        <select name="furniture" onChange={handleFilterChange} value={filters.furniture}>
          <option value="">Chọn nội thất</option>
          <option value="Đầy đủ">Đầy đủ</option>
          <option value="Không có">Không có</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentRooms.map((room) => (
          <div key={room.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={room.img} alt={room.title} className="w-full h-40 object-cover rounded-md mb-2" />
            <h2 className="text-xl font-bold">{room.title}</h2>
            <p className="text-gray-700">{room.price}</p>
            <p className="text-yellow-500">{room.rating}</p>
            <Link to={`/rooms/${room.id}`} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="mt-6 flex justify-center">
        {[...Array(Math.ceil(filteredRooms.length / roomsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} hover:bg-blue-600`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
