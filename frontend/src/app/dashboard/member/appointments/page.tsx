'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { appointmentAPI, userAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowLeft, FiFilter, FiSearch, FiPlus, FiTrash2, FiCheck, FiX, FiAlertCircle, FiInfo, FiUser } from 'react-icons/fi';

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
  trainer?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
}

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

export default function MemberAppointments() {
  const { auth } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  // State for appointment form
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    trainerId: '',
    title: '',
    description: '',
    appointmentDate: '',
    duration: 60,
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch appointments data
  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (auth.user && auth.user.role !== 'member') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        if (!auth.user?.id) {
          setError('Thông tin người dùng không có sẵn');
          setLoading(false);
          return;
        }
        
        // Fetch appointments from API
        const response = await appointmentAPI.getMemberAppointments(auth.user.id);
        if (response.status === 'success' && response.data?.appointments) {
          const appointmentData = response.data.appointments as unknown as Appointment[];
          setAppointments(appointmentData);
        } else {
          setError('Không thể tải dữ liệu lịch hẹn. Vui lòng thử lại sau.');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Không thể tải lịch sử lịch hẹn. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    const fetchTrainers = async () => {
      try {
        const response = await userAPI.getAllTrainers();
        if (response.status === 'success' && response.data?.trainers) {
          // Use type assertion to handle the array properly
          const trainersArray = Array.isArray(response.data.trainers) 
            ? response.data.trainers 
            : [];
            
          const trainersData = trainersArray.map((trainer: any) => ({
            id: trainer.id,
            name: trainer.name,
            email: trainer.email,
            phone: trainer.phone || '',
            profileImage: trainer.profileImage
          }));
          setTrainers(trainersData);
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
      }
    };

    fetchAppointments();
    fetchTrainers();
  }, [auth.isAuthenticated, auth.user, router]);

  const handleBack = () => {
    router.push('/dashboard/member');
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
    
    // Filter by search term
    if (searchTerm && 
        !appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !appointment.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Form handling
  const openAppointmentForm = () => {
    // Check if trainers exist
    if (trainers.length === 0) {
      alert('Không có huấn luyện viên nào. Vui lòng thử lại sau.');
      return;
    }
    
    // Tạo thời gian mặc định là hiện tại + 1 tiếng (múi giờ địa phương)
    const now = new Date();
    const defaultTime = new Date(now.getTime() + 60 * 60 * 1000); // Thêm 1 tiếng
    
    // Chuyển đổi sang thời gian địa phương cho datetime-local input
    const year = defaultTime.getFullYear();
    const month = String(defaultTime.getMonth() + 1).padStart(2, '0');
    const day = String(defaultTime.getDate()).padStart(2, '0');
    const hours = String(defaultTime.getHours()).padStart(2, '0');
    const minutes = String(defaultTime.getMinutes()).padStart(2, '0');
    
    const defaultDateTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    setFormData({
      trainerId: trainers.length > 0 ? trainers[0].id : '',
      title: '',
      description: '',
      appointmentDate: defaultDateTimeString,
      duration: 60,
      notes: ''
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFormModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.trainerId) {
      errors.trainerId = 'Vui lòng chọn huấn luyện viên';
    }
    
    if (!formData.title) {
      errors.title = 'Vui lòng nhập tiêu đề cho lịch hẹn';
    }
    
    if (!formData.appointmentDate) {
      errors.appointmentDate = 'Vui lòng chọn ngày và giờ';
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const now = new Date();
      if (selectedDate <= now) {
        errors.appointmentDate = 'Ngày hẹn phải là trong tương lai';
      }
    }
    
    if (!formData.duration || formData.duration < 15) {
      errors.duration = 'Thời gian phải ít nhất 15 phút';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!auth.user?.id) {
        throw new Error('Thông tin người dùng không có sẵn');
      }
      
      const response = await appointmentAPI.createAppointment({
        memberId: auth.user.id,
        trainerId: formData.trainerId,
        title: formData.title,
        description: formData.description,
        appointmentDate: formData.appointmentDate,
        duration: parseInt(formData.duration.toString(), 10),
        notes: formData.notes
      });
      
      if (response.status === 'success' && response.data?.appointment) {
        const newAppointment = response.data.appointment as unknown as Appointment;
        setAppointments(prev => [...prev, newAppointment]);
        alert('Yêu cầu lịch hẹn thành công!');
        closeFormModal();
      } else {
        alert('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
              alert('Lỗi khi tạo lịch hẹn. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?')) {
      try {
        const response = await appointmentAPI.updateAppointmentStatus(id, {
          status: 'cancelled',
          notes: 'Hủy bởi thành viên'
        });
        
        if (response.status === 'success') {
          // Update the appointment in the state
          setAppointments(prev => 
            prev.map(appointment => 
              appointment.id === id 
                ? { ...appointment, status: 'cancelled' } 
                : appointment
            )
          );
          alert('Hủy lịch hẹn thành công!');
        }
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        alert('Lỗi khi hủy lịch hẹn. Vui lòng thử lại sau.');
      }
    }
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
              <h1 className="text-2xl font-bold text-white">Lịch hẹn với huấn luyện viên</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAppointmentForm}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 bg-opacity-80 rounded-lg hover:bg-opacity-100 focus:outline-none transition-all duration-200"
            >
              <FiPlus className="w-5 h-5 mr-2" />
                              Đặt lịch hẹn mới
              </motion.button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
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
              className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors duration-200"
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
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <input
                  type="date"
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
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
                  <option value="pending">Chờ xử lý</option>
                  <option value="accepted">Đã chấp nhận</option>
                  <option value="rejected">Đã từ chối</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>

            {/* Appointment List */}
            {filteredAppointments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                  <FiCalendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy lịch hẹn nào</h3>
                <p className="mt-1 text-gray-500">Hãy thử thay đổi bộ lọc hoặc đặt lịch hẹn mới</p>
                <button
                  onClick={openAppointmentForm}
                  className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
                >
                  <FiPlus className="w-5 h-5 mr-2" />
                                      Đặt lịch hẹn mới
                  </button>
              </motion.div>
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
                            <h3 className="text-lg font-medium text-gray-900 mt-1">
                              {appointment.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(appointment.appointmentDate)} at {formatTime(appointment.appointmentDate)}
                              {appointment.trainer && ` • Trainer: ${appointment.trainer.name}`}
                              {` • Thời gian: ${formatDuration(appointment.duration)}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <FiX className="w-4 h-4 mr-1" />
                              Hủy
                            </button>
                          )}
                        </div>
                      </div>

                      {appointment.description && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500">Mô tả:</p>
                          <p className="text-gray-700">{appointment.description}</p>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500">Ghi chú:</p>
                          <p className="text-gray-700">{appointment.notes}</p>
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

      {/* Schedule Appointment Modal */}
      {isFormModalOpen && (
        <div className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={closeFormModal}
            ></div>
            
            {/* Centering trick */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Panel */}
            <div 
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-[10000] ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDuration: '200ms' }}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Đặt lịch hẹn mới
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
                    {/* Trainer selection */}
                    <div>
                      <label htmlFor="trainerId" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiUser className="mr-1 text-gray-600" /> Chọn huấn luyện viên
                      </label>
                      <select
                        id="trainerId"
                        name="trainerId"
                        value={formData.trainerId}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.trainerId ? 'border-red-500' : ''}`}
                      >
                        <option value="">Chọn huấn luyện viên</option>
                        {trainers.map(trainer => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name} ({trainer.email})
                          </option>
                        ))}
                      </select>
                      {formErrors.trainerId && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.trainerId}</p>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Tiêu đề
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.title ? 'border-red-500' : ''}`}
                        placeholder="e.g., Personal Training Session"
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Mô tả
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                        placeholder="Describe what you'd like to achieve in this session..."
                      />
                    </div>

                    {/* Appointment Date */}
                    <div>
                      <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiCalendar className="mr-1 text-gray-600" /> Ngày và giờ hẹn
                      </label>
                      <input
                        type="datetime-local"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.appointmentDate ? 'border-red-500' : ''}`}
                      />
                      {formErrors.appointmentDate && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.appointmentDate}</p>
                      )}
                    </div>

                    {/* Duration */}
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiClock className="mr-1 text-gray-600" /> Thời gian (phút)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        min="15"
                        step="15"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.duration ? 'border-red-500' : ''}`}
                      />
                      {formErrors.duration && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.duration}</p>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú thêm
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                        placeholder="Any additional information for the trainer..."
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
                        Processing...
                      </>
                    ) : 'Yêu cầu lịch hẹn'}
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