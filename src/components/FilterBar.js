import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai"; // Icon thoát

export default function FilterBar({ filters = {}, setFilters }) {
  const [locationData, setLocationData] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  const [showLocationOptions, setShowLocationOptions] = useState(false);

  // Lấy dữ liệu tỉnh thành, quận huyện, xã phường từ API
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=3")
      .then((response) => {
        setLocationData({
          provinces: response.data,
          districts: [],
          wards: [],
        });
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu tỉnh thành:", error));
  }, []);

  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      location: value,
      address: "",
      district: "",
      ward: "",
    }));

    if (value === "Toàn quốc") {
      setShowLocationOptions(false); // Nếu chọn Toàn quốc thì không cần lọc thêm
    } else {
      setShowLocationOptions(true); // Hiển thị các cấp lọc tiếp theo
      const selectedProvince = locationData.provinces.find(p => p.name === value);
      setLocationData((prev) => ({
        ...prev,
        districts: selectedProvince ? selectedProvince.districts : [],
        wards: [],
      }));
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFilters((prev) => ({
      ...prev,
      district: selectedDistrict,
      ward: "",
    }));

    const selectedDistrictObj = locationData.districts.find(d => d.name === selectedDistrict);
    setLocationData((prev) => ({
      ...prev,
      wards: selectedDistrictObj ? selectedDistrictObj.wards : [],
    }));
  };

  const handleCloseLocationOptions = () => {
    setShowLocationOptions(false); // Đóng phần lọc thêm khi nhấn nút thoát
  };

  return (
    <div className="filter-bar-container bg-white shadow-md p-3 rounded-md mx-auto w-full md:w-3/4">
      <span className="font-semibold text-gray-700 mr-3">Lọc:</span>

      {/* Lọc địa điểm */}
      <select
        className="border p-2 rounded-md text-sm mr-2 my-1"
        value={filters.location || ""}
        onChange={handleLocationChange}
      >
        <option value="">Chọn địa điểm</option>
        <option value="Toàn quốc">Toàn quốc</option>
        {locationData.provinces.map((province) => (
          <option key={province.code} value={province.name}>{province.name}</option>
        ))}
      </select>

      {/* Hiển thị bảng lọc khi chọn "Toàn quốc" */}
      {showLocationOptions && (
        <div className="location-filter-overlay absolute inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
          <div className="mt-4 p-3 border border-gray-300 rounded-md shadow-md w-full md:w-96 bg-white relative">
            <AiOutlineCloseCircle
              onClick={handleCloseLocationOptions}
              className="absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer"
            />
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">Lọc thêm theo địa chỉ:</h3>

            {/* Chọn tỉnh thành */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700">Chọn tỉnh/thành phố</label>
              <select
                className="border p-2 rounded-md text-xs w-full"
                value={filters.location || ""}
                onChange={handleLocationChange}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {locationData.provinces.map((province) => (
                  <option key={province.code} value={province.name}>{province.name}</option>
                ))}
              </select>
            </div>

            {/* Chọn quận huyện */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700">Chọn quận huyện</label>
              <select
                className="border p-2 rounded-md text-xs w-full"
                value={filters.district || ""}
                onChange={handleDistrictChange}
              >
                <option value="">Chọn quận/huyện</option>
                {locationData.districts.map((district) => (
                  <option key={district.code} value={district.name}>{district.name}</option>
                ))}
              </select>
            </div>

            {/* Chọn phường xã */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700">Chọn phường/xã</label>
              <select
                className="border p-2 rounded-md text-xs w-full"
                value={filters.ward || ""}
                onChange={(e) => handleFilterChange(e, "ward")}
              >
                <option value="">Chọn phường/xã</option>
                {locationData.wards.map((ward) => (
                  <option key={ward.code} value={ward.name}>{ward.name}</option>
                ))}
              </select>
            </div>

            {/* Xóa và áp dụng lọc */}
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setFilters({})}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 text-xs"
              >
                Xóa lọc
              </button>
              <button
                onClick={() => console.log("Áp dụng bộ lọc", filters)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-xs"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Các bộ lọc khác */}
      {[{
        key: "price",
        label: "Giá thuê",
        options: ["Dưới 2 triệu", "2 - 5 triệu", "5 - 10 triệu"]
      }, {
        key: "area",
        label: "Diện tích",
        options: ["Dưới 20m²", "20 - 40m²", "Trên 40m²"]
      }, {
        key: "status",
        label: "Tình trạng",
        options: ["Mới", "Cũ"]
      }, {
        key: "furniture",
        label: "Nội thất",
        options: ["Đầy đủ", "Cơ bản", "Không có"]
      }].map((filter) => (
        <select
          key={filter.key}
          className="border p-2 rounded-md text-sm mr-2 my-1"
          value={filters[filter.key] || ""}
          onChange={(e) => handleFilterChange(e, filter.key)}
        >
          <option value="">{filter.label}</option>
          {filter.options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
