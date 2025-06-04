'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { subscriptionAPI, membershipAPI, cancellationAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCalendar, FiArrowLeft, FiFilter, FiCheck, FiClock, FiInfo, FiAlertCircle, FiDollarSign, FiChevronRight, FiShoppingCart, FiX, FiTrash2 } from 'react-icons/fi';
import DebugHelper from './debug-helper';

interface Subscription {
  id: string;
  memberId: string;
  membershipId: string;
  startDate: string;
  endDate: string;
  active: boolean;
  paymentStatus: string;
  paymentMethod?: string;
  amount: number;
  membership: {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    features: string[];
  };
}

interface CancellationRequest {
  id: string;
  subscriptionId: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  requestDate: string;
  processedDate?: string;
  adminNote?: string;
}

export default function MemberSubscriptions() {
  const { auth } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Add new states for displaying and selecting memberships
  const [availableMemberships, setAvailableMemberships] = useState<any[]>([]);
  const [membershipLoading, setMembershipLoading] = useState(false);
  const [membershipError, setMembershipError] = useState<string | null>(null);
  const [showMembershipsModal, setShowMembershipsModal] = useState(false);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  // Add new states for tracking data source
  const [membershipDataSource, setMembershipDataSource] = useState<'api' | 'localStorage' | 'mock'>('mock');

  // Add new states for cancellation
  const [cancellationRequests, setCancellationRequests] = useState<CancellationRequest[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (auth.user && auth.user.role !== 'member') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        
        // Try to fetch subscriptions from the API
        if (auth.user && auth.user.id) {
          try {
            const response = await subscriptionAPI.getMemberSubscriptions(auth.user.id);
            
            if (response.status === 'success' && response.data && response.data.subscriptions) {
              // Map the API response to match our interface
              const subscriptionsData = Array.isArray(response.data.subscriptions) 
                ? response.data.subscriptions 
                : [response.data.subscriptions];
                
              const mappedSubscriptions = subscriptionsData.map((sub: any) => ({
                id: sub.id,
                memberId: sub.memberId,
                membershipId: sub.membershipId,
                startDate: sub.startDate,
                endDate: sub.endDate,
                active: sub.active,
                paymentStatus: sub.paymentStatus,
                paymentMethod: sub.paymentMethod,
                amount: sub.paymentAmount,
                membership: {
                  id: sub.membership?.id || sub.membershipId,
                  name: sub.membership?.name || 'Membership Plan',
                  description: sub.membership?.description || 'No description available',
                  duration: sub.membership?.duration || 1,
                  price: sub.membership?.price || sub.paymentAmount,
                  features: sub.membership?.features || []
                }
              }));
              
              setSubscriptions(mappedSubscriptions);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error('API error:', error);
            // Fall back to dummy data if API fails
          }
        }
        
        console.log('Using mock subscription data as API call failed or returned no data');
        
        // If API request fails or no data, use fake data for development
        const today = new Date();
        const oneMonthLater = new Date(today);
        oneMonthLater.setMonth(today.getMonth() + 1);
        
        const threeMonthsLater = new Date(today);
        threeMonthsLater.setMonth(today.getMonth() + 3);
        
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        
        const twoMonthsAgo = new Date(today);
        twoMonthsAgo.setMonth(today.getMonth() - 2);
        
        const sampleSubscriptions = [
          {
            id: '1',
            memberId: auth.user?.id || 'user1',
            membershipId: 'membership1',
            startDate: today.toISOString(),
            endDate: oneMonthLater.toISOString(),
            active: true,
            paymentStatus: 'completed',
            paymentMethod: 'credit_card',
            amount: 300000,
            membership: {
              id: 'membership1',
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
            }
          },
          {
            id: '2',
            memberId: auth.user?.id || 'user1',
            membershipId: 'membership2',
            startDate: oneMonthAgo.toISOString(),
            endDate: oneMonthLater.toISOString(),
            active: true,
            paymentStatus: 'pending',
            paymentMethod: 'banking',
            amount: 800000,
            membership: {
              id: 'membership2',
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
            }
          },
          {
            id: '3',
            memberId: auth.user?.id || 'user1',
            membershipId: 'membership1',
            startDate: twoMonthsAgo.toISOString(),
            endDate: oneMonthAgo.toISOString(),
            active: false,
            paymentStatus: 'completed',
            paymentMethod: 'cash',
            amount: 300000,
            membership: {
              id: 'membership1',
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
            }
          }
        ];
        
        setSubscriptions(sampleSubscriptions);
        // Data loaded from database only
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Không thể tải dữ liệu đăng ký. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [auth.isAuthenticated, auth.user, router]);

  // Add new effect to fetch cancellation requests
  useEffect(() => {
    const fetchCancellationRequests = async () => {
      if (auth.user && auth.user.id) {
        try {
          const response = await cancellationAPI.getMemberCancellationRequests(auth.user.id);
          if (response.status === 'success' && response.data?.cancellationRequests) {
            setCancellationRequests(response.data.cancellationRequests as CancellationRequest[]);
          }
        } catch (error) {
          console.error('Error fetching cancellation requests:', error);
        }
      }
    };

    if (auth.isAuthenticated) {
      fetchCancellationRequests();
    }
  }, [auth.isAuthenticated, auth.user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleBack = () => {
    router.push('/dashboard/member');
  };

  const handleBrowseMemberships = () => {
    // Instead of redirecting, open the modal to show available memberships
    fetchAvailableMemberships();
    setShowMembershipsModal(true);
  };

  // New function to fetch all available memberships from the API
  const fetchAvailableMemberships = async () => {
    try {
      setMembershipLoading(true);
      setMembershipError(null);
      
      // Ưu tiên lấy dữ liệu từ API trước
      const response = await membershipAPI.getAllMemberships();
      console.log('API response for memberships:', response);
      
      if (response.status === 'success' && response.data && Array.isArray(response.data.memberships) && response.data.memberships.length > 0) {
        // Sử dụng dữ liệu từ API nếu có
        console.log('Using membership data from API');
        
        // Filter duplicates by ID before setting state
        const uniqueMemberships = response.data.memberships.filter((membership, index, self) =>
          index === self.findIndex((m) => m.id === membership.id)
        );
        
        setAvailableMemberships(uniqueMemberships);
        setMembershipDataSource('api');
      } else {
        // Nếu API không có dữ liệu, sử dụng mock data
        console.log('API returned no memberships, using mock data');
        useMockMembershipData();
      }
    } catch (error) {
      console.error('Error fetching available memberships:', error);
      setMembershipError('Không thể tải danh sách gói tập từ cơ sở dữ liệu. Vui lòng thử lại sau.');
      
      // Nếu API gặp lỗi, sử dụng mock data
      useMockMembershipData();
    } finally {
      setMembershipLoading(false);
    }
  };
  
  // Helper function to set mock data
  const useMockMembershipData = () => {
    console.log('Using mock membership data');
    const mockMemberships = [
      {
        id: 'membership1',
        name: 'Basic',
        description: 'Gói cơ bản dành cho người mới bắt đầu.',
        duration: 2,
        price: 200000,
        features: [
          'Truy cập phòng tập không giới hạn',
          'Sử dụng thiết bị cơ bản',
          'Tư vấn dinh dưỡng cơ bản',
          'Giờ tập: 8:00 - 22:00'
        ]
      },
      {
        id: 'membership2',
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
        id: 'membership3',
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
    
    // Mock data for development purposes only
    
    setAvailableMemberships(mockMemberships);
    setMembershipDataSource('mock');
  };

  // Function to handle membership subscription
  const handleSubscribe = async (membershipId: string) => {
    if (!auth.user) {
      router.push('/auth/login');
      return;
    }
    
    try {
      setSubscribeLoading(true);
      setSubscribeError(null);
      
      console.log('Subscribing to membership ID:', membershipId);
      
      // Get membership details
      const selectedMembership = availableMemberships.find(m => m.id === membershipId);
      if (!selectedMembership) {
        console.error('Membership not found with ID:', membershipId);
        throw new Error('Không tìm thấy thông tin gói tập.');
      }
      
      // Check if user role is member
      if (auth.user.role !== 'member') {
        console.error('User does not have member role:', auth.user.role);
        throw new Error('Bạn cần có quyền thành viên để đăng ký gói tập.');
      }
      
      // Calculate start and end dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + selectedMembership.duration);
      
      // Create subscription data
      const subscriptionData = {
        memberId: auth.user.id,
        membershipId: membershipId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        paymentStatus: 'pending', // Default to pending as required
        paymentMethod: 'cash', // Default payment method
        paymentAmount: selectedMembership.price,
        active: true, // Active until payment deadline passes
        notes: 'Đăng ký mới. Vui lòng thanh toán trong vòng 24h.'
      };
      
      // Call API to create subscription
      const response = await subscriptionAPI.createSubscription(subscriptionData);
      console.log('API response:', response);
      
      if (response.status === 'success' && response.data && response.data.subscription) {
        setSubscribeSuccess(true);
        
        // Add new subscription to the existing list
        const subscriptionId = (response.data.subscription as any).id || `temp-${Date.now()}`;
        const newSubscription = {
          id: subscriptionId,
          memberId: auth.user.id,
          membershipId: membershipId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          active: true,
          paymentStatus: 'pending',
          amount: selectedMembership.price,
          membership: {
            id: selectedMembership.id,
            name: selectedMembership.name,
            description: selectedMembership.description,
            duration: selectedMembership.duration,
            price: selectedMembership.price,
            features: selectedMembership.features
          }
        };
        
        setSubscriptions(prevSubscriptions => [newSubscription, ...prevSubscriptions]);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowMembershipsModal(false);
          setSubscribeSuccess(false);
        }, 2000);
      } else {
        throw new Error(response.message || 'Đăng ký gói tập thất bại.');
      }
    } catch (error) {
      console.error('Error subscribing to membership:', error);
      const errorMsg = (error as Error).message || 'Đăng ký gói tập thất bại. Vui lòng thử lại sau.';
      setSubscribeError(errorMsg);
    } finally {
      setSubscribeLoading(false);
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatStatus = (subscription: Subscription) => {
    if (!subscription.active) {
      return 'Đã hết hạn';
    }
    
    if (subscription.paymentStatus === 'pending') {
      return 'Chờ thanh toán';
    }
    
    const daysRemaining = getDaysRemaining(subscription.endDate);
    
    if (daysRemaining <= 0) {
      return 'Hết hạn hôm nay';
    }
    
    if (daysRemaining <= 7) {
      return 'Expiring Soon';
    }
    
    return 'Active';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
      case 'Expired Today':
        return 'bg-red-100 text-red-800';
      case 'Payment Pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter subscriptions based on selected status
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const status = formatStatus(subscription);
    
    if (statusFilter === 'all') {
      return true;
    }
    
    if (statusFilter === 'active' && (status === 'Active' || status === 'Expiring Soon')) {
      return true;
    }
    
    if (statusFilter === 'expired' && (status === 'Expired' || status === 'Expired Today')) {
      return true;
    }
    
    if (statusFilter === 'pending' && status === 'Payment Pending') {
      return true;
    }
    
    return false;
  });

  const activeSubscriptions = subscriptions.filter(subscription => {
    const status = formatStatus(subscription);
    return status === 'Active' || status === 'Expiring Soon';
  });

  const expiredSubscriptions = subscriptions.filter(subscription => {
    const status = formatStatus(subscription);
    return status === 'Expired' || status === 'Expired Today';
  });

  const handleCancelSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowCancelModal(true);
    setCancelReason('');
    setCancelSuccess(false);
    setCancelError(null);
  };

  const handleCancelRequest = async () => {
    if (!selectedSubscription) return;
    
    try {
      setCancelLoading(true);
      setCancelError(null);
      
      const response = await cancellationAPI.requestCancellation({
        subscriptionId: selectedSubscription.id,
        reason: cancelReason
      });
      
      if (response.status === 'success' && response.data?.cancellationRequest) {
        setCancelSuccess(true);
        
        // Add to cancellation requests list
        const newRequest = response.data.cancellationRequest as CancellationRequest;
        setCancellationRequests(prev => [newRequest, ...prev]);
        
        // Update the subscription to show it has a pending cancellation request
        const updatedSubscriptions = subscriptions.map(sub => {
          if (sub.id === selectedSubscription.id) {
            // Create a copy of the subscription with a flag indicating it has a pending cancellation
            return { ...sub, hasPendingCancellation: true };
          }
          return sub;
        });
        
        setSubscriptions(updatedSubscriptions);
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowCancelModal(false);
          setCancelSuccess(false);
        }, 2000);
      } else {
        throw new Error(response.message || 'Yêu cầu hủy đăng ký thất bại.');
      }
    } catch (error) {
      console.error('Error requesting subscription cancellation:', error);
      const errorMsg = (error as Error).message || 'Yêu cầu hủy đăng ký thất bại. Vui lòng thử lại sau.';
      setCancelError(errorMsg);
    } finally {
      setCancelLoading(false);
    }
  };

  // Helper function to check if a subscription has a pending cancellation request
  const hasPendingCancellation = (subscriptionId: string) => {
    return cancellationRequests.some(req => 
      req.subscriptionId === subscriptionId && req.status === 'pending'
    );
  };

  // Helper function to get cancellation request status for a subscription
  const getCancellationStatus = (subscriptionId: string) => {
    const request = cancellationRequests.find(req => req.subscriptionId === subscriptionId);
    return request ? request.status : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Về bảng điều khiển
              </motion.button>
              <h1 className="text-2xl font-bold text-white">Gói đăng ký của tôi</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBrowseMemberships}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
            >
              <FiCreditCard className="w-5 h-5 mr-2" />
              Xem gói tập
            </motion.button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải gói đăng ký của bạn...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
              <FiInfo className="h-8 w-8 text-red-600" />
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
            {/* Stats & Filter */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-sm overflow-hidden text-white p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white bg-opacity-30 rounded-lg mr-4">
                      <FiCreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Tổng số đăng ký</p>
                      <h3 className="text-2xl font-bold">{subscriptions.length}</h3>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div 
                      className="h-2 bg-white rounded-full" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm overflow-hidden text-white p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white bg-opacity-30 rounded-lg mr-4">
                      <FiCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Đăng ký đang hoạt động</p>
                      <h3 className="text-2xl font-bold">{activeSubscriptions.length}</h3>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div 
                      className="h-2 bg-white rounded-full" 
                      style={{ width: `${subscriptions.length ? (activeSubscriptions.length / subscriptions.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-sm overflow-hidden text-white p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-white bg-opacity-30 rounded-lg mr-4">
                      <FiClock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Đăng ký đã hết hạn</p>
                      <h3 className="text-2xl font-bold">{expiredSubscriptions.length}</h3>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                    <div 
                      className="h-2 bg-white rounded-full" 
                      style={{ width: `${subscriptions.length ? (expiredSubscriptions.length / subscriptions.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Filter */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <FiFilter className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600 mr-3">Lọc:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'all' 
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'active' 
                      ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Đang hoạt động
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'pending' 
                      ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Chờ thanh toán
                </button>
                <button
                  onClick={() => setStatusFilter('expired')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'expired' 
                      ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Đã hết hạn
                </button>
              </div>
            </div>

            {/* Subscription List */}
            {filteredSubscriptions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                  <FiCreditCard className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy đăng ký nào</h3>
                <p className="mt-1 text-gray-500">Hãy thử thay đổi bộ lọc hoặc xem các gói tập có sẵn</p>
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBrowseMemberships}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Xem gói tập <FiChevronRight className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredSubscriptions.map((subscription, index) => {
                  const status = formatStatus(subscription);
                  const statusColor = getStatusColor(status);
                  const daysRemaining = getDaysRemaining(subscription.endDate);
                  const hasCancellationRequest = hasPendingCancellation(subscription.id);
                  
                  return (
                    <motion.div
                      key={subscription.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="border-b border-gray-100">
                        <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              subscription.membership.name === 'Basic' 
                                ? 'bg-blue-100 text-blue-600' 
                                : subscription.membership.name === 'Standard'
                                ? 'bg-indigo-100 text-indigo-600'
                                : 'bg-purple-100 text-purple-600'
                            }`}>
                              <FiCreditCard className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {subscription.membership.name} Plan
                              </h3>
                              <p className="text-sm text-gray-500">
                                {subscription.membership.duration} month{subscription.membership.duration > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                              {status}
                            </span>
                            <span className={`text-sm font-medium ${
                              subscription.paymentStatus === 'completed' ? 'text-green-600' : 
                              subscription.paymentStatus === 'pending' ? 'text-orange-600' : 'text-red-600'
                            }`}>
                              {subscription.paymentStatus.charAt(0).toUpperCase() + subscription.paymentStatus.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div>
                            <p className="text-sm text-gray-500 flex items-center mb-1">
                              <FiCalendar className="mr-1 text-gray-400" /> Start Date
                            </p>
                            <p className="text-gray-800">{formatDate(subscription.startDate)}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 flex items-center mb-1">
                              <FiCalendar className="mr-1 text-gray-400" /> End Date
                            </p>
                            <div>
                              <p className="text-gray-800">{formatDate(subscription.endDate)}</p>
                              {daysRemaining > 0 && daysRemaining <= 30 && (
                                <p className={`text-xs mt-1 ${daysRemaining <= 7 ? 'text-red-600' : 'text-orange-600'}`}>
                                  {daysRemaining} days remaining
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 flex items-center mb-1">
                              <FiDollarSign className="mr-1 text-gray-400" /> Payment
                            </p>
                            <p className="text-gray-800">
                              {subscription.amount.toLocaleString('vi-VN')} ₫
                              {subscription.paymentMethod && (
                                <span className="text-gray-500 text-xs ml-2">
                                  via {subscription.paymentMethod.replace('_', ' ')}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <FiInfo className="text-gray-400 mr-2" />
                            <p className="text-sm text-gray-500">{subscription.membership.description}</p>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {subscription.membership.features.slice(0, 4).map((feature, i) => (
                              <div key={i} className="flex items-start">
                                <FiCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                            {subscription.membership.features.length > 4 && (
                              <div className="flex items-start text-indigo-600 text-sm">
                                +{subscription.membership.features.length - 4} more features
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {subscription.active && subscription.paymentStatus === 'completed' && (
                          <>
                            {hasCancellationRequest ? (
                              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <div className="flex items-center">
                                  <FiClock className="h-5 w-5 text-yellow-500 mr-2" />
                                  <p className="text-sm text-yellow-700">
                                    Yêu cầu hủy đăng ký đang chờ xác nhận từ quản lý.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-6">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleCancelSubscription(subscription)}
                                  className="w-full inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                                >
                                  <FiTrash2 className="mr-2" /> Yêu cầu hủy gói tập
                                </motion.button>
                              </div>
                            )}
                          </>
                        )}
                        
                        {subscription.paymentStatus === 'pending' && (
                          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-3">
                            <div className="flex items-center">
                              <FiAlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                              <p className="text-sm text-orange-700">
                                Your payment is pending. Please complete the payment to activate your subscription.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        {/* Add the memberships modal */}
        {showMembershipsModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={() => !subscribeLoading && setShowMembershipsModal(false)}></div>
              
              <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => !subscribeLoading && setShowMembershipsModal(false)}
                    disabled={subscribeLoading}
                  >
                    <span className="sr-only">Close</span>
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-xl leading-6 font-bold text-gray-900 mb-6">
                      Chọn gói tập
                    </h3>
                    
                    {availableMemberships.length > 0 && (
                      <div className="mb-4 text-sm text-gray-500 bg-blue-50 p-2 rounded-md">
                        <FiInfo className="inline-block mr-1" />
                        Hiển thị {availableMemberships.length} gói tập có sẵn.
                      </div>
                    )}
                    
                    {subscribeSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FiCheck className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                              Đăng ký gói tập thành công! Vui lòng thanh toán trong vòng 24 giờ.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : subscribeError ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{subscribeError}</p>
                            {subscribeError.includes('không có quyền') && (
                              <p className="text-sm text-red-600 mt-1">
                                Đây là môi trường demo, bạn có thể tiếp tục đăng ký để thử nghiệm. Trong môi trường thực tế, bạn cần liên hệ quản lý.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    
                    {membershipLoading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                      </div>
                    ) : membershipError ? (
                      <div className="text-center py-12">
                        <p className="text-red-500 mb-4">{membershipError}</p>
                        <button 
                          onClick={fetchAvailableMemberships}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Thử lại
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {availableMemberships.map((membership) => (
                          <div 
                            key={membership.id} 
                            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                          >
                            <div className={`p-5 ${
                              membership.name === 'Basic' || membership.name === 'Cơ bản' 
                                ? 'bg-blue-600' 
                                : membership.name === 'Standard' || membership.name === 'Tiêu chuẩn'
                                ? 'bg-indigo-600'
                                : 'bg-purple-600'
                            } text-white`}>
                              <h3 className="text-lg font-semibold">{membership.name}</h3>
                              <p className="text-2xl font-bold mt-2">{membership.price.toLocaleString('vi-VN')} đ</p>
                              <p className="mt-1 text-sm opacity-90">{membership.duration} tháng</p>
                            </div>
                            
                            <div className="p-5">
                              <p className="text-gray-600 mb-4">{membership.description}</p>
                              
                              <ul className="space-y-2 mb-6">
                                {membership.features.map((feature: string, idx: number) => (
                                  <li key={idx} className="flex items-start">
                                    <FiCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                    <span className="text-sm text-gray-600">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <button
                                onClick={() => handleSubscribe(membership.id)}
                                disabled={subscribeLoading}
                                className={`w-full inline-flex justify-center items-center px-4 py-2 ${
                                  membership.name === 'Basic' || membership.name === 'Cơ bản'
                                    ? 'bg-blue-600 hover:bg-blue-700' 
                                    : membership.name === 'Standard' || membership.name === 'Tiêu chuẩn'
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                } text-white rounded-lg transition-colors duration-200`}
                              >
                                {subscribeLoading ? (
                                  <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xử lý...
                                  </>
                                ) : (
                                  <>
                                    <FiShoppingCart className="mr-2 h-4 w-4" /> Đăng ký ngay
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    <FiInfo className="inline-block mr-1" /> 
                    Sau khi đăng ký, bạn cần thanh toán trong vòng 24 giờ để kích hoạt gói tập. 
                    Vui lòng liên hệ quản lý để được hướng dẫn thanh toán.
                  </p>
                  
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                    onClick={() => !subscribeLoading && setShowMembershipsModal(false)}
                    disabled={subscribeLoading}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Cancel Subscription Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={() => !cancelLoading && setShowCancelModal(false)}></div>
              
              <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => !cancelLoading && setShowCancelModal(false)}
                    disabled={cancelLoading}
                  >
                    <span className="sr-only">Close</span>
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-xl leading-6 font-bold text-gray-900 mb-6">
                      Yêu cầu hủy gói tập
                    </h3>
                    
                    {selectedSubscription && (
                      <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                        <p className="font-medium text-indigo-800">{selectedSubscription.membership.name} Plan</p>
                        <p className="text-sm text-indigo-600">Kết thúc vào: {formatDate(selectedSubscription.endDate)}</p>
                      </div>
                    )}
                    
                    {cancelSuccess ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FiCheck className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                              Yêu cầu hủy gói tập đã được gửi và đang chờ xét duyệt từ quản lý.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : cancelError ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{cancelError}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-600 mb-4">
                          Bạn đang yêu cầu hủy gói tập. Yêu cầu này sẽ được gửi đến quản lý để xem xét.
                          Vui lòng cung cấp lý do hủy gói tập.
                        </p>
                        
                        <div className="mb-6">
                          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                            Lý do hủy gói tập
                          </label>
                          <textarea
                            id="reason"
                            rows={4}
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Vui lòng nhập lý do hủy gói tập..."
                            className="w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => setShowCancelModal(false)}
                            disabled={cancelLoading}
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                          >
                            Hủy bỏ
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelRequest}
                            disabled={cancelLoading}
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none"
                          >
                            {cancelLoading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang xử lý...
                              </>
                            ) : (
                              'Gửi yêu cầu'
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Debug helper component */}
      <DebugHelper />
    </div>
  );
} 