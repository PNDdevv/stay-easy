import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function FilterBar({ filters = {}, setFilters, applyFilters }) {
  const [locationData, setLocationData] = useState({ provinces: [], districts: [], wards: [] });
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=3")
      .then(response => setLocationData({ provinces: response.data, districts: [], wards: [] }))
      .catch(error => console.error("Lỗi khi lấy dữ liệu tỉnh thành:", error));
  }, []);

  const districtList = useMemo(() => {
    const selectedProvince = locationData.provinces.find(p => p.name === filters.location);
    return selectedProvince ? selectedProvince.districts : [];
  }, [filters.location, locationData.provinces]);

  const wardList = useMemo(() => {
    const selectedDistrict = districtList.find(d => d.name === filters.district);
    return selectedDistrict ? selectedDistrict.wards : [];
  }, [filters.district, districtList]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ location: "", district: "", ward: "", distance: "", price: "", area: "", status: "", furniture: "" });
    setActiveFilter(null);
    if (applyFilters) applyFilters();
  };

  const getCurrentAddress = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt không hỗ trợ định vị.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data && data.display_name) {
            alert("Địa chỉ hiện tại: " + data.display_name);
          } else {
            alert("Không thể lấy địa chỉ từ vị trí hiện tại.");
          }
        } catch (error) {
          console.error(error);
          alert("Lỗi khi truy xuất địa chỉ.");
        }
      },
      () => {
        alert("Không thể lấy vị trí từ trình duyệt.");
      }
    );
  };

  const filtersWithDropdowns = [
    { key: "location", label: "Địa điểm", options: locationData.provinces.map(p => p.name) },
    { key: "price", label: "Giá thuê", options: ["Dưới 2 triệu", "2 - 5 triệu", "5 - 10 triệu"] },
    { key: "area", label: "Diện tích", options: ["Dưới 20m²", "20 - 40m²", "Trên 40m²"] },
    { key: "status", label: "Tình trạng", options: ["Mới", "Cũ"] },
    { key: "furniture", label: "Nội thất", options: ["Đầy đủ", "Cơ bản", "Không có"] }
  ];

  return (
    <div className="filter-bar bg-white shadow-lg px-4 py-6 rounded-2xl mx-auto w-full max-w-screen-xl flex flex-col items-center">
      <div className="w-full flex flex-wrap justify-center gap-4 mb-6">
        {filtersWithDropdowns.map(filter => (
          <button
            key={filter.key}
            className="border px-5 py-2 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition flex items-center gap-1 shadow-sm min-w-[140px] justify-center"
            onClick={() => setActiveFilter(filter.key)}
          >
            <span>{filters[filter.key] || filter.label}</span>
            <FiChevronDown className="text-gray-500 text-sm" />
          </button>
        ))}

        <button
          className="border px-5 py-2 rounded-xl text-sm bg-green-50 text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm min-w-[140px] flex items-center justify-center gap-2"
          onClick={getCurrentAddress}
        >
          <FaMapMarkedAlt className="text-lg" />
          Maps
        </button>

        <button
          className="border px-5 py-2 rounded-xl text-sm bg-red-50 text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition shadow-sm min-w-[140px]"
          onClick={resetFilters}
        >
          Xóa lọc
        </button>
      </div>

      {filtersWithDropdowns.map(filter => (
        activeFilter === filter.key && (
          <div key={filter.key} className="mt-4 bg-white shadow-xl px-6 py-5 w-full max-w-md rounded-2xl z-50 border border-gray-200 relative">
            <AiOutlineCloseCircle
              onClick={() => setActiveFilter(null)}
              className="absolute top-3 right-3 text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
            />
            <h3 className="font-semibold text-gray-700 mb-4 text-base">Chọn {filter.label.toLowerCase()}:</h3>
            {filter.key === "location" ? (
              <>
                <select
                  className="border p-3 rounded-lg text-sm w-full mb-4 focus:ring-2 focus:ring-blue-500"
                  value={filters.location || ""}
                  onChange={e => handleFilterChange("location", e.target.value)}
                >
                  <option value="">Chọn tỉnh/thành</option>
                  {locationData.provinces.map(p => (
                    <option key={p.code} value={p.name}>{p.name}</option>
                  ))}
                </select>

                <select
                  className="border p-3 rounded-lg text-sm w-full mb-4 focus:ring-2 focus:ring-blue-500"
                  value={filters.district || ""}
                  onChange={e => handleFilterChange("district", e.target.value)}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districtList.map(d => (
                    <option key={d.code} value={d.name}>{d.name}</option>
                  ))}
                </select>

                <select
                  className="border p-3 rounded-lg text-sm w-full mb-4 focus:ring-2 focus:ring-blue-500"
                  value={filters.ward || ""}
                  onChange={e => handleFilterChange("ward", e.target.value)}
                >
                  <option value="">Chọn phường/xã</option>
                  {wardList.map(w => (
                    <option key={w.code} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </>
            ) : (
              filter.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterChange(filter.key, option)}
                  className={`block w-full text-left px-4 py-2 mb-2 border rounded-md hover:bg-blue-50 transition ${filters[filter.key] === option ? 'bg-blue-100 font-semibold' : ''}`}
                >
                  {option}
                </button>
              ))
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={resetFilters}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Xóa lọc
              </button>
              <button
                onClick={() => {
                  setActiveFilter(null);
                  if (applyFilters) applyFilters();
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Áp dụng
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
}
