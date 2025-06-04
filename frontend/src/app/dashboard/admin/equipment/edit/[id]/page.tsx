'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { equipmentAPI } from '@/services/api';
import { Equipment } from '@/types';
import { FiSave, FiX, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditEquipmentPage({ params }: Props) {
  const router = useRouter();
  const { id } = React.use(params);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Equipment categories
  const categories = ['Cardio', 'Sức mạnh', 'Linh hoạt', 'Tạ tự do', 'Máy tập', 'Phụ kiện'];
  
  // Equipment statuses
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
    description: '',
    category: '',
    purchaseDate: '',
    purchasePrice: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    status: '',
    location: '',
    notes: '',
    image: ''
  });

  // Fetch equipment details
  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      try {
        const response = await equipmentAPI.getEquipment(id);
        if (response.data) {
          const equipment = response.data as unknown as Equipment;
          // Format date for input
          const formattedDate = equipment.purchaseDate 
            ? new Date(equipment.purchaseDate).toISOString().split('T')[0]
            : '';
          
          setFormData({
            name: equipment.name,
            description: equipment.description,
            category: equipment.category,
            purchaseDate: formattedDate,
            purchasePrice: equipment.purchasePrice.toString(),
            manufacturer: equipment.manufacturer,
            model: equipment.model || '',
            serialNumber: equipment.serialNumber || '',
            status: equipment.status,
            location: equipment.location || '',
            notes: equipment.notes || '',
            image: equipment.image || 'default-equipment.jpg'
          });
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch equipment details');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.category || !formData.purchaseDate || !formData.purchasePrice || !formData.manufacturer) {
        throw new Error('Vui lòng điền tất cả các trường bắt buộc');
      }

      // Update equipment
      await equipmentAPI.updateEquipment(id, {
        ...formData,
        purchasePrice: parseFloat(formData.purchasePrice)
      });

      // Redirect to equipment details
      router.push(`/dashboard/admin/equipment/${id}`);
    } catch (err: any) {
      setError(err.message || 'Không thể cập nhật thiết bị');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">Đang tải dữ liệu thiết bị...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link
            href={`/dashboard/admin/equipment/${id}`}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
          >
            <FiArrowLeft className="mr-2" /> Quay lại
          </Link>
          <h1 className="text-2xl font-bold">Chỉnh sửa thiết bị</h1>
        </div>
        <Link
          href={`/dashboard/admin/equipment/${id}`}
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
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên thiết bị <span className="text-red-500">*</span>
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

            {/* Category */}
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

            {/* Status */}
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
                    {statusLabels[status] || status}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturer */}
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

            {/* Serial Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số serial
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
              />
            </div>

            {/* Purchase Date */}
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

            {/* Purchase Price */}
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
                className="w-full px-4 py-2 border rounded-md text-gray-900"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vị trí
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL hình ảnh
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-900"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-md text-gray-900"
              required
            />
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-md text-gray-900"
            />
          </div>

          {/* Submit button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              <FiSave /> {submitting ? 'Đang lưu...' : 'Cập nhật thiết bị'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 