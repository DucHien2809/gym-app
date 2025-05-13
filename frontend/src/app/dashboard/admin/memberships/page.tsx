'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { membershipAPI } from '@/services/api';
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft, FiCheck, FiX, FiDollarSign, FiClock, FiInfo, FiList } from 'react-icons/fi';

interface Membership {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  features: string[];
}

// Form dành cho việc thêm/chỉnh sửa gói
interface MembershipFormData {
  name: string;
  description: string;
  duration: number;
  price: number;
  features: string[];
}

export default function MembershipManagement() {
  const { auth } = useAuth();
  const router = useRouter();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // States cho modal thêm gói mới
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MembershipFormData>({
    name: '',
    description: '',
    duration: 1,
    price: 0,
    features: ['']
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isClosing, setIsClosing] = useState(false);
  
  // States cho modal sửa gói
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMembershipId, setEditingMembershipId] = useState<string | null>(null);
  
  // State hiển thị xác nhận xóa
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingMembershipId, setDeletingMembershipId] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra xác thực
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    // Kiểm tra vai trò
    if (auth.user && auth.user.role !== 'admin') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    // Lấy dữ liệu gói tập
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        
        // Kiểm tra dữ liệu trong localStorage trước
        const savedMemberships = localStorage.getItem('gymMemberships');
        if (savedMemberships) {
          setMemberships(JSON.parse(savedMemberships));
          setLoading(false);
          return;
        }
        
        const response = await membershipAPI.getAllMemberships();
        if (response.status === 'success' && response.data?.memberships) {
          const membershipsData = response.data.memberships as unknown as Membership[];
          setMemberships(membershipsData);
          // Lưu vào localStorage
          localStorage.setItem('gymMemberships', JSON.stringify(membershipsData));
        } else {
          // Dữ liệu mẫu nếu không có dữ liệu từ API
          const defaultMemberships = [
            {
              id: '1',
              name: 'Basic',
              description: 'Gói cơ bản dành cho người mới bắt đầu.',
              duration: 1,
              price: 300000,
              features: [
                'Truy cập phòng tập không giới hạn',
                'Sử dụng thiết bị cơ bản',
                'Tư vấn dinh dưỡng cơ bản',
                'Giờ tập: 8:00 - 22:00'
              ]
            },
            {
              id: '2',
              name: 'Standard',
              description: 'Gói phổ biến nhất với nhiều tiện ích.',
              duration: 3,
              price: 800000,
              features: [
                'Truy cập phòng tập không giới hạn',
                'Sử dụng đầy đủ thiết bị',
                '2 buổi với HLV cá nhân',
                'Tư vấn dinh dưỡng chuyên sâu',
                'Sử dụng phòng xông hơi',
                'Giờ tập: 6:00 - 23:00'
              ]
            },
            {
              id: '3',
              name: 'Premium',
              description: 'Trải nghiệm cao cấp với đầy đủ tiện ích VIP.',
              duration: 12,
              price: 2500000,
              features: [
                'Truy cập phòng tập 24/7',
                'Sử dụng đầy đủ thiết bị cao cấp',
                '8 buổi với HLV cá nhân',
                'Kế hoạch dinh dưỡng và luyện tập cá nhân hóa',
                'Sử dụng phòng xông hơi & spa',
                'Nước uống miễn phí',
                'Chỗ đỗ xe ưu tiên',
                'Khu vực VIP riêng biệt'
              ]
            }
          ];
          setMemberships(defaultMemberships);
          // Lưu dữ liệu mẫu vào localStorage
          localStorage.setItem('gymMemberships', JSON.stringify(defaultMemberships));
        }
      } catch (err) {
        setError('Không thể tải dữ liệu gói tập. Vui lòng thử lại sau.');
        console.error('Error fetching memberships:', err);
        
        // Sử dụng dữ liệu mẫu khi có lỗi
        const fallbackMemberships = [
          {
            id: '1',
            name: 'Basic',
            description: 'Gói cơ bản dành cho người mới bắt đầu.',
            duration: 1,
            price: 300000,
            features: [
              'Truy cập phòng tập không giới hạn',
              'Sử dụng thiết bị cơ bản',
              'Tư vấn dinh dưỡng cơ bản',
              'Giờ tập: 8:00 - 22:00'
            ]
          },
          {
            id: '2',
            name: 'Standard',
            description: 'Gói phổ biến nhất với nhiều tiện ích.',
            duration: 3,
            price: 800000,
            features: [
              'Truy cập phòng tập không giới hạn',
              'Sử dụng đầy đủ thiết bị',
              '2 buổi với HLV cá nhân',
              'Tư vấn dinh dưỡng chuyên sâu',
              'Sử dụng phòng xông hơi',
              'Giờ tập: 6:00 - 23:00'
            ]
          },
          {
            id: '3',
            name: 'Premium',
            description: 'Trải nghiệm cao cấp với đầy đủ tiện ích VIP.',
            duration: 12,
            price: 2500000,
            features: [
              'Truy cập phòng tập 24/7',
              'Sử dụng đầy đủ thiết bị cao cấp',
              '8 buổi với HLV cá nhân',
              'Kế hoạch dinh dưỡng và luyện tập cá nhân hóa',
              'Sử dụng phòng xông hơi & spa',
              'Nước uống miễn phí',
              'Chỗ đỗ xe ưu tiên',
              'Khu vực VIP riêng biệt'
            ]
          }
        ];
        setMemberships(fallbackMemberships);
        // Lưu dữ liệu mẫu vào localStorage
        localStorage.setItem('gymMemberships', JSON.stringify(fallbackMemberships));
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, [auth.isAuthenticated, auth.user, router]);

  const handleBack = () => {
    router.push('/dashboard/admin');
  };

  // Xử lý mở modal thêm gói mới
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      description: '',
      duration: 1,
      price: 0,
      features: ['']
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Xử lý mở modal sửa gói tập
  const handleOpenEditModal = (membership: Membership) => {
    setFormData({
      name: membership.name,
      description: membership.description,
      duration: membership.duration,
      price: membership.price,
      features: [...membership.features]
    });
    setEditingMembershipId(membership.id);
    setFormErrors({});
    setShowEditModal(true);
  };

  // Xử lý đóng modal
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowAddModal(false);
      setShowEditModal(false);
      setIsClosing(false);
    }, 200);
  };

  // Mở dialog xác nhận xóa
  const handleOpenDeleteConfirm = (membershipId: string) => {
    setDeletingMembershipId(membershipId);
    setShowDeleteConfirm(true);
  };

  // Đóng dialog xác nhận xóa
  const handleCloseDeleteConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowDeleteConfirm(false);
      setDeletingMembershipId(null);
      setIsClosing(false);
    }, 200);
  };

  // Xử lý xóa gói tập
  const handleDeleteMembership = () => {
    if (!deletingMembershipId) return;
    
    setIsSubmitting(true);
    
    // Gọi API xóa membership
    membershipAPI.deleteMembership(deletingMembershipId)
      .then((response) => {
        if (response.status === 'success') {
          // Tìm và xóa gói tập khỏi state
          const updatedMemberships = memberships.filter(
            membership => membership.id !== deletingMembershipId
          );
          
          // Cập nhật state và localStorage
          setMemberships(updatedMemberships);
          localStorage.setItem('gymMemberships', JSON.stringify(updatedMemberships));
          
          // Thông báo đã xóa thành công
          alert('Đã xóa gói tập thành công!');
        }
      })
      .catch((error) => {
        console.error('Error deleting membership:', error);
        
        // Fallback khi API gặp lỗi - chỉ xóa khỏi localStorage
        const updatedMemberships = memberships.filter(
          membership => membership.id !== deletingMembershipId
        );
        
        setMemberships(updatedMemberships);
        localStorage.setItem('gymMemberships', JSON.stringify(updatedMemberships));
        
        alert('Đã xóa gói tập (chỉ cập nhật cục bộ). Hệ thống sẽ đồng bộ khi kết nối được với server.');
      })
      .finally(() => {
        setIsSubmitting(false);
        handleCloseDeleteConfirm();
      });
  };

  // Cập nhật form data khi người dùng nhập
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'duration' ? parseInt(value) || 0 : value
    });
    
    // Xóa thông báo lỗi khi người dùng nhập lại
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Xử lý thêm/xóa feature trong form
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures.length ? updatedFeatures : ['']
    });
  };

  // Kiểm tra form hợp lệ
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Vui lòng nhập tên gói';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Vui lòng nhập mô tả gói';
    }
    
    if (formData.duration <= 0) {
      errors.duration = 'Thời hạn phải lớn hơn 0';
    }
    
    if (formData.price <= 0) {
      errors.price = 'Giá phải lớn hơn 0';
    }
    
    const validFeatures = formData.features.filter(f => f.trim() !== '');
    if (validFeatures.length === 0) {
      errors.features = 'Vui lòng thêm ít nhất một tính năng';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Lọc bỏ các features rỗng
      const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
      
      // Xác định xem đang thêm mới hay đang sửa
      if (showEditModal && editingMembershipId) {
        // Đang chỉnh sửa gói tập hiện có
        const updateData = {
          name: formData.name,
          description: formData.description,
          duration: formData.duration,
          price: formData.price,
          features: cleanedFeatures
        };
        
        // Gọi API cập nhật membership
        const response = await membershipAPI.updateMembership(editingMembershipId, updateData);
        
        if (response.status === 'success' && response.data?.membership) {
          // Cập nhật thành công
          const updatedMembership = response.data.membership as unknown as Membership;
          
          // Cập nhật state
          const updatedMemberships = memberships.map(membership => 
            membership.id === editingMembershipId ? updatedMembership : membership
          );
          
          setMemberships(updatedMemberships);
          
          // Đồng thời cập nhật localStorage để cải thiện hiệu suất
          localStorage.setItem('gymMemberships', JSON.stringify(updatedMemberships));
          
          handleCloseModal();
          alert('Đã cập nhật gói tập thành công!');
        } else {
          // Fallback nếu API không thành công
          const updatedMemberships = memberships.map(membership => {
            if (membership.id === editingMembershipId) {
              return {
                ...membership,
                name: formData.name,
                description: formData.description,
                duration: formData.duration,
                price: formData.price,
                features: cleanedFeatures
              };
            }
            return membership;
          });
          
          // Cập nhật state và localStorage
          setMemberships(updatedMemberships);
          localStorage.setItem('gymMemberships', JSON.stringify(updatedMemberships));
          
          handleCloseModal();
          alert('Đã cập nhật gói tập thành công! (Lưu ý: Chỉ lưu cục bộ)');
        }
      } else {
        // Đang thêm gói tập mới
        const newMembershipData = {
          name: formData.name,
          description: formData.description,
          duration: formData.duration,
          price: formData.price,
          features: cleanedFeatures
        };
        
        try {
          // Gọi API tạo membership mới
          const response = await membershipAPI.createMembership(newMembershipData);
          
          if (response.status === 'success' && response.data?.membership) {
            // Thêm membership mới vào danh sách
            const createdMembership = response.data.membership as unknown as Membership;
            const updatedMemberships = [...memberships, createdMembership];
            
            setMemberships(updatedMemberships);
            
            // Lưu vào localStorage để cải thiện hiệu suất
            localStorage.setItem('gymMemberships', JSON.stringify(updatedMemberships));
            
            handleCloseModal();
            alert('Đã thêm gói mới thành công!');
          } else {
            throw new Error('API call không thành công');
          }
        } catch (apiError) {
          console.error('Error creating membership:', apiError);
          
          // Fallback khi API gặp lỗi - chỉ lưu vào localStorage tạm thời
          const fallbackMembership = {
            ...newMembershipData,
            id: Date.now().toString() // Tạo ID tạm thời
          };
          
          const updatedMemberships = [...memberships, fallbackMembership];
          setMemberships(updatedMemberships);
          
          // Lưu vào localStorage
          localStorage.setItem('gymMemberships', JSON.stringify(updatedMemberships));
          
          handleCloseModal();
          alert('Đã thêm gói mới (chỉ lưu cục bộ). Hệ thống sẽ đồng bộ khi kết nối được với server.');
        }
      }
    } catch (error) {
      console.error('Error handling membership:', error);
      alert('Không thể xử lý yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 border border-white border-opacity-20 rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </button>
              <h1 className="text-2xl font-bold text-white">Membership Plans</h1>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 border border-white border-opacity-20 rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Thêm gói mới
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors duration-200"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg text-gray-600">Tổng số {memberships.length} gói tập</p>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-white rounded-md shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  Sắp xếp
                </button>
                <button className="px-3 py-2 bg-white rounded-md shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  Lọc
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {memberships.map((membership) => (
                <div 
                  key={membership.id} 
                  className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <div className={`${
                      membership.name === 'Basic' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                        : membership.name === 'Standard'
                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600'
                    } p-6 text-white`}>
                      <h3 className="text-xl font-bold">{membership.name}</h3>
                      <p className="text-3xl font-bold mt-2">{membership.price.toLocaleString('vi-VN')} ₫</p>
                      <p className="mt-1 text-indigo-100">
                        {membership.duration} {membership.duration === 1 ? 'tháng' : 'tháng'}
                      </p>
                      
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-200"
                          onClick={() => handleOpenEditModal(membership)}
                        >
                          <FiEdit2 className="h-4 w-4 text-white" />
                        </button>
                        <button 
                          className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-200"
                          onClick={() => handleOpenDeleteConfirm(membership.id)}
                        >
                          <FiTrash2 className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    {membership.name === 'Standard' && (
                      <div className="absolute top-0 left-0 bg-yellow-500 text-white px-4 py-1 rounded-br-lg font-medium text-sm shadow-md">
                        Phổ biến nhất
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <p className="mb-4 text-gray-600">{membership.description}</p>
                    <h4 className="font-semibold mb-4 text-gray-800">Đặc quyền:</h4>
                    <ul className="space-y-3">
                      {membership.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <FiCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button 
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        onClick={() => alert('Chi tiết gói ' + membership.name)}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal Thêm/Sửa Gói Tập */}
      {(showAddModal || showEditModal) && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={handleCloseModal}
            ></div>
            
            {/* Trick để căn giữa modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Panel */}
            <div 
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDuration: '200ms' }}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {showAddModal ? 'Thêm gói tập mới' : 'Chỉnh sửa gói tập'}
                </h3>
                <button 
                  onClick={handleCloseModal}
                  className="bg-transparent rounded-full p-1 inline-flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 focus:outline-none"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="space-y-4">
                    {/* Tên gói */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiInfo className="mr-1 text-gray-600" /> Tên gói
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="VD: Basic, Standard, Premium..."
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Mô tả */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiInfo className="mr-1 text-gray-600" /> Mô tả
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.description ? 'border-red-500' : ''}`}
                        placeholder="VD: Gói cơ bản dành cho người mới bắt đầu..."
                      />
                      {formErrors.description && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                      )}
                    </div>

                    {/* Thời hạn và giá cả */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <FiClock className="mr-1 text-gray-600" /> Thời hạn (tháng)
                        </label>
                        <input
                          type="number"
                          name="duration"
                          id="duration"
                          min="1"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.duration ? 'border-red-500' : ''}`}
                        />
                        {formErrors.duration && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.duration}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <FiDollarSign className="mr-1 text-gray-600" /> Giá (VNĐ)
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          min="0"
                          step="10000"
                          value={formData.price}
                          onChange={handleInputChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.price ? 'border-red-500' : ''}`}
                        />
                        {formErrors.price && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                        )}
                      </div>
                    </div>

                    {/* Tính năng */}
                    <div>
                      <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiList className="mr-1 text-gray-600" /> Tính năng
                      </label>
                      
                      {formErrors.features && (
                        <p className="mt-1 text-sm text-red-600 mb-2">{formErrors.features}</p>
                      )}
                      
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center mt-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                            placeholder="VD: Truy cập phòng tập không giới hạn"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
                            disabled={formData.features.length <= 1}
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="mt-3 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FiPlus className="mr-1" /> Thêm tính năng
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : showEditModal ? 'Cập nhật' : 'Thêm gói'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Dialog xác nhận xóa */}
      {showDeleteConfirm && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={handleCloseDeleteConfirm}
            ></div>
            
            {/* Trick để căn giữa dialog */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Dialog Panel */}
            <div 
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDuration: '200ms' }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Xóa gói tập</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa gói tập này? Thao tác này không thể hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteMembership}
                >
                  Xóa
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseDeleteConfirm}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 