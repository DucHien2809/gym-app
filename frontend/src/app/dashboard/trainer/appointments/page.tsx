'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { appointmentAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowLeft, FiFilter, FiSearch, FiCheck, FiX, FiInfo, FiUser, FiMessageSquare } from 'react-icons/fi';

interface Appointment {
  id: string;
  memberId: string;
  trainerId: string;
  title: string;
  description?: string;
  appointmentDate: string;
  duration: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  member?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
}

export default function TrainerAppointments() {
  const { auth } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // State for response modal
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [responseNotes, setResponseNotes] = useState('');
  const [responseAction, setResponseAction] = useState<'accept' | 'reject' | null>(null);

  // Fetch appointments data
  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (auth.user && auth.user.role !== 'trainer') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        if (!auth.user?.id) {
          setError('User information not available');
          setLoading(false);
          return;
        }
        
        // Fetch appointments from API
        const response = await appointmentAPI.getTrainerAppointments(auth.user.id);
        if (response.status === 'success' && response.data?.appointments) {
          const appointmentData = response.data.appointments as unknown as Appointment[];
          setAppointments(appointmentData);
        } else {
          setError('Could not fetch appointment data. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointment records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [auth.isAuthenticated, auth.user, router]);

  const handleBack = () => {
    router.push('/dashboard/trainer');
  };

  // Format functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by status
    if (statusFilter !== 'all' && appointment.status !== statusFilter) {
      return false;
    }
    
    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const appointmentDate = new Date(appointment.appointmentDate);
      if (
        filterDate.getDate() !== appointmentDate.getDate() ||
        filterDate.getMonth() !== appointmentDate.getMonth() ||
        filterDate.getFullYear() !== appointmentDate.getFullYear()
      ) {
        return false;
      }
    }
    
    // Filter by search term (member name or title)
    if (searchTerm && 
        !appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !appointment.member?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Response modal
  const openResponseModal = (appointment: Appointment, action: 'accept' | 'reject') => {
    setSelectedAppointment(appointment);
    setResponseAction(action);
    setResponseNotes('');
    setIsResponseModalOpen(true);
  };

  const closeResponseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsResponseModalOpen(false);
      setIsClosing(false);
      setSelectedAppointment(null);
      setResponseAction(null);
    }, 200);
  };

  const handleResponseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAppointment || !responseAction) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert 'accept' action to 'accepted' status and 'reject' action to 'rejected' status
      const statusValue = responseAction === 'accept' ? 'accepted' : 'rejected';
      
      const response = await appointmentAPI.updateAppointmentStatus(selectedAppointment.id, {
        status: statusValue,
        notes: responseNotes || `Appointment ${responseAction === 'accept' ? 'accepted' : 'rejected'} by trainer`
      });
      
      if (response.status === 'success' && response.data?.appointment) {
        // Update the appointment in the state
        const updatedAppointmentData = response.data.appointment as unknown;
        const updatedAppointment = updatedAppointmentData as Appointment;
        
        setAppointments(prev => 
          prev.map(appointment => 
            appointment.id === selectedAppointment.id 
              ? { ...appointment, status: statusValue, notes: responseNotes || appointment.notes }
              : appointment
          )
        );
        
        alert(`Appointment ${responseAction === 'accept' ? 'accepted' : 'rejected'} successfully!`);
        closeResponseModal();
      }
    } catch (error) {
      console.error(`Error ${responseAction}ing appointment:`, error);
      alert(`Error ${responseAction}ing appointment. Please try again later.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkAsCompleted = async (id: string) => {
    if (window.confirm('Are you sure you want to mark this appointment as completed?')) {
      try {
        const response = await appointmentAPI.updateAppointmentStatus(id, {
          status: 'completed',
          notes: 'Marked as completed by trainer'
        });
        
        if (response.status === 'success') {
          // Update the appointment in the state
          setAppointments(prev => 
            prev.map(appointment => 
              appointment.id === id 
                ? { ...appointment, status: 'completed' } 
                : appointment
            )
          );
          alert('Appointment marked as completed!');
        }
      } catch (error) {
        console.error('Error marking appointment as completed:', error);
        alert('Error updating appointment. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Về bảng điều khiển
              </motion.button>
              <h1 className="text-2xl font-bold text-white">Yêu cầu lịch hẹn</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải lịch hẹn...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
              <FiInfo className="h-8 w-8 text-red-600" />
            </div>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div>
            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Tìm kiếm theo tên thành viên hoặc tiêu đề..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <input
                  type="date"
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-400" />
                <select
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="accepted">Đã chấp nhận</option>
                  <option value="rejected">Đã từ chối</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <FiCalendar className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>Tổng cộng</p>
                    <p className="text-xl font-semibold" style={{ color: '#1f2937' }}>{appointments.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <FiClock className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>Pending</p>
                    <p className="text-xl font-semibold" style={{ color: '#1f2937' }}>
                      {appointments.filter(a => a.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <FiCheck className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>Accepted</p>
                    <p className="text-xl font-semibold" style={{ color: '#1f2937' }}>
                      {appointments.filter(a => a.status === 'accepted').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <FiClock className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>Completed</p>
                    <p className="text-xl font-semibold" style={{ color: '#1f2937' }}>
                      {appointments.filter(a => a.status === 'completed').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment List */}
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                  <FiCalendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900" style={{ color: '#1f2937' }}>Không tìm thấy lịch hẹn nào</h3>
                <p className="mt-1 text-gray-500" style={{ color: '#6b7280' }}>Hãy thử thay đổi bộ lọc hoặc kiểm tra lại sau</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg mr-4 ${
                            getStatusColor(appointment.status)
                          }`}>
                            <FiCalendar className="h-6 w-6" />
                          </div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              getStatusBadgeColor(appointment.status)
                            }`}>
                              {capitalizeFirstLetter(appointment.status)}
                            </span>
                            <h3 className="text-lg font-medium text-gray-900 mt-1" style={{ color: '#1f2937' }}>
                              {appointment.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500" style={{ color: '#6b7280' }}>
                              <FiUser className="mr-1" /> 
                              {appointment.member ? appointment.member.name : 'Unknown Member'}
                            </div>
                            <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>
                              {formatDate(appointment.appointmentDate)} at {formatTime(appointment.appointmentDate)}
                              {` • Duration: ${formatDuration(appointment.duration)}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => openResponseModal(appointment, 'accept')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                <FiCheck className="w-4 h-4 mr-1" />
                                Accept
                              </button>
                              <button
                                onClick={() => openResponseModal(appointment, 'reject')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <FiX className="w-4 h-4 mr-1" />
                                Decline
                              </button>
                            </>
                          )}
                          
                          {appointment.status === 'accepted' && (
                            <button
                              onClick={() => handleMarkAsCompleted(appointment.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FiCheck className="w-4 h-4 mr-1" />
                              Mark Completed
                            </button>
                          )}
                        </div>
                      </div>

                      {appointment.description && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>Description:</p>
                          <p className="text-gray-700" style={{ color: '#374151' }}>{appointment.description}</p>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>Notes:</p>
                          <p className="text-gray-700" style={{ color: '#374151' }}>{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Response Modal */}
      {isResponseModalOpen && selectedAppointment && responseAction && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={closeResponseModal}
            ></div>
            
            {/* Centering trick */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Panel */}
            <div 
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDuration: '200ms' }}
            >
              <div className={`px-4 py-3 sm:px-6 flex justify-between items-center ${
                responseAction === 'accept' ? 'bg-gradient-to-r from-green-600 to-teal-600' : 'bg-gradient-to-r from-red-600 to-pink-600'
              }`}>
                <h3 className="text-lg leading-6 font-medium text-white">
                  {responseAction === 'accept' ? 'Accept Appointment' : 'Decline Appointment'}
                </h3>
                <button 
                  onClick={closeResponseModal}
                  className="bg-transparent rounded-full p-1 inline-flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 focus:outline-none"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleResponseSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900" style={{ color: '#1f2937' }}>
                        {selectedAppointment.title}
                      </h4>
                      <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>
                        Member: {selectedAppointment.member?.name}
                      </p>
                      <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>
                        Date: {formatDate(selectedAppointment.appointmentDate)} at {formatTime(selectedAppointment.appointmentDate)}
                      </p>
                      <p className="text-sm text-gray-500" style={{ color: '#6b7280' }}>
                        Duration: {formatDuration(selectedAppointment.duration)}
                      </p>
                    </div>
                    
                    {selectedAppointment.description && (
                      <div className="rounded-md bg-gray-50 p-3">
                        <p className="text-sm text-gray-500 font-medium" style={{ color: '#6b7280' }}>Member's description:</p>
                        <p className="text-sm text-gray-700" style={{ color: '#374151' }}>{selectedAppointment.description}</p>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="responseNotes" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiMessageSquare className="mr-1 text-gray-600" /> Add a note to the member
                      </label>
                      <textarea
                        id="responseNotes"
                        rows={3}
                        value={responseNotes}
                        onChange={(e) => setResponseNotes(e.target.value)}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                        placeholder={`Explain why you are ${responseAction === 'accept' ? 'accepting' : 'declining'} this appointment...`}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                      responseAction === 'accept' 
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                        : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : responseAction === 'accept' ? 'Confirm Accept' : 'Confirm Decline'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeResponseModal}
                    disabled={isSubmitting}
                  >
                    Cancel
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

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'accepted':
      return 'bg-green-100 text-green-600';
    case 'rejected':
      return 'bg-red-100 text-red-600';
    case 'completed':
      return 'bg-blue-100 text-blue-600';
    case 'cancelled':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 