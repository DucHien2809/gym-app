'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { equipmentAPI } from '@/services/api';
import { fileToBase64, isValidImageFile, isValidImageSize, resizeImageToBase64 } from '@/utils/imageUtils';
import { FiSave, FiX, FiUpload } from 'react-icons/fi';
import Link from 'next/link';

export default function AddEquipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Danh mục thiết bị
  const categories = ['Cardio', 'Sức mạnh', 'Linh hoạt', 'Tạ tự do', 'Máy tập', 'Phụ kiện'];
  
  // Trạng thái thiết bị
  const statuses = ['available', 'in-use', 'maintenance', 'retired'];

  // Status labels in Vietnamese
  const statusLabels: { [key: string]: string } = {
    'available': 'Có sẵn',
    'in-use': 'Đang sử dụng',
    'maintenance': 'Bảo trì',
    'retired': 'Ngừng sử dụng'
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    equipmentCode: '',
    description: '',
    category: 'Cardio',
    purchaseDate: '',
    purchasePrice: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    status: 'available',
    location: '',
    notes: '',
    imageBase64: ''
  });

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý chọn file hình ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.match('image.*')) {
      setError('Vui lòng chọn file hình ảnh');
      return;
    }

    // Giới hạn kích thước file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước hình ảnh không được vượt quá 5MB');
      return;
    }

    setImageFile(file);
    
    // Tạo URL xem trước
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Xử lý click nút tải lên
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Xử lý gửi form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Kiểm tra các trường bắt buộc
      if (!formData.name || !formData.equipmentCode || !formData.description || !formData.category || !formData.purchaseDate || !formData.purchasePrice || !formData.manufacturer) {
        throw new Error('Vui lòng điền đầy đủ các trường bắt buộc');
      }

      // Convert image to base64 if selected
      let imageBase64 = '';
      if (imageFile) {
        try {
          // Validate image
          if (!isValidImageFile(imageFile)) {
            throw new Error('Vui lòng chọn file hình ảnh hợp lệ (JPEG, PNG, GIF, WebP)');
          }
          
          if (!isValidImageSize(imageFile, 5)) {
            throw new Error('Kích thước hình ảnh không được vượt quá 5MB');
          }
          
          // Resize and convert to base64
          imageBase64 = await resizeImageToBase64(imageFile, 800, 600, 0.8);
        } catch (imageErr: any) {
          console.error('Image processing error:', imageErr);
          throw new Error(imageErr.message || 'Lỗi khi xử lý hình ảnh');
        }
      }

      // Create equipment with base64 image
      await equipmentAPI.createEquipment({
        ...formData,
        imageBase64,
        purchasePrice: parseFloat(formData.purchasePrice)
      });

      // Chuyển hướng về danh sách thiết bị
      router.push('/dashboard/admin/equipment');
    } catch (err: any) {
      setError(err.message || 'Không thể thêm thiết bị');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Thêm Thiết Bị Mới</h1>
        <Link
          href="/dashboard/admin/equipment"
          className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-600"
        >
          <FiX /> Hủy
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                required
              />
            </div>

            {/* Mã thiết bị */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã thiết bị <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="equipmentCode"
                value={formData.equipmentCode}
                onChange={handleChange}
                placeholder="VD: TA-50KG-01"
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                required
              />
            </div>

            {/* Danh mục */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'available' ? 'Sẵn sàng' : 
                     status === 'in-use' ? 'Đang sử dụng' : 
                     status === 'maintenance' ? 'Bảo trì' : 
                     status === 'retired' ? 'Ngưng sử dụng' : 
                     status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Nhà sản xuất */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhà sản xuất <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
              />
            </div>

            {/* Số seri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số seri
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
              />
            </div>

            {/* Ngày mua */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày mua <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                required
              />
            </div>

            {/* Giá mua */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá mua <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* Vị trí */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vị trí
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Hình ảnh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hình ảnh
              </label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={imageFile ? imageFile.name : 'Chưa chọn file'}
                    className="w-full px-4 py-2 border rounded-l-md bg-gray-50"
                    placeholder="Chọn hình ảnh"
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300"
                  >
                    <FiUpload />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Xem trước" 
                      className="h-32 w-auto object-contain border rounded-md" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mô tả */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Ghi chú */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Nút gửi */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              <FiSave /> {loading ? 'Đang lưu...' : 'Lưu Thiết Bị'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 