import React, { useState} from "react";
import { Link } from "react-router-dom";

export default function RoomList() {
  const rooms = [
    { id: 1, title: "Phòng trọ Quận 1", price: "3.5 triệu/tháng", rating: "⭐ 4.5", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?room" },
    { id: 2, title: "Căn hộ mini Bình Thạnh", price: "4.8 triệu/tháng", rating: "⭐ 4.8", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?apartment" },
    { id: 3, title: "Phòng trọ giá rẻ Gò Vấp", price: "2.7 triệu/tháng", rating: "⭐ 4.3", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?hostel" },
    { id: 4, title: "Phòng trọ Quận 3", price: "3 triệu/tháng", rating: "⭐ 4.0", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?room" },
    { id: 5, title: "Phòng trọ Quận 5", price: "4.2 triệu/tháng", rating: "⭐ 4.6", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?apartment" },
    { id: 6, title: "Căn hộ mini Quận 7", price: "5 triệu/tháng", rating: "⭐ 4.7", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?studio" },
    { id: 7, title: "Phòng trọ Quận 4", price: "3.8 triệu/tháng", rating: "⭐ 4.5", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?room" },
    { id: 8, title: "Căn hộ Quận 2", price: "6 triệu/tháng", rating: "⭐ 4.7", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?apartment" },
    { id: 9, title: "Phòng trọ Gò Vấp", price: "2.5 triệu/tháng", rating: "⭐ 4.0", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?hostel" },
    { id: 10, title: "Phòng trọ Quận 10", price: "3 triệu/tháng", rating: "⭐ 4.3", location: "Hồ Chí Minh", img: "https://source.unsplash.com/300x200/?room" },
    
    // Thêm phòng trọ ở Hà Nội
    { id: 11, title: "Phòng trọ Quận Hoàn Kiếm", price: "4.5 triệu/tháng", rating: "⭐ 4.7", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?room" },
    { id: 12, title: "Căn hộ mini Đống Đa", price: "5 triệu/tháng", rating: "⭐ 4.8", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?apartment" },
    { id: 13, title: "Phòng trọ giá rẻ Ba Đình", price: "3.2 triệu/tháng", rating: "⭐ 4.3", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?hostel" },
    { id: 14, title: "Phòng trọ Tây Hồ", price: "4.3 triệu/tháng", rating: "⭐ 4.6", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?room" },
    { id: 15, title: "Căn hộ Quận Hai Bà Trưng", price: "6 triệu/tháng", rating: "⭐ 4.9", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?studio" },
    { id: 16, title: "Phòng trọ Cầu Giấy", price: "3.7 triệu/tháng", rating: "⭐ 4.4", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?room" },
    { id: 17, title: "Phòng trọ Hà Đông", price: "2.9 triệu/tháng", rating: "⭐ 4.2", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?hostel" },
    { id: 18, title: "Căn hộ mini Thanh Xuân", price: "5.2 triệu/tháng", rating: "⭐ 4.6", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?apartment" },
    { id: 19, title: "Phòng trọ Long Biên", price: "3.1 triệu/tháng", rating: "⭐ 4.5", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?room" },
    { id: 20, title: "Phòng trọ Ba Đình", price: "3.8 triệu/tháng", rating: "⭐ 4.3", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?hostel" },
  
    // Phòng trọ các quận khác ở Hà Nội
    { id: 21, title: "Phòng trọ Hoàng Mai", price: "3.3 triệu/tháng", rating: "⭐ 4.1", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?room" },
    { id: 22, title: "Căn hộ Quận Bắc Từ Liêm", price: "5.6 triệu/tháng", rating: "⭐ 4.7", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?apartment" },
    { id: 23, title: "Phòng trọ Nam Từ Liêm", price: "4 triệu/tháng", rating: "⭐ 4.4", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?hostel" },
    { id: 24, title: "Phòng trọ Hà Nội - Kim Mã", price: "5 triệu/tháng", rating: "⭐ 4.8", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?room" },
    { id: 25, title: "Căn hộ mini Hai Bà Trưng", price: "6 triệu/tháng", rating: "⭐ 4.9", location: "Hà Nội", img: "https://source.unsplash.com/300x200/?studio" },
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
      (filters.area ? room.title.includes(filters.area) : true) &&
      (filters.status ? room.title.includes(filters.status) : true) &&
      (filters.furniture ? room.title.includes(filters.furniture) : true)
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
        {/* Các bộ lọc khác như giá, diện tích, v.v. */}
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
