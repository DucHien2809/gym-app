'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { subscriptionAPI } from '@/services/api';
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiArrowLeft, FiCheck, FiX, FiDollarSign, FiCalendar, FiUser, FiPackage } from 'react-icons/fi';

interface Subscription {
  id: string;
  memberId: string;
  membershipId: string;
  startDate: string;
  endDate: string;
  paymentStatus: string;
  paymentAmount: number;
  paymentDate?: string;
  paymentMethod: string;
  active: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  member: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  membership: {
    name: string;
    duration: number;
    price: number;
  };
}

// Sample data for development
const sampleSubscriptions: Subscription[] = [
  {
    id: '1',
    memberId: 'member1',
    membershipId: 'membership1',
    startDate: '2023-10-01',
    endDate: '2023-11-01',
    paymentStatus: 'paid',
    paymentAmount: 300000,
    paymentDate: '2023-10-01',
    paymentMethod: 'cash',
    active: true,
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01',
    member: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0901234567',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    membership: {
      name: 'Basic',
      duration: 1,
      price: 300000
    }
  },
  {
    id: '2',
    memberId: 'member2',
    membershipId: 'membership2',
    startDate: '2023-09-15',
    endDate: '2023-12-15',
    paymentStatus: 'paid',
    paymentAmount: 800000,
    paymentDate: '2023-09-15',
    paymentMethod: 'bank_transfer',
    active: true,
    createdAt: '2023-09-15',
    updatedAt: '2023-09-15',
    member: {
      name: 'Trần Thị B',
      email: 'tranthib@gmail.com',
      phone: '0912345678',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    membership: {
      name: 'Standard',
      duration: 3,
      price: 800000
    }
  },
  {
    id: '3',
    memberId: 'member3',
    membershipId: 'membership3',
    startDate: '2023-08-01',
    endDate: '2024-08-01',
    paymentStatus: 'paid',
    paymentAmount: 2500000,
    paymentDate: '2023-08-01',
    paymentMethod: 'credit_card',
    active: true,
    createdAt: '2023-08-01',
    updatedAt: '2023-08-01',
    member: {
      name: 'Lê Văn C',
      email: 'levanc@gmail.com',
      phone: '0923456789',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    membership: {
      name: 'Premium',
      duration: 12,
      price: 2500000
    }
  },
  {
    id: '4',
    memberId: 'member4',
    membershipId: 'membership1',
    startDate: '2023-10-10',
    endDate: '2023-11-10',
    paymentStatus: 'pending',
    paymentAmount: 300000,
    paymentMethod: 'cash',
    active: true,
    createdAt: '2023-10-10',
    updatedAt: '2023-10-10',
    member: {
      name: 'Phạm Thị D',
      email: 'phamthid@gmail.com',
      phone: '0934567890',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    membership: {
      name: 'Basic',
      duration: 1,
      price: 300000
    }
  },
  {
    id: '5',
    memberId: 'member5',
    membershipId: 'membership2',
    startDate: '2023-07-01',
    endDate: '2023-10-01',
    paymentStatus: 'expired',
    paymentAmount: 800000,
    paymentDate: '2023-07-01',
    paymentMethod: 'bank_transfer',
    active: false,
    createdAt: '2023-07-01',
    updatedAt: '2023-10-01',
    member: {
      name: 'Hoàng Văn E',
      email: 'hoangvane@gmail.com',
      phone: '0945678901',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    membership: {
      name: 'Standard',
      duration: 3,
      price: 800000
    }
  }
];

export default function SubscriptionManagement() {
  const { auth } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // States cho modal thêm/sửa đăng ký
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    memberName: '',
    memberEmail: '',
    memberPhone: '',
    membershipId: '',
    membershipName: '',
    startDate: '',
    duration: 1,
    paymentAmount: 0,
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Danh sách thành viên và gói tập mẫu
  const [members, setMembers] = useState([
    { id: 'member1', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567' },
    { id: 'member2', name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0912345678' },
    { id: 'member3', name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0923456789' },
    { id: 'member4', name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0934567890' },
    { id: 'member5', name: 'Hoàng Văn E', email: 'hoangvane@gmail.com', phone: '0945678901' },
    { id: 'member6', name: 'Võ Thị F', email: 'vothif@gmail.com', phone: '0956789012' }
  ]);
  
  const [memberships, setMemberships] = useState([
    { id: 'membership1', name: 'Basic', duration: 1, price: 300000 },
    { id: 'membership2', name: 'Standard', duration: 3, price: 800000 },
    { id: 'membership3', name: 'Premium', duration: 12, price: 2500000 }
  ]);

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

    // Lấy dữ liệu đăng ký
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        
        // Kiểm tra xem có dữ liệu trong localStorage không
        const savedSubscriptions = localStorage.getItem('gymSubscriptions');
        if (savedSubscriptions) {
          setSubscriptions(JSON.parse(savedSubscriptions));
          setLoading(false);
          return;
        }

        // Gọi API
        const response = await subscriptionAPI.getAllSubscriptions();
        if (response.status === 'success' && response.data?.subscriptions) {
          const subscriptionsData = response.data.subscriptions as unknown as Subscription[];
          setSubscriptions(subscriptionsData);
          localStorage.setItem('gymSubscriptions', JSON.stringify(subscriptionsData));
        } else {
          // Sử dụng dữ liệu mẫu khi API không trả về kết quả
          setSubscriptions(sampleSubscriptions);
          localStorage.setItem('gymSubscriptions', JSON.stringify(sampleSubscriptions));
        }
      } catch (err) {
        setError('Không thể tải dữ liệu đăng ký. Vui lòng thử lại sau.');
        console.error('Error fetching subscriptions:', err);
        
        // Sử dụng dữ liệu mẫu khi có lỗi
        setSubscriptions(sampleSubscriptions);
        localStorage.setItem('gymSubscriptions', JSON.stringify(sampleSubscriptions));
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [auth.isAuthenticated, auth.user, router]);

  const handleBack = () => {
    router.push('/dashboard/admin');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleAddNew = () => {
    // Reset form
    setFormData({
      memberId: '',
      memberName: '',
      memberEmail: '',
      memberPhone: '',
      membershipId: '',
      membershipName: '',
      startDate: new Date().toISOString().split('T')[0],
      duration: 1,
      paymentAmount: 0,
      paymentStatus: 'pending',
      paymentMethod: 'cash',
      notes: ''
    });
    setFormErrors({});
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const subscription = subscriptions.find(s => s.id === id);
    if (!subscription) return;
    
    setFormData({
      memberId: subscription.memberId,
      memberName: subscription.member.name,
      memberEmail: subscription.member.email,
      memberPhone: subscription.member.phone || '',
      membershipId: subscription.membershipId,
      membershipName: subscription.membership.name,
      startDate: subscription.startDate,
      duration: subscription.membership.duration,
      paymentAmount: subscription.paymentAmount,
      paymentStatus: subscription.paymentStatus,
      paymentMethod: subscription.paymentMethod,
      notes: subscription.notes || ''
    });
    
    setSelectedSubscriptionId(id);
    setFormErrors({});
    setIsEditing(true);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedSubscriptionId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDeleteModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  // Đóng modal form
  const closeFormModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFormModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Cập nhật giá trị form
    setFormData({
      ...formData,
      [name]: name === 'paymentAmount' || name === 'duration' ? Number(value) : value
    });
    
    // Xóa lỗi khi người dùng nhập lại
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Cập nhật thông tin liên quan khi chọn thành viên hoặc gói tập
    if (name === 'memberId') {
      const member = members.find(m => m.id === value);
      if (member) {
        setFormData(prev => ({
          ...prev,
          memberId: value,
          memberName: member.name,
          memberEmail: member.email,
          memberPhone: member.phone || ''
        }));
      }
    } else if (name === 'membershipId') {
      const membership = memberships.find(m => m.id === value);
      if (membership) {
        const startDate = formData.startDate || new Date().toISOString().split('T')[0];
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(startDateObj);
        endDateObj.setMonth(endDateObj.getMonth() + membership.duration);
        
        setFormData(prev => ({
          ...prev,
          membershipId: value,
          membershipName: membership.name,
          duration: membership.duration,
          paymentAmount: membership.price
        }));
      }
    } else if (name === 'startDate') {
      if (formData.membershipId) {
        const membership = memberships.find(m => m.id === formData.membershipId);
        if (membership) {
          const startDateObj = new Date(value);
          const endDateObj = new Date(startDateObj);
          endDateObj.setMonth(endDateObj.getMonth() + membership.duration);
        }
      }
    }
  };

  // Validate form trước khi submit
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.memberId) {
      errors.memberId = 'Vui lòng chọn thành viên';
    }
    
    if (!formData.membershipId) {
      errors.membershipId = 'Vui lòng chọn gói tập';
    }
    
    if (!formData.startDate) {
      errors.startDate = 'Vui lòng chọn ngày bắt đầu';
    }
    
    if (formData.paymentAmount <= 0) {
      errors.paymentAmount = 'Số tiền phải lớn hơn 0';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý submit form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Tính ngày kết thúc từ ngày bắt đầu và thời hạn
      const startDateObj = new Date(formData.startDate);
      const endDateObj = new Date(startDateObj);
      endDateObj.setMonth(endDateObj.getMonth() + formData.duration);
      const endDate = endDateObj.toISOString().split('T')[0];
      
      // Tạo đối tượng đăng ký mới
      const member = members.find(m => m.id === formData.memberId);
      const membership = memberships.find(m => m.id === formData.membershipId);
      
      if (!member || !membership) {
        throw new Error('Thông tin thành viên hoặc gói tập không hợp lệ');
      }
      
      const paymentDate = formData.paymentStatus === 'paid' 
        ? new Date().toISOString().split('T')[0] 
        : undefined;
      
      const subscriptionData: Partial<Subscription> = {
        memberId: formData.memberId,
        membershipId: formData.membershipId,
        startDate: formData.startDate,
        endDate,
        paymentStatus: formData.paymentStatus as string,
        paymentAmount: formData.paymentAmount,
        paymentDate,
        paymentMethod: formData.paymentMethod,
        active: formData.paymentStatus === 'paid',
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        member: {
          name: member.name,
          email: member.email,
          phone: member.phone,
          avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 10) + 1}.jpg`
        },
        membership: {
          name: membership.name,
          duration: membership.duration,
          price: membership.price
        }
      };
      
      // Giả lập gọi API
      setTimeout(() => {
        let updatedSubscriptions;
        
        if (isEditing && selectedSubscriptionId) {
          // Cập nhật đăng ký
          updatedSubscriptions = subscriptions.map(subscription => {
            if (subscription.id === selectedSubscriptionId) {
              return {
                ...subscription,
                ...subscriptionData,
                updatedAt: new Date().toISOString()
              };
            }
            return subscription;
          });
          
          alert('Cập nhật đăng ký thành công!');
        } else {
          // Thêm mới đăng ký
          const newSubscription = {
            id: Date.now().toString(),
            ...subscriptionData
          } as Subscription;
          
          updatedSubscriptions = [...subscriptions, newSubscription];
          alert('Thêm đăng ký mới thành công!');
        }
        
        // Cập nhật state và localStorage
        setSubscriptions(updatedSubscriptions);
        localStorage.setItem('gymSubscriptions', JSON.stringify(updatedSubscriptions));
        
        // Đóng modal
        closeFormModal();
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error handling subscription:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!selectedSubscriptionId) return;
    
    const updatedSubscriptions = subscriptions.filter(
      subscription => subscription.id !== selectedSubscriptionId
    );
    
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('gymSubscriptions', JSON.stringify(updatedSubscriptions));
    
    closeDeleteModal();
    alert('Đã xóa đăng ký thành công!');
  };

  // Lọc đăng ký theo trạng thái và từ khóa tìm kiếm
  const filteredSubscriptions = subscriptions.filter(subscription => {
    // Lọc theo trạng thái
    if (statusFilter !== 'all' && subscription.paymentStatus !== statusFilter) {
      return false;
    }
    
    // Lọc theo từ khóa tìm kiếm (tên, email)
    if (searchTerm && !subscription.member.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !subscription.member.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Hàm xác định màu và nhãn của trạng thái
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          label: 'Đã thanh toán',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        };
      case 'pending':
        return {
          label: 'Chờ thanh toán',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800'
        };
      case 'expired':
        return {
          label: 'Đã hết hạn',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      default:
        return {
          label: 'Không xác định',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
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
              <h1 className="text-2xl font-bold text-white">Quản lý đăng ký gói tập</h1>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 border border-white border-opacity-20 rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Thêm đăng ký mới
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
            {/* Thanh tìm kiếm và bộ lọc */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-400" />
                <select
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="paid">Đã thanh toán</option>
                  <option value="pending">Chờ thanh toán</option>
                  <option value="expired">Đã hết hạn</option>
                </select>
              </div>
            </div>

            {/* Thông tin tổng số */}
            <div className="mb-6">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-grow rounded-md bg-blue-50 p-4">
                    <h3 className="text-sm font-medium text-blue-900">Tổng số đăng ký</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-900">{filteredSubscriptions.length}</p>
                  </div>
                  <div className="flex-grow rounded-md bg-green-50 p-4">
                    <h3 className="text-sm font-medium text-green-900">Đã thanh toán</h3>
                    <p className="mt-2 text-3xl font-bold text-green-900">
                      {filteredSubscriptions.filter(s => s.paymentStatus === 'paid').length}
                    </p>
                  </div>
                  <div className="flex-grow rounded-md bg-yellow-50 p-4">
                    <h3 className="text-sm font-medium text-yellow-900">Chờ thanh toán</h3>
                    <p className="mt-2 text-3xl font-bold text-yellow-900">
                      {filteredSubscriptions.filter(s => s.paymentStatus === 'pending').length}
                    </p>
                  </div>
                  <div className="flex-grow rounded-md bg-red-50 p-4">
                    <h3 className="text-sm font-medium text-red-900">Đã hết hạn</h3>
                    <p className="mt-2 text-3xl font-bold text-red-900">
                      {filteredSubscriptions.filter(s => s.paymentStatus === 'expired').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bảng đăng ký */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              {filteredSubscriptions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="rounded-full bg-gray-100 p-3">
                    <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                  </div>
                  <p className="mt-4 text-lg text-gray-500">Không tìm thấy kết quả nào</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Thành viên
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Gói tập
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Thời hạn
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Thanh toán
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Trạng thái
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredSubscriptions.map((subscription) => {
                        const statusDisplay = getStatusDisplay(subscription.paymentStatus);
                        return (
                          <tr key={subscription.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-full object-cover" 
                                    src={subscription.member.avatar || 'https://via.placeholder.com/40'} 
                                    alt={subscription.member.name} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{subscription.member.name}</div>
                                  <div className="text-sm text-gray-500">{subscription.member.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{subscription.membership.name}</div>
                              <div className="text-sm text-gray-500">{subscription.membership.duration} tháng</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{formatDate(subscription.startDate)}</div>
                              <div className="text-sm text-gray-500">đến {formatDate(subscription.endDate)}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{subscription.paymentAmount.toLocaleString('vi-VN')} đ</div>
                              <div className="text-sm text-gray-500">
                                {subscription.paymentMethod === 'cash' 
                                  ? 'Tiền mặt' 
                                  : subscription.paymentMethod === 'bank_transfer' 
                                  ? 'Chuyển khoản' 
                                  : 'Thẻ tín dụng'}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusDisplay.bgColor} ${statusDisplay.textColor}`}>
                                {statusDisplay.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(subscription.id)}
                                  className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50"
                                >
                                  <FiEdit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(subscription.id)}
                                  className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                                >
                                  <FiTrash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={closeDeleteModal}
            ></div>
            
            {/* Trick để căn giữa modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Panel */}
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
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Xóa đăng ký</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa đăng ký này? Thao tác này không thể hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  Xóa
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDeleteModal}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm/sửa đăng ký */}
      {isFormModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={closeFormModal}
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
                  {isEditing ? 'Sửa đăng ký' : 'Thêm đăng ký mới'}
                </h3>
                <button 
                  onClick={closeFormModal}
                  className="bg-transparent rounded-full p-1 inline-flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 focus:outline-none"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="space-y-4">
                    {/* Thành viên */}
                    <div>
                      <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiUser className="mr-1 text-gray-600" /> Thành viên
                      </label>
                      <select
                        id="memberId"
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleInputChange}
                        disabled={isEditing}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.memberId ? 'border-red-500' : ''}`}
                      >
                        <option value="">Chọn thành viên</option>
                        {members.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name} ({member.email})
                          </option>
                        ))}
                      </select>
                      {formErrors.memberId && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.memberId}</p>
                      )}
                      
                      {formData.memberId && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700"><strong>Email:</strong> {formData.memberEmail}</p>
                          {formData.memberPhone && (
                            <p className="text-sm text-gray-700"><strong>Điện thoại:</strong> {formData.memberPhone}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Gói tập */}
                    <div>
                      <label htmlFor="membershipId" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiPackage className="mr-1 text-gray-600" /> Gói tập
                      </label>
                      <select
                        id="membershipId"
                        name="membershipId"
                        value={formData.membershipId}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.membershipId ? 'border-red-500' : ''}`}
                      >
                        <option value="">Chọn gói tập</option>
                        {memberships.map(membership => (
                          <option key={membership.id} value={membership.id}>
                            {membership.name} ({membership.duration} tháng - {membership.price.toLocaleString('vi-VN')} đ)
                          </option>
                        ))}
                      </select>
                      {formErrors.membershipId && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.membershipId}</p>
                      )}
                    </div>

                    {/* Ngày bắt đầu */}
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiCalendar className="mr-1 text-gray-600" /> Ngày bắt đầu
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.startDate ? 'border-red-500' : ''}`}
                      />
                      {formErrors.startDate && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.startDate}</p>
                      )}
                    </div>

                    {/* Thanh toán */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <FiDollarSign className="mr-1 text-gray-600" /> Số tiền (VNĐ)
                        </label>
                        <input
                          type="number"
                          id="paymentAmount"
                          name="paymentAmount"
                          value={formData.paymentAmount}
                          onChange={handleInputChange}
                          className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.paymentAmount ? 'border-red-500' : ''}`}
                        />
                        {formErrors.paymentAmount && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.paymentAmount}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                          Trạng thái
                        </label>
                        <select
                          id="paymentStatus"
                          name="paymentStatus"
                          value={formData.paymentStatus}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                        >
                          <option value="pending">Chờ thanh toán</option>
                          <option value="paid">Đã thanh toán</option>
                          <option value="expired">Đã hết hạn</option>
                        </select>
                      </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div>
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                        Phương thức thanh toán
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                      >
                        <option value="cash">Tiền mặt</option>
                        <option value="bank_transfer">Chuyển khoản</option>
                        <option value="credit_card">Thẻ tín dụng</option>
                      </select>
                    </div>

                    {/* Ghi chú */}
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                        placeholder="Nhập ghi chú nếu có..."
                      />
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
                    ) : isEditing ? 'Cập nhật' : 'Thêm đăng ký'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeFormModal}
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
    </div>
  );
} 