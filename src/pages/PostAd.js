import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostAd() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    area: "",
    address: "",
    description: "",
    type: "",
    furniture: "",
    status: "",
    images: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 5) {
      alert("Chỉ được đăng tối đa 5 hình ảnh.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert("Vui lòng chọn ít nhất 1 hình ảnh.");
      return;
    }

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((img) => form.append("images", img));
        } else {
          form.append(key, formData[key]);
        }
      });

      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        body: form
      });

      if (res.ok) {
        alert("🎉 Đăng tin thành công!");
        navigate("/");
      } else {
        alert("❌ Đăng tin thất bại.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi kết nối tới máy chủ.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Đăng tin phòng trọ</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tiêu đề */}
        <Input label="Tiêu đề" name="title" value={formData.title} onChange={handleChange} required />

        {/* Hình ảnh */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Hình ảnh (tối đa 5 ảnh)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Giá, Diện tích, Địa chỉ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Giá (VND)" name="price" value={formData.price} onChange={handleChange} required />
          <Input label="Diện tích (m²)" name="area" value={formData.area} onChange={handleChange} required />
          <Input label="Địa chỉ" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả chi tiết về phòng"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Loại phòng"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={["Phòng trọ", "Chung cư mini", "Nhà nguyên căn"]}
          />
          <Select
            label="Nội thất"
            name="furniture"
            value={formData.furniture}
            onChange={handleChange}
            options={["Đầy đủ", "Cơ bản", "Không có"]}
          />
          <Select
            label="Tình trạng"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={["Còn phòng", "Hết phòng"]}
          />
        </div>

        {/* Nút Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  );
}

// Component Input chung
function Input({ label, name, value, onChange, required }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// Component Select chung
function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">-- Chọn --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}