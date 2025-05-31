'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cancellationAPI, subscriptionAPI, userAPI } from '@/services/api';
import { FiSearch, FiFilter, FiArrowLeft, FiCheck, FiX, FiInfo, FiCalendar, FiUser, FiPackage } from 'react-icons/fi';

interface CancellationRequest {
  id: string;
  subscriptionId: string;
  memberId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  adminNote?: string;
  processedById?: string;
  processedDate?: string;
  createdAt: string;
  updatedAt: string;
  member?: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
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

export default function CancellationManagement() {
  const { auth } = useAuth();
  const router = useRouter();
  const [cancellationRequests, setCancellationRequests] = useState<CancellationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<CancellationRequest | null>(null);
  const [processingNote, setProcessingNote] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    // Check if user exists and has an ID before fetching data
    if (auth.user && auth.user.id) {
      // Verify role
      if (auth.user.role !== 'admin') {
        router.push(`/dashboard/${auth.user.role}`);
        return;
      }
      
      fetchCancellationRequests();
    }
  }, [auth.user, router]);

  const fetchCancellationRequests = async () => {
    try {
      setLoading(true);
      const response = await cancellationAPI.getAllCancellationRequests();
      
      // Process the response
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
                // Use type assertion to avoid TS errors
                const userData = memberResponse.data.user as any;
                enhancedRequest.member = {
                  name: userData.name || 'Unknown',
                  email: userData.email || 'N/A',
                  phone: userData.phone,
                  avatar: userData.avatar,
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
        
        setCancellationRequests(enhancedRequests);
      } else {
        setError('Failed to fetch cancellation requests');
      }
    } catch (error) {
      console.error('Error fetching cancellation requests:', error);
      setError('An error occurred while fetching cancellation requests');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/admin');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleProcessClick = (request: CancellationRequest) => {
    setSelectedRequest(request);
    setProcessingNote('');
    setIsProcessModalOpen(true);
  };

  const closeProcessModal = () => {
    setIsProcessModalOpen(false);
    setSelectedRequest(null);
    setProcessingNote('');
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;
    
    try {
      setIsApproving(true);
      
      const processingData = {
        status: 'approved',
        adminNote: processingNote,
        processedById: auth.user?.id
      };
      
      const response = await cancellationAPI.processCancellationRequest(selectedRequest.id, processingData);
      
      if (response.status === 'success') {
        // Update the local state
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
        setError('Failed to approve cancellation request');
      }
    } catch (error) {
      console.error('Error approving cancellation request:', error);
      setError('An error occurred while approving the cancellation request');
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
        // Update the local state
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
        setError('Failed to reject cancellation request');
      }
    } catch (error) {
      console.error('Error rejecting cancellation request:', error);
      setError('An error occurred while rejecting the cancellation request');
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

  // Filter cancellation requests
  const filteredRequests = cancellationRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      (request.member?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.member?.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.subscription?.membership?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.reason?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Yêu Cầu Hủy Gói Tập</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiX className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
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

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-3 text-sm text-gray-500">Đang tải dữ liệu...</p>
              </div>
            ) : filteredRequests.length > 0 ? (
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={request.member?.avatar || '/images/default-avatar.png'}
                              alt={request.member?.name || 'Member Avatar'}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{request.member?.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{request.member?.email || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.subscription?.membership?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">
                          {request.subscription?.startDate && request.subscription?.endDate ? 
                            `${new Date(request.subscription.startDate).toLocaleDateString('vi-VN')} - ${new Date(request.subscription.endDate).toLocaleDateString('vi-VN')}` : 
                            'N/A'
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.requestDate)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {request.reason || 'Không có lý do'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusDisplay(request.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
            )}
          </div>
        </div>
      </div>

      {/* Process Modal */}
      {isProcessModalOpen && selectedRequest && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={closeProcessModal}
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