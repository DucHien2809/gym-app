'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { membershipAPI, subscriptionAPI, cancellationAPI, userAPI } from '@/services/api';
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft, FiCheck, FiX, FiDollarSign, FiClock, FiInfo, FiList, FiUser, FiCalendar, FiSearch, FiFilter, FiPackage } from 'react-icons/fi';
import useModal from '@/hooks/useModal';
import AvatarImage from './AvatarImage';


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

interface CancellationRequest {
  id: string;
  subscriptionId: string;
  memberId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  adminNote?: string;
  refundAmount?: number;
  processedById?: string;
  processedDate?: string;
  createdAt: string;
  updatedAt: string;
  member?: {
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
  subscription?: {
    id: string;
    startDate: string;
    endDate: string;
    membership?: {
      name: string;
      duration: number;
      price: number;
    }
  };
}

export default function MembershipManagement() {
  const { auth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sử dụng hook useModal
  const addModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  
  // State cho form và submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MembershipFormData>({
    name: '',
    description: '',
    duration: 1,
    price: 0,
    features: ['']
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // States cho modal sửa gói
  const [editingMembershipId, setEditingMembershipId] = useState<string | null>(null);
  
  // State hiển thị xác nhận xóa
  const [deletingMembershipId, setDeletingMembershipId] = useState<string | null>(null);

  // State cho tab quản lý gói tập và đăng ký
  const [activeTab, setActiveTab] = useState('memberships'); // 'memberships', 'subscriptions', hoặc 'cancellations'
  const [showDebug, setShowDebug] = useState(false);
  
  // States cho danh sách đăng ký chờ thanh toán
  const [pendingSubscriptions, setPendingSubscriptions] = useState<any[]>([]);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
  const [subscriptionsError, setSubscriptionsError] = useState<string | null>(null);
  
  // State cho confirmations
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [confirmingSubscriptionId, setConfirmingSubscriptionId] = useState<string | null>(null);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);
  const [cancelingSubscriptionId, setCancelingSubscriptionId] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // States cho cancellation requests
  const [cancellationRequests, setCancellationRequests] = useState<CancellationRequest[]>([]);
  const [cancellationsLoading, setCancellationsLoading] = useState(false);
  const [cancellationsError, setCancellationsError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CancellationRequest | null>(null);
  const [processingNote, setProcessingNote] = useState('');
  const [refundAmount, setRefundAmount] = useState<string>('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

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

    // Check URL parameters for tab selection
    const tabParam = searchParams.get('tab');
    if (tabParam && ['memberships', 'subscriptions', 'cancellations'].includes(tabParam)) {
      setActiveTab(tabParam);
      
      // Load data for the specific tab
      if (tabParam === 'subscriptions') {
        fetchPendingSubscriptions();
      } else if (tabParam === 'cancellations') {
        fetchCancellationRequests();
      }
    }

    // Lấy dữ liệu gói tập
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching memberships from API...');
        const response = await membershipAPI.getAllMemberships();
        console.log('API response:', response);
        
        if (response.status === 'success' && response.data?.memberships) {
          const membershipsData = response.data.memberships as unknown as Membership[];
          console.log('Found memberships from API:', membershipsData.length);
          setMemberships(membershipsData);
        } else {
          // If no data from API, create default memberships in database
          console.log('No data from API, creating default memberships in database');
          await createDefaultMemberships();
        }
      } catch (apiError) {
        console.error('API error:', apiError);
        setError('Không thể tải dữ liệu gói tập. Vui lòng thử lại sau.');
        
        // Try to create default memberships if API fails completely
        try {
          await createDefaultMemberships();
        } catch (createError) {
          console.error('Failed to create default memberships:', createError);
          setError('Không thể tải và tạo dữ liệu gói tập. Vui lòng kiểm tra kết nối mạng.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    // Function to create default memberships in database
    const createDefaultMemberships = async () => {
      console.log('Creating default membership data in database');
      const defaultMemberships = [
        {
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
      
             // Create each membership in database
       const createdMemberships: Membership[] = [];
       for (const membership of defaultMemberships) {
         try {
           const response = await membershipAPI.createMembership(membership);
           if (response.status === 'success' && response.data?.membership) {
             createdMemberships.push(response.data.membership as unknown as Membership);
           }
         } catch (error) {
           console.error('Error creating default membership:', error, membership);
         }
       }
       
       if (createdMemberships.length > 0) {
         setMemberships(createdMemberships);
         console.log('Successfully created default memberships in database');
       } else {
         throw new Error('Failed to create any default memberships');
       }
    };

    fetchMemberships();
  }, [auth.isAuthenticated, auth.user, router, searchParams]);

  // New function to fetch pending subscriptions
  const fetchPendingSubscriptions = async () => {
    try {
      setSubscriptionsLoading(true);
      setSubscriptionsError(null);
      
      const response = await subscriptionAPI.getAllSubscriptions();
      
      if (response.status === 'success' && response.data && Array.isArray(response.data.subscriptions)) {
        // Filter only pending subscriptions
        const pendingSubs = response.data.subscriptions.filter(
          (sub: any) => sub.paymentStatus === 'pending'
        );
        
        // Enhance subscriptions with member details
        const enhancedSubs = await Promise.all(
          pendingSubs.map(async (sub: any) => {
            let enhancedSub = { ...sub };
            
            // Get detailed member info if memberId exists
            if (sub.memberId) {
              try {
                const memberResponse = await userAPI.getUser(sub.memberId);
                if (memberResponse.status === 'success' && memberResponse.data?.user) {
                  const userData = memberResponse.data.user as any;
                  enhancedSub.member = {
                    ...sub.member, // Keep existing member data
                    name: userData.name || sub.member?.name || 'Unknown',
                    email: userData.email || sub.member?.email || 'N/A',
                    phone: userData.phone || sub.member?.phone,
                    profileImage: userData.profileImage, // Get real profile image
                  };
                }
              } catch (error) {
                console.error('Error fetching member details for subscription:', error);
              }
            }
            
            return enhancedSub;
          })
        );
        
        console.log('Enhanced subscriptions with member details:', enhancedSubs);
        setPendingSubscriptions(enhancedSubs);
      } else {
        // Use mock data if API fails
        const mockPendingSubscriptions = [
          {
            id: 'sub1',
            memberId: 'member1',
            membershipId: 'membership1',
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
            paymentStatus: 'pending',
            paymentAmount: 300000,
            active: true,
            createdAt: new Date().toISOString(),
            member: {
              name: 'Nguyễn Văn A',
              email: 'nguyenvana@example.com',
              profileImage: 'user1.jpg'
            },
            membership: {
              name: 'Basic',
              duration: 1,
              price: 300000
            }
          },
          {
            id: 'sub2',
            memberId: 'member2',
            membershipId: 'membership2',
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
            paymentStatus: 'pending',
            paymentAmount: 800000,
            active: true,
            createdAt: new Date(new Date().setHours(new Date().getHours() - 12)).toISOString(),
            member: {
              name: 'Trần Thị B',
              email: 'tranthib@example.com',
              profileImage: 'user2.jpg'
            },
            membership: {
              name: 'Standard',
              duration: 3,
              price: 800000
            }
          }
        ];
        
        setPendingSubscriptions(mockPendingSubscriptions);
      }
    } catch (error) {
      console.error('Error fetching pending subscriptions:', error);
      setSubscriptionsError('Không thể tải danh sách đăng ký. Vui lòng thử lại sau.');
    } finally {
      setSubscriptionsLoading(false);
    }
  };

  // Function to confirm payment
  const handleConfirmPayment = async () => {
    if (!confirmingSubscriptionId) return;
    
    try {
      setPaymentProcessing(true);
      
      const response = await subscriptionAPI.updatePaymentStatus(confirmingSubscriptionId, {
        paymentStatus: 'completed',
        paymentDate: new Date().toISOString(),
      });
      
      if (response.status === 'success') {
        // Update the list of pending subscriptions
        setPendingSubscriptions(prev => 
          prev.filter(sub => sub.id !== confirmingSubscriptionId)
        );
        
        // Close the confirmation modal
        setShowPaymentConfirm(false);
        setConfirmingSubscriptionId(null);
      } else {
        throw new Error(response.message || 'Xác nhận thanh toán thất bại.');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      alert('Đã xảy ra lỗi khi xác nhận thanh toán. Vui lòng thử lại.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Function to cancel subscription
  const handleCancelSubscription = async () => {
    if (!cancelingSubscriptionId) return;
    
    try {
      setPaymentProcessing(true);
      
      const response = await subscriptionAPI.cancelSubscription(cancelingSubscriptionId);
      
      if (response.status === 'success') {
        // Update the list of pending subscriptions
        setPendingSubscriptions(prev => 
          prev.filter(sub => sub.id !== cancelingSubscriptionId)
        );
        
        // Close the confirmation modal
        setShowCancelSubscription(false);
        setCancelingSubscriptionId(null);
      } else {
        throw new Error(response.message || 'Hủy đăng ký thất bại.');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Đã xảy ra lỗi khi hủy đăng ký. Vui lòng thử lại.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'subscriptions') {
      fetchPendingSubscriptions();
    } else if (tab === 'cancellations') {
      fetchCancellationRequests();
    }
  };

  // Function to fetch cancellation requests
  const fetchCancellationRequests = async () => {
    try {
      setCancellationsLoading(true);
      setCancellationsError(null);
      
      const response = await cancellationAPI.getAllCancellationRequests();
      
      if (response.status === 'success' && Array.isArray(response.data?.cancellationRequests)) {
        const requests = response.data.cancellationRequests;
        
        // Fetch additional data for each request
        const enhancedRequests = await Promise.all(
          requests.map(async (request) => {
            let enhancedRequest = { ...request };
            
            // Get member details
            try {
              const memberResponse = await userAPI.getUser(request.memberId);
              if (memberResponse.status === 'success' && memberResponse.data?.user) {
                const userData = memberResponse.data.user as any;
                enhancedRequest.member = {
                  name: userData.name || 'Unknown',
                  email: userData.email || 'N/A',
                  phone: userData.phone,
                  profileImage: userData.profileImage,
                };
              }
            } catch (error) {
              console.error('Error fetching member details:', error);
            }
            
            // Get subscription details
            try {
              const subscriptionResponse = await subscriptionAPI.getSubscription(request.subscriptionId);
              if (subscriptionResponse.status === 'success' && subscriptionResponse.data?.subscription) {
                enhancedRequest.subscription = subscriptionResponse.data.subscription;
              }
            } catch (error) {
              console.error('Error fetching subscription details:', error);
            }
            
            return enhancedRequest;
          })
        );
        
        console.log('Enhanced cancellation requests with member details:', enhancedRequests);
        setCancellationRequests(enhancedRequests);
      } else {
        // Use mock data if API fails
        const mockCancellationRequests = [
          {
            id: 'cancel1',
            subscriptionId: 'sub1',
            memberId: 'member1',
            requestDate: new Date().toISOString(),
            status: 'pending' as const,
            reason: 'Không thể tiếp tục tập do bận công việc',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            member: {
              name: 'Nguyễn Văn A',
              email: 'nguyenvana@example.com',
              profileImage: 'user1.jpg'
            },
            subscription: {
              id: 'sub1',
              startDate: new Date().toISOString(),
              endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
              membership: {
                name: 'Standard',
                duration: 3,
                price: 800000
              }
            }
          },
          {
            id: 'cancel2',
            subscriptionId: 'sub2',
            memberId: 'member2',
            requestDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
            status: 'approved' as const,
            reason: 'Chuyển đến thành phố khác',
            adminNote: 'Đã xác nhận thông tin, chấp thuận yêu cầu hủy',
            processedDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
            updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
            member: {
              name: 'Trần Thị B',
              email: 'tranthib@example.com',
              profileImage: 'user2.jpg'
            },
            subscription: {
              id: 'sub2',
              startDate: new Date().toISOString(),
              endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString(),
              membership: {
                name: 'Premium',
                duration: 12,
                price: 2500000
              }
            }
          }
        ];
        
        setCancellationRequests(mockCancellationRequests);
      }
    } catch (error) {
      console.error('Error fetching cancellation requests:', error);
      setCancellationsError('Không thể tải danh sách yêu cầu hủy. Vui lòng thử lại sau.');
    } finally {
      setCancellationsLoading(false);
    }
  };

  // Cancellation request handlers
  const handleProcessClick = (request: CancellationRequest) => {
    setSelectedRequest(request);
    setProcessingNote('');
    setIsProcessModalOpen(true);
  };

  const closeProcessModal = () => {
    setIsProcessModalOpen(false);
    setSelectedRequest(null);
    setProcessingNote('');
    setRefundAmount('');
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    try {
      setIsApproving(true);
      
      const processingData = {
        status: 'approved',
        adminNote: processingNote,
        refundAmount: refundAmount ? parseFloat(refundAmount) : 0,
        processedById: auth.user?.id
      };
      
      const response = await cancellationAPI.processCancellationRequest(selectedRequest.id, processingData);
      
      if (response.status === 'success') {
        setCancellationRequests(prev => 
          prev.map(req => 
            req.id === selectedRequest.id 
              ? { 
                  ...req, 
                  status: 'approved', 
                  adminNote: processingNote,
                  processedById: auth.user?.id,
                  processedDate: new Date().toISOString() 
                } 
              : req
          )
        );
        
        closeProcessModal();
      } else {
        setCancellationsError('Không thể duyệt yêu cầu hủy');
      }
    } catch (error: any) {
      console.error('Error approving cancellation request:', error);
      console.error('Error details:', {
        message: error?.message,
        httpStatus: error?.httpStatus,
        responseData: error?.responseData,
        status: error?.status
      });
      
      let errorMessage = 'Đã xảy ra lỗi khi duyệt yêu cầu hủy';
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.responseData?.message) {
        errorMessage = error.responseData.message;
      }
      
      setCancellationsError(errorMessage);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;
    
    try {
      setIsRejecting(true);
      
      const processingData = {
        status: 'rejected',
        adminNote: processingNote,
        processedById: auth.user?.id
      };
      
      const response = await cancellationAPI.processCancellationRequest(selectedRequest.id, processingData);
      
      if (response.status === 'success') {
        setCancellationRequests(prev => 
          prev.map(req => 
            req.id === selectedRequest.id 
              ? { 
                  ...req, 
                  status: 'rejected', 
                  adminNote: processingNote,
                  processedById: auth.user?.id,
                  processedDate: new Date().toISOString() 
                } 
              : req
          )
        );
        
        closeProcessModal();
      } else {
        setCancellationsError('Không thể từ chối yêu cầu hủy');
      }
    } catch (error: any) {
      console.error('Error rejecting cancellation request:', error);
      console.error('Error details:', {
        message: error?.message,
        httpStatus: error?.httpStatus,
        responseData: error?.responseData,
        status: error?.status
      });
      
      let errorMessage = 'Đã xảy ra lỗi khi từ chối yêu cầu hủy';
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.responseData?.message) {
        errorMessage = error.responseData.message;
      }
      
      setCancellationsError(errorMessage);
    } finally {
      setIsRejecting(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Đang chờ
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Đã duyệt
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Từ chối
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate time remaining for payment
  const getTimeRemaining = (createdAtString: string) => {
    const createdAt = new Date(createdAtString);
    const deadline = new Date(createdAt);
    deadline.setHours(deadline.getHours() + 24);
    
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffMs <= 0) {
      return 'Hết hạn';
    }
    
    return `${diffHrs} giờ ${diffMins} phút`;
  };

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
    addModal.open();
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
    editModal.open();
  };

  // Xử lý đóng modal thêm mới
  const handleCloseAddModal = () => {
    if (isSubmitting) return;
    addModal.close();
  };

  // Xử lý đóng modal chỉnh sửa
  const handleCloseEditModal = () => {
    if (isSubmitting) return;
    editModal.close();
  };

  // Mở dialog xác nhận xóa
  const handleOpenDeleteConfirm = (membershipId: string) => {
    setDeletingMembershipId(membershipId);
    deleteModal.open();
  };

  // Đóng dialog xác nhận xóa
  const handleCloseDeleteConfirm = () => {
    if (isSubmitting) return;
    deleteModal.close();
    setDeletingMembershipId(null);
  };

  // Xử lý xóa gói tập
  const handleDeleteMembership = () => {
    if (!deletingMembershipId) return;
    
    setIsSubmitting(true);
    
    try {
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
            
            // Đóng modal trước khi hiển thị thông báo
            deleteModal.close();
            setDeletingMembershipId(null);
            
            // Thông báo đã xóa thành công
            alert('Đã xóa gói tập thành công!');
          }
        })
        .catch((error) => {
          console.error('Error deleting membership:', error);
          
          // API gặp lỗi
          console.error('Error deleting membership from API:', error);
          
          // Đóng modal trước khi hiển thị thông báo
          deleteModal.close();
          setDeletingMembershipId(null);
          
          alert('Không thể xóa gói tập. Vui lòng thử lại sau.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error('Unexpected error in delete handler:', error);
      setIsSubmitting(false);
      deleteModal.close();
      setDeletingMembershipId(null);
      alert('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.');
    }
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
      if (editModal.isOpen && editingMembershipId) {
        // Đang chỉnh sửa gói tập hiện có
        const updateData = {
          name: formData.name,
          description: formData.description,
          duration: formData.duration,
          price: formData.price,
          features: cleanedFeatures
        };
        
        console.log('Updating membership to API:', updateData);
        
        // Gọi API cập nhật membership
        try {
          const response = await membershipAPI.updateMembership(editingMembershipId, updateData);
          
          if (response.status === 'success' && response.data?.membership) {
            // Cập nhật thành công
            const updatedMembership = response.data.membership as unknown as Membership;
            
            // Cập nhật state
            const updatedMemberships = memberships.map(membership => 
              membership.id === editingMembershipId ? updatedMembership : membership
            );
            
            setMemberships(updatedMemberships);
            
            // Cập nhật thành công
            
            editModal.close();
            alert('Đã cập nhật gói tập thành công!');
            return;
          }
        } catch (apiError) {
          console.error('API error when updating membership:', apiError);
        }
        
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
        
        // Cập nhật state
        setMemberships(updatedMemberships);
        
        editModal.close();
        alert('Đã cập nhật gói tập thành công! (Lưu ý: Chỉ lưu cục bộ, sẽ đồng bộ với cơ sở dữ liệu khi có kết nối)');
      } else {
        // Đang thêm gói tập mới
        const newMembershipData = {
          name: formData.name,
          description: formData.description,
          duration: formData.duration,
          price: formData.price,
          features: cleanedFeatures
        };
        
        console.log('Creating new membership in API:', newMembershipData);
        
        try {
          // Gọi API tạo membership mới
          const response = await membershipAPI.createMembership(newMembershipData);
          
          if (response.status === 'success' && response.data?.membership) {
            // Thêm membership mới vào danh sách
            const createdMembership = response.data.membership as unknown as Membership;
            const updatedMemberships = [...memberships, createdMembership];
            
            setMemberships(updatedMemberships);
            
            // Lưu thành công vào database
            
            addModal.close();
            alert('Đã thêm gói mới thành công vào cơ sở dữ liệu!');
            return;
          }
        } catch (apiError) {
          console.error('Error creating membership in API:', apiError);
        }
        
        // API gặp lỗi
        addModal.close();
        alert('Không thể thêm gói mới. Vui lòng thử lại sau.');
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
      <div className="bg-indigo-600">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="flex items-center justify-center p-2 mr-4 text-white bg-indigo-700 rounded-full"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold text-white">Quản lý Gói Tập & Đăng Ký</h1>
            </div>
            
            <div className="flex space-x-3">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'memberships'
                    ? 'bg-white text-indigo-700'
                    : 'bg-indigo-700 text-white hover:bg-indigo-800'
                }`}
                onClick={() => handleTabChange('memberships')}
              >
                <FiList className="inline-block mr-2" />
                Gói tập
              </button>
              
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'subscriptions'
                    ? 'bg-white text-indigo-700'
                    : 'bg-indigo-700 text-white hover:bg-indigo-800'
                }`}
                onClick={() => handleTabChange('subscriptions')}
              >
                <FiDollarSign className="inline-block mr-2" />
                Đơn đăng ký
              </button>

              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'cancellations'
                    ? 'bg-white text-indigo-700'
                    : 'bg-indigo-700 text-white hover:bg-indigo-800'
                }`}
                onClick={() => handleTabChange('cancellations')}
              >
                <FiX className="inline-block mr-2" />
                Yêu cầu hủy
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Tab content */}
        {activeTab === 'memberships' ? (
          <>
            {/* Original membership management content */}
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-medium text-gray-900">Danh sách gói tập</h2>
              <button
                onClick={handleOpenAddModal}
                className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                <FiPlus className="mr-2" /> Thêm gói mới
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="p-4 border border-red-300 rounded-md bg-red-50">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 mt-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Thử lại
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {memberships.map((membership) => (
                  <div key={membership.id} className="overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{membership.name}</h3>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleOpenEditModal(membership)}
                            className="p-1 text-gray-400 rounded hover:bg-gray-100 hover:text-gray-500"
                          >
                            <FiEdit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteConfirm(membership.id)}
                            className="p-1 text-gray-400 rounded hover:bg-gray-100 hover:text-red-500"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {membership.duration} tháng
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 ml-2 text-xs font-medium bg-blue-100 rounded-full text-blue-800">
                          {membership.price.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>
                    <div className="px-6 py-4">
                      <p className="text-sm text-gray-500">{membership.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Tính năng:</h4>
                        <ul className="mt-2 space-y-2">
                          {membership.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <FiCheck className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-600 leading-5">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : activeTab === 'subscriptions' ? (
          <>
            {/* Pending Subscriptions Management */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-900">Đơn đăng ký chờ thanh toán</h2>
              <p className="mt-1 text-gray-500">Xác nhận thanh toán hoặc hủy các đơn đăng ký gói tập.</p>
            </div>

            {subscriptionsLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
              </div>
            ) : subscriptionsError ? (
              <div className="p-4 border border-red-300 rounded-md bg-red-50">
                <p className="text-red-700">{subscriptionsError}</p>
                <button
                  onClick={fetchPendingSubscriptions}
                  className="px-4 py-2 mt-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Thử lại
                </button>
              </div>
            ) : pendingSubscriptions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-full">
                  <FiInfo className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Không có đơn đăng ký nào</h3>
                <p className="mt-1 text-gray-500">Hiện tại không có đơn đăng ký nào đang chờ thanh toán.</p>
              </div>
            ) : (
              <div className="overflow-hidden bg-white shadow-sm rounded-lg">
                <div className="table-container">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Thành viên
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Gói tập
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Thời gian
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Thanh toán
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Thời hạn còn lại
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase min-w-[120px]">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingSubscriptions.map((subscription) => (
                        <tr key={subscription.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 table-cell-nowrap">
                            <div className="flex items-center">
                              <AvatarImage 
                                profileImage={subscription.member?.profileImage}
                                name={subscription.member?.name || 'User'}
                                size="h-10 w-10"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{subscription.member?.name}</div>
                                <div className="text-sm text-gray-500">{subscription.member?.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 table-cell-nowrap">
                            <div className="text-sm text-gray-900">{subscription.membership?.name}</div>
                            <div className="text-sm text-gray-500">{subscription.membership?.duration} tháng</div>
                          </td>
                          <td className="px-6 py-4 table-cell-nowrap">
                            <div className="text-sm text-gray-500">Bắt đầu: {formatDate(subscription.startDate)}</div>
                            <div className="text-sm text-gray-500">Kết thúc: {formatDate(subscription.endDate)}</div>
                          </td>
                          <td className="px-6 py-4 table-cell-nowrap">
                            <div className="text-sm font-medium text-gray-900">{subscription.paymentAmount?.toLocaleString('vi-VN')} đ</div>
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Chờ thanh toán
                            </div>
                          </td>
                          <td className="px-6 py-4 table-cell-nowrap">
                            <div className="text-sm text-gray-900">{getTimeRemaining(subscription.createdAt)}</div>
                            <div className="text-xs text-gray-500">Đăng ký lúc: {formatDate(subscription.createdAt)}</div>
                          </td>
                          <td className="px-6 py-4 table-cell-nowrap min-w-[120px]">
                            <div className="action-buttons">
                              <button
                                onClick={() => {
                                  setConfirmingSubscriptionId(subscription.id);
                                  setShowPaymentConfirm(true);
                                }}
                                className="action-button inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                              >
                                <FiCheck className="w-4 h-4 mr-1 flex-shrink-0" /> 
                                <span className="button-text-full">Xác nhận</span>
                                <span className="button-text-short">OK</span>
                              </button>
                              <button
                                onClick={() => {
                                  setCancelingSubscriptionId(subscription.id);
                                  setShowCancelSubscription(true);
                                }}
                                className="action-button inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                              >
                                <FiX className="w-4 h-4 mr-1 flex-shrink-0" /> 
                                <span className="button-text-full">Hủy</span>
                                <span className="button-text-short">X</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Cancellation Requests Management */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-900">Yêu cầu hủy gói tập</h2>
              <p className="mt-1 text-gray-500">Quản lý các yêu cầu hủy gói tập từ thành viên.</p>
            </div>

            {cancellationsError && (
              <div className="p-4 mb-6 border border-red-300 rounded-md bg-red-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiX className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{cancellationsError}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-hidden bg-white shadow-sm rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Tìm kiếm theo tên, email, gói tập..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative inline-block w-full sm:w-auto">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiFilter className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full"
                      >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Đang chờ</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="rejected">Từ chối</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-container">
                {cancellationsLoading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="mt-3 text-sm text-gray-500">Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  (() => {
                    const filteredRequests = cancellationRequests.filter(request => {
                      const matchesSearch = searchTerm === '' || 
                        (request.member?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (request.member?.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (request.subscription?.membership?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (request.reason?.toLowerCase().includes(searchTerm.toLowerCase()));
                      
                      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
                      
                      return matchesSearch && matchesStatus;
                    });

                    return filteredRequests.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Hội viên
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Gói tập
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ngày yêu cầu
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Lý do
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Thao tác
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 table-cell-nowrap">
                                <div className="flex items-center">
                                  <AvatarImage 
                                    profileImage={request.member?.profileImage}
                                    name={request.member?.name || 'User'}
                                    size="h-10 w-10"
                                  />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{request.member?.name || 'N/A'}</div>
                                    <div className="text-sm text-gray-500">{request.member?.email || 'N/A'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 table-cell-nowrap">
                                <div className="text-sm text-gray-900">{request.subscription?.membership?.name || 'N/A'}</div>
                                <div className="text-sm text-gray-500">
                                  {request.subscription?.startDate && request.subscription?.endDate ? 
                                    `${new Date(request.subscription.startDate).toLocaleDateString('vi-VN')} - ${new Date(request.subscription.endDate).toLocaleDateString('vi-VN')}` : 
                                    'N/A'
                                  }
                                </div>
                              </td>
                              <td className="px-6 py-4 table-cell-nowrap text-sm text-gray-500">
                                {formatDate(request.requestDate)}
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                  {request.reason || 'Không có lý do'}
                                </div>
                              </td>
                              <td className="px-6 py-4 table-cell-nowrap">
                                {getStatusDisplay(request.status)}
                              </td>
                              <td className="px-6 py-4 table-cell-nowrap text-right text-sm font-medium">
                                {request.status === 'pending' ? (
                                  <button
                                    onClick={() => handleProcessClick(request)}
                                    className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded border border-indigo-600 hover:bg-indigo-50"
                                  >
                                    Xử lý
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleProcessClick(request)}
                                    className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                                  >
                                    Chi tiết
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-6 text-center">
                        <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Không có yêu cầu hủy</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm || statusFilter !== 'all' 
                            ? 'Không tìm thấy yêu cầu nào khớp với bộ lọc của bạn.' 
                            : 'Hiện tại không có yêu cầu hủy gói tập nào.'}
                        </p>
                      </div>
                    );
                  })()
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modals section */}
      {/* Add Modal */}
      {addModal.isOpen && (        <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay">          <div className="flex items-center justify-center min-h-screen p-4 text-center">            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => !isSubmitting && handleCloseAddModal()}></div>                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg modal-container">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Thêm gói tập mới</h3>
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Tên gói */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên gói</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Ví dụ: Basic, Standard, Premium..."
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                  </div>
                  
                  {/* Mô tả */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.description ? 'border-red-500' : ''}`}
                      placeholder="Mô tả ngắn về gói tập..."
                    />
                    {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
                  </div>
                  
                  {/* Thời hạn và giá */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Thời hạn (tháng)</label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        min="1"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.duration ? 'border-red-500' : ''}`}
                      />
                      {formErrors.duration && <p className="mt-1 text-sm text-red-600">{formErrors.duration}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.price ? 'border-red-500' : ''}`}
                      />
                      {formErrors.price && <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>}
                    </div>
                  </div>
                  
                  {/* Tính năng */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tính năng</label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                          placeholder={`Tính năng ${index + 1}`}
                        />
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="ml-2 p-2 text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      <FiPlus className="w-4 h-4 mr-1" /> Thêm tính năng
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : 'Thêm gói tập'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseAddModal}
                    disabled={isSubmitting}
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Modal */}
      {editModal.isOpen && (        <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay">          <div className="flex items-center justify-center min-h-screen p-4 text-center">            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => !isSubmitting && handleCloseEditModal()}></div>                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg modal-container">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Chỉnh sửa gói tập</h3>
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Tên gói */}
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Tên gói</label>
                    <input
                      type="text"
                      id="edit-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Ví dụ: Basic, Standard, Premium..."
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                  </div>
                  
                  {/* Mô tả */}
                  <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <textarea
                      id="edit-description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.description ? 'border-red-500' : ''}`}
                      placeholder="Mô tả ngắn về gói tập..."
                    />
                    {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
                  </div>
                  
                  {/* Thời hạn và giá */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-duration" className="block text-sm font-medium text-gray-700">Thời hạn (tháng)</label>
                      <input
                        type="number"
                        id="edit-duration"
                        name="duration"
                        min="1"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.duration ? 'border-red-500' : ''}`}
                      />
                      {formErrors.duration && <p className="mt-1 text-sm text-red-600">{formErrors.duration}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                      <input
                        type="number"
                        id="edit-price"
                        name="price"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 ${formErrors.price ? 'border-red-500' : ''}`}
                      />
                      {formErrors.price && <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>}
                    </div>
                  </div>
                  
                  {/* Tính năng */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tính năng</label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                          placeholder={`Tính năng ${index + 1}`}
                        />
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="ml-2 p-2 text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      <FiPlus className="w-4 h-4 mr-1" /> Thêm tính năng
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : 'Lưu thay đổi'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    disabled={isSubmitting}
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirm Modal */}
      {deleteModal.isOpen && (        <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay">          <div className="flex items-center justify-center min-h-screen p-4 text-center">            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleCloseDeleteConfirm}></div>                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg modal-container">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <FiTrash2 className="w-6 h-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Xóa gói tập</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Bạn có chắc chắn muốn xóa gói tập này? 
                      Thao tác này không thể hoàn tác và có thể ảnh hưởng đến các thành viên đã đăng ký gói này.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteMembership}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Xóa
                </button>
                <button
                  type="button"
                  onClick={handleCloseDeleteConfirm}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Payment Modal */}
      {showPaymentConfirm && (        <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay">          <div className="flex items-center justify-center min-h-screen p-4 text-center">            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => !paymentProcessing && setShowPaymentConfirm(false)}></div>                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg modal-container">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <FiCheck className="w-6 h-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Xác nhận thanh toán</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Bạn có chắc chắn muốn xác nhận thanh toán cho đơn đăng ký này? 
                      Sau khi xác nhận, gói tập sẽ được kích hoạt cho thành viên.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={paymentProcessing}
                  onClick={handleConfirmPayment}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {paymentProcessing ? (
                    <>
                      <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    'Xác nhận'
                  )}
                </button>
                <button
                  type="button"
                  disabled={paymentProcessing}
                  onClick={() => setShowPaymentConfirm(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Subscription Modal */}
      {showCancelSubscription && (        <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay">          <div className="flex items-center justify-center min-h-screen p-4 text-center">            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => !paymentProcessing && setShowCancelSubscription(false)}></div>                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg modal-container">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <FiX className="w-6 h-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Hủy đơn đăng ký</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Bạn có chắc chắn muốn hủy đơn đăng ký này? 
                      Thao tác này không thể hoàn tác.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={paymentProcessing}
                  onClick={handleCancelSubscription}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {paymentProcessing ? (
                    <>
                      <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : (
                    'Hủy đơn'
                  )}
                </button>
                <button
                  type="button"
                  disabled={paymentProcessing}
                  onClick={() => setShowCancelSubscription(false)}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Cancellation Request Modal */}
      {isProcessModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay">
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => !isApproving && !isRejecting && closeProcessModal()}></div>
            
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg modal-container">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={closeProcessModal}
                  disabled={isApproving || isRejecting}
                >
                  <span className="sr-only">Đóng</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {selectedRequest.status === 'pending' ? 'Xử lý yêu cầu hủy gói tập' : 'Chi tiết yêu cầu hủy gói tập'}
                    </h3>
                    
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Hội viên</dt>
                        <dd className="mt-1 text-sm text-gray-900">{selectedRequest.member?.name || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Gói tập</dt>
                        <dd className="mt-1 text-sm text-gray-900">{selectedRequest.subscription?.membership?.name || 'N/A'}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Ngày yêu cầu</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(selectedRequest.requestDate)}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Trạng thái</dt>
                        <dd className="mt-1">{getStatusDisplay(selectedRequest.status)}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Lý do</dt>
                        <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selectedRequest.reason || 'Không có lý do'}</dd>
                      </div>
                      
                      {selectedRequest.status !== 'pending' && (
                        <>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Ghi chú của quản trị viên</dt>
                            <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selectedRequest.adminNote || 'Không có ghi chú'}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Ngày xử lý</dt>
                            <dd className="mt-1 text-sm text-gray-900">{selectedRequest.processedDate ? formatDate(selectedRequest.processedDate) : 'N/A'}</dd>
                          </div>
                        </>
                      )}
                      
                      {selectedRequest.status === 'pending' && (
                        <>
                          <div className="sm:col-span-2">
                            <label htmlFor="admin-note" className="block text-sm font-medium text-gray-700">
                              Ghi chú (nếu có)
                            </label>
                            <textarea
                              id="admin-note"
                              name="admin-note"
                              rows={3}
                              value={processingNote}
                              onChange={(e) => setProcessingNote(e.target.value)}
                              className="mt-1 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Thêm ghi chú cho quyết định của bạn..."
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="refund-amount" className="block text-sm font-medium text-gray-700">
                              Số tiền hoàn lại (VND)
                            </label>
                            <input
                              type="number"
                              id="refund-amount"
                              name="refund-amount"
                              min="0"
                              max={selectedRequest.subscription?.membership?.price || 0}
                              value={refundAmount}
                              onChange={(e) => setRefundAmount(e.target.value)}
                              className="mt-1 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder={`Tối đa: ${(selectedRequest.subscription?.membership?.price || 0).toLocaleString('vi-VN')} VND`}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                              Giá gói: {(selectedRequest.subscription?.membership?.price || 0).toLocaleString('vi-VN')} VND
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedRequest.status === 'pending' ? (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleApprove}
                      disabled={isApproving || isRejecting}
                    >
                      {isApproving ? 'Đang xử lý...' : 'Duyệt yêu cầu'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleReject}
                      disabled={isApproving || isRejecting}
                    >
                      {isRejecting ? 'Đang xử lý...' : 'Từ chối'}
                    </button>
                  </>
                ) : null}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeProcessModal}
                  disabled={isApproving || isRejecting}
                >
                  {selectedRequest.status === 'pending' ? 'Hủy' : 'Đóng'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 