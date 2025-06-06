'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { equipmentAPI } from '@/services/api';
import { Equipment } from '@/types';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiInfo } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { base64ToImageUrl } from '@/utils/imageUtils';

// Component hiển thị hình ảnh thiết bị
const EquipmentImage = ({ equipment }: { equipment: Equipment }) => {
  const [imgError, setImgError] = useState(false);
  
  if (!equipment.imageBase64 || imgError) {
    return (
      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
        No Image
      </div>
    );
  }
  
  return (
    <img
      src={base64ToImageUrl(equipment.imageBase64)}
      alt={equipment.name}
      className="w-16 h-16 object-cover rounded-lg"
      onError={() => setImgError(true)}
    />
  );
};

export default function EquipmentPage() {
  const router = useRouter();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Danh mục thiết bị
  const categories = ['Cardio', 'Strength', 'Flexibility', 'Free Weights', 'Machines', 'Accessories'];
  
  // Trạng thái thiết bị
  const statuses = ['available', 'in-use', 'maintenance', 'retired'];

  // Lấy danh sách thiết bị
  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit: 10,
        sort: 'createdAt',
        order: 'desc'
      };

      if (search) params.search = search;
      if (category) params.category = category;
      if (status) params.status = status;

      const response = await equipmentAPI.getAllEquipment(params);
      if (response.data) {
        setEquipment(response.data as unknown as Equipment[]);
      }
      // Xử lý thông tin phân trang nếu có
      if ('meta' in response && response.meta && typeof response.meta === 'object' && 'pages' in response.meta) {
        setTotalPages(response.meta.pages as number || 1);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Không thể lấy dữ liệu thiết bị');
      setEquipment([]);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchEquipment khi component được tạo và khi bộ lọc thay đổi
  useEffect(() => {
    fetchEquipment();
  }, [page, category, status]);

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Quay lại trang đầu tiên
    fetchEquipment();
  };

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1); // Quay lại trang đầu tiên
  };

  // Xử lý thay đổi trạng thái
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1); // Quay lại trang đầu tiên
  };

  // Xử lý xóa thiết bị
  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thiết bị này không?')) {
      return;
    }

    setIsDeleting(true);
    setDeleteId(id);

    try {
      await equipmentAPI.deleteEquipment(id);
      fetchEquipment(); // Lấy lại dữ liệu sau khi xóa
    } catch (err: any) {
      setError(err.message || 'Không thể xóa thiết bị');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  // Định dạng ngày tháng
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản Lý Thiết Bị</h1>
        <Link
          href="/dashboard/admin/equipment/add"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700"
        >
          <FiPlus /> Thêm Thiết Bị
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tìm kiếm và bộ lọc */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên, mô tả..."
                className="w-full px-4 py-2 border rounded-md pr-10 text-gray-900"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border rounded-md appearance-none text-gray-900"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full px-4 py-2 border rounded-md appearance-none text-gray-900"
            >
              <option value="">Tất cả trạng thái</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === 'available' ? 'Sẵn sàng' : 
                   s === 'in-use' ? 'Đang sử dụng' : 
                   s === 'maintenance' ? 'Bảo trì' : 
                   s === 'retired' ? 'Ngưng sử dụng' : 
                   (s as string).charAt(0).toUpperCase() + (s as string).slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      {/* Danh sách thiết bị */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Đang tải dữ liệu thiết bị...</div>
        ) : equipment.length === 0 ? (
          <div className="p-8 text-center">
            <p>Không tìm thấy thiết bị nào. Hãy điều chỉnh bộ lọc hoặc thêm thiết bị mới.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bảo trì gần nhất
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipment.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <EquipmentImage equipment={item} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.manufacturer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                          ${item.status === 'in-use' ? 'bg-blue-100 text-blue-800' : ''}
                          ${item.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${item.status === 'retired' ? 'bg-red-100 text-red-800' : ''}
                        `}
                      >
                        {item.status === 'available' ? 'Sẵn sàng' : 
                         item.status === 'in-use' ? 'Đang sử dụng' : 
                         item.status === 'maintenance' ? 'Bảo trì' : 
                         item.status === 'retired' ? 'Ngưng sử dụng' : 
                         (item.status as string).charAt(0).toUpperCase() + (item.status as string).slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastMaintenance ? formatDate(item.lastMaintenance) : 'Chưa bao giờ'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/admin/equipment/${item.id}`)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Xem chi tiết"
                        >
                          <FiInfo size={18} />
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/admin/equipment/edit/${item.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Chỉnh sửa"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={isDeleting && deleteId === item.id}
                          title="Xóa"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 border rounded-md ${
                page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Trước
            </button>
            <span className="text-sm text-gray-700">
              Trang {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 border rounded-md ${
                page === totalPages
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Tiếp
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 