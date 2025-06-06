'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { subscriptionAPI, userAPI, membershipAPI } from '@/services/api';
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

interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

interface Membership {
  id: string;
  name: string;
  duration: number;
  price: number;
}



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
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [isConfirmPaymentModalOpen, setIsConfirmPaymentModalOpen] = useState(false);
  
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
  
  // Danh sách thành viên và gói tập từ API
  const [members, setMembers] = useState<Member[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);

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

    // Lấy dữ liệu đăng ký, thành viên và gói tập
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Gọi API để lấy subscriptions
        const subscriptionsResponse = await subscriptionAPI.getAllSubscriptions();
        if (subscriptionsResponse.status === 'success' && subscriptionsResponse.data?.subscriptions) {
          const subscriptionsData = subscriptionsResponse.data.subscriptions as unknown as Subscription[];
          setSubscriptions(subscriptionsData);
        } else {
          setSubscriptions([]);
        }

        // Gọi API để lấy danh sách thành viên
        try {
          const usersResponse = await userAPI.getAllUsers();
          if (usersResponse.status === 'success' && usersResponse.data?.users && Array.isArray(usersResponse.data.users)) {
            // Lọc chỉ lấy members, không lấy trainer hay admin
            const usersList = usersResponse.data.users as any[];
            const filteredUsers = usersList
              .filter((user: any) => user.role === 'member')
              .map((user: any) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                profileImage: user.profileImage // Thêm profileImage
              }));
            setMembers(filteredUsers);
          } else {
            setMembers([]);
          }
        } catch (memberError) {
          console.error('Error fetching members:', memberError);
          setMembers([]);
        }

        // Gọi API để lấy danh sách gói tập
        try {
          const membershipsResponse = await membershipAPI.getAllMemberships();
          if (membershipsResponse.status === 'success' && membershipsResponse.data?.memberships && Array.isArray(membershipsResponse.data.memberships)) {
            const membershipsArray = membershipsResponse.data.memberships as any[];
            const membershipsList = membershipsArray.map((membership: any) => ({
              id: membership.id,
              name: membership.name,
              duration: membership.duration,
              price: membership.price
            }));
            setMemberships(membershipsList);
          } else {
            setMemberships([]);
          }
        } catch (membershipError) {
          console.error('Error fetching memberships:', membershipError);
          setMemberships([]);
        }

      } catch (err) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        console.error('Error fetching data:', err);
        setSubscriptions([]);
        setMembers([]);
        setMemberships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.isAuthenticated, auth.user, router]);

  const handleBack = () => {
    router.push('/dashboard/admin');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Tạo avatar mặc định từ tên
  const generateAvatarFromName = (name: string) => {
    const names = name.split(' ');
    const initials = names.length >= 2 
      ? names[0].charAt(0) + names[names.length - 1].charAt(0)
      : names[0].charAt(0);
    return initials.toUpperCase();
  };

  // Tạo màu background ngẫu nhiên từ tên
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-indigo-400 to-purple-500',
      'from-blue-400 to-indigo-500', 
      'from-green-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-pink-400 to-red-500',
      'from-red-400 to-pink-500',
      'from-yellow-400 to-orange-500',
      'from-orange-400 to-red-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
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
    setIsDeleteModalOpen(false);
    setSelectedSubscriptionId(null);
  };

  // Đóng modal form
  const closeFormModal = () => {
    setIsFormModalOpen(false);
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
  const handleFormSubmit = async (e: React.FormEvent) => {
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
      
      const paymentDate = formData.paymentStatus === 'completed' 
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
        active: formData.paymentStatus === 'completed',
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        member: {
          name: member.name,
          email: member.email,
          phone: member.phone,
          avatar: member.profileImage // Sử dụng profileImage thật từ member data
        },
        membership: {
          name: membership.name,
          duration: membership.duration,
          price: membership.price
        }
      };
      
              if (isEditing && selectedSubscriptionId) {
          // Hiện tại API chưa có method update subscription, chỉ có updatePaymentStatus
          // TODO: Cần thêm API updateSubscription khi backend hỗ trợ
          alert('Chức năng cập nhật đăng ký chưa được hỗ trợ bởi API.');
        } else {
          // Gọi API thêm mới đăng ký
          try {
            const response = await subscriptionAPI.createSubscription(subscriptionData);
            if (response.status === 'success' && response.data?.subscription) {
              // Thêm vào state
              const newSubscription = response.data.subscription as unknown as Subscription;
              setSubscriptions([...subscriptions, newSubscription]);
              alert('Thêm đăng ký mới thành công!');
            } else {
              throw new Error(response.message || 'Thêm mới thất bại');
            }
          } catch (apiError) {
            console.error('API Error:', apiError);
            alert('Có lỗi xảy ra khi thêm mới. Vui lòng thử lại.');
          }
        }
        
        // Đóng modal
        closeFormModal();
        setIsSubmitting(false);
      
    } catch (error) {
      console.error('Error handling subscription:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSubscriptionId) return;
    
    try {
      // Gọi API để xóa subscription
      const response = await subscriptionAPI.cancelSubscription(selectedSubscriptionId);
      if (response.status === 'success') {
        // Xóa khỏi state
        const updatedSubscriptions = subscriptions.filter(
          subscription => subscription.id !== selectedSubscriptionId
        );
        setSubscriptions(updatedSubscriptions);
        alert('Đã xóa đăng ký thành công!');
      } else {
        throw new Error(response.message || 'Xóa thất bại');
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      alert('Có lỗi xảy ra khi xóa đăng ký. Vui lòng thử lại.');
    }
    
    closeDeleteModal();
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
      case 'completed':
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
      case 'failed':
        return {
          label: 'Thanh toán thất bại',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      case 'refunded':
        return {
          label: 'Đã hoàn tiền',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800'
        };
      case 'cancelled':
        return {
          label: 'Đã hủy',
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

  // Mở modal xác nhận thanh toán 
  const openConfirmPaymentModal = (id: string) => {
    setSelectedSubscriptionId(id);
    setIsConfirmPaymentModalOpen(true);
  };
  
  // Đóng modal xác nhận thanh toán
  const closeConfirmPaymentModal = () => {
    if (confirmingPayment) return; // Prevent closing while processing
    setIsConfirmPaymentModalOpen(false);
    setSelectedSubscriptionId(null);
  };

  // Hàm xác nhận thanh toán cho đơn đăng ký
  const handleConfirmPayment = async () => {
    if (!selectedSubscriptionId) return;
    
    try {
      setConfirmingPayment(true);
      
      // Tìm thông tin đơn đăng ký cần xác nhận
      const subscription = subscriptions.find(s => s.id === selectedSubscriptionId);
      if (!subscription) {
        throw new Error('Không tìm thấy thông tin đơn đăng ký');
      }
      
      // Dữ liệu thanh toán
      const paymentData = {
        paymentStatus: 'completed',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: subscription.paymentMethod || 'cash', // Giữ nguyên phương thức nếu có
        notes: subscription.notes ? `${subscription.notes}\nXác nhận thanh toán vào ${new Date().toLocaleString('vi-VN')}` : `Xác nhận thanh toán vào ${new Date().toLocaleString('vi-VN')}`
      };
      
      console.log('Xác nhận thanh toán cho đơn:', selectedSubscriptionId, paymentData);
      
      // Gọi API để cập nhật trạng thái thanh toán
      try {
        const response = await subscriptionAPI.updatePaymentStatus(selectedSubscriptionId, paymentData);
        console.log('API response:', response);
        
        if (response.status === 'success') {
          // Cập nhật trạng thái trong state
          const updatedSubscriptions = subscriptions.map(s => {
            if (s.id === selectedSubscriptionId) {
              return {
                ...s,
                paymentStatus: 'completed',
                paymentDate: paymentData.paymentDate,
                notes: paymentData.notes
              };
            }
            return s;
          });
          
          setSubscriptions(updatedSubscriptions);
          
          alert('Xác nhận thanh toán thành công!');
        } else {
          throw new Error(response.message || 'Cập nhật thất bại');
        }
      } catch (apiError) {
        console.error('API error:', apiError);
        alert('Không thể xác nhận thanh toán. Vui lòng thử lại sau.');
        return; // Don't close modal on API error, let user try again
      }
      
      // Đóng modal chỉ khi thành công
      closeConfirmPaymentModal();
      
    } catch (error) {
      console.error('Error confirming payment:', error);
      alert(`Có lỗi xảy ra: ${(error as Error).message}`);
    } finally {
      setConfirmingPayment(false);
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
                  <option value="completed">Đã thanh toán</option>
                  <option value="pending">Chờ thanh toán</option>
                  <option value="failed">Thanh toán thất bại</option>
                  <option value="refunded">Đã hoàn tiền</option>
                  <option value="cancelled">Đã hủy</option>
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
                      {filteredSubscriptions.filter(s => s.paymentStatus === 'completed').length}
                    </p>
                  </div>
                  <div className="flex-grow rounded-md bg-yellow-50 p-4">
                    <h3 className="text-sm font-medium text-yellow-900">Chờ thanh toán</h3>
                    <p className="mt-2 text-3xl font-bold text-yellow-900">
                      {filteredSubscriptions.filter(s => s.paymentStatus === 'pending').length}
                    </p>
                  </div>
                                      <div className="flex-grow rounded-md bg-red-50 p-4">
                    <h3 className="text-sm font-medium text-red-900">Thất bại/Hủy</h3>
                    <p className="mt-2 text-3xl font-bold text-red-900">
                      {filteredSubscriptions.filter(s => s.paymentStatus === 'failed' || s.paymentStatus === 'refunded' || s.paymentStatus === 'cancelled').length}
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
                                <div className="h-10 w-10 flex-shrink-0 relative">
                                  {(() => {
                                    // Tìm member thật từ danh sách đã load để lấy profileImage
                                    const realMember = members.find(m => m.id === subscription.memberId);
                                    const profileImage = realMember?.profileImage || subscription.member.avatar;
                                    
                                    if (profileImage) {
                                      const imageUrl = profileImage.startsWith('http') ? profileImage : `http://localhost:5000${profileImage}`;
                                      return (
                                        <>
                                          <img 
                                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-200" 
                                            src={imageUrl} 
                                            alt={subscription.member.name}
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.style.display = 'none';
                                              const fallback = target.parentElement?.querySelector('.avatar-fallback') as HTMLElement;
                                              if (fallback) fallback.style.display = 'flex';
                                            }}
                                          />
                                          <div 
                                            className={`avatar-fallback absolute inset-0 h-10 w-10 rounded-full bg-gradient-to-br ${getAvatarColor(subscription.member.name)} flex items-center justify-center text-white font-semibold text-sm border-2 border-gray-200`}
                                            style={{ display: 'none' }}
                                          >
                                            {generateAvatarFromName(subscription.member.name)}
                                          </div>
                                        </>
                                      );
                                    } else {
                                      return (
                                        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${getAvatarColor(subscription.member.name)} flex items-center justify-center text-white font-semibold text-sm border-2 border-gray-200`}>
                                          {generateAvatarFromName(subscription.member.name)}
                                        </div>
                                      );
                                    }
                                  })()}
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
                                {subscription.paymentStatus === 'pending' && (
                                  <button
                                    onClick={() => openConfirmPaymentModal(subscription.id)}
                                    disabled={confirmingPayment}
                                    className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50"
                                    title="Xác nhận thanh toán"
                                  >
                                    <FiCheck className="h-4 w-4" />
                                  </button>
                                )}
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
        <div 
          className="fixed inset-0 z-[55] overflow-y-auto" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeDeleteModal}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Modal Panel */}
            <div 
              className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
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
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeFormModal}
        >
          <div 
            className="bg-white rounded-lg p-0 w-full max-w-2xl mx-4 shadow-xl max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">
                {isEditing ? 'Sửa đăng ký' : 'Thêm đăng ký mới'}
              </h3>
              <button 
                onClick={closeFormModal}
                className="text-white hover:text-gray-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleFormSubmit} className="p-6">
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
                      <option value="completed">Đã thanh toán</option>
                      <option value="failed">Thanh toán thất bại</option>
                      <option value="refunded">Đã hoàn tiền</option>
                      <option value="cancelled">Đã hủy</option>
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
              
              {/* Footer */}
              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeFormModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : isEditing ? 'Cập nhật' : 'Thêm đăng ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xác nhận thanh toán */}
      {isConfirmPaymentModalOpen && selectedSubscriptionId && (
        <div 
          className="fixed inset-0 z-[60] overflow-y-auto" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeConfirmPaymentModal}
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            {/* Modal Panel */}
            <div 
              className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiDollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Xác nhận thanh toán</h3>
                    <div className="mt-2">
                      {(() => {
                        const subscription = subscriptions.find(s => s.id === selectedSubscriptionId);
                        return subscription ? (
                          <div className="text-sm text-gray-500">
                            <p className="mb-2">
                              Bạn có chắc chắn muốn xác nhận thanh toán cho đơn đăng ký này?
                            </p>
                            <div className="bg-gray-50 p-3 rounded-md mt-3">
                              <p><strong>Thành viên:</strong> {subscription.member.name}</p>
                              <p><strong>Gói tập:</strong> {subscription.membership.name}</p>
                              <p><strong>Thời hạn:</strong> {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}</p>
                              <p><strong>Số tiền:</strong> {subscription.paymentAmount.toLocaleString('vi-VN')} đ</p>
                              <p><strong>Phương thức:</strong> {
                                subscription.paymentMethod === 'cash' 
                                  ? 'Tiền mặt' 
                                  : subscription.paymentMethod === 'bank_transfer' 
                                  ? 'Chuyển khoản' 
                                  : 'Thẻ tín dụng'
                              }</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-red-500">Không tìm thấy thông tin đơn đăng ký</p>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmPayment}
                  disabled={confirmingPayment}
                >
                  {confirmingPayment ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : 'Xác nhận thanh toán'}
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeConfirmPaymentModal}
                  disabled={confirmingPayment}
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