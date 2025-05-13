'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { subscriptionAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCalendar, FiArrowLeft, FiFilter, FiCheck, FiClock, FiInfo, FiAlertCircle, FiDollarSign, FiChevronRight } from 'react-icons/fi';

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

export default function MemberSubscriptions() {
  const { auth } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

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
        
        // Try to get data from localStorage first
        const savedSubscriptions = localStorage.getItem('memberSubscriptions');
        if (savedSubscriptions) {
          setSubscriptions(JSON.parse(savedSubscriptions));
          setLoading(false);
          return;
        }

        // Fake data for development
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
        localStorage.setItem('memberSubscriptions', JSON.stringify(sampleSubscriptions));
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to load subscription records. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [auth.isAuthenticated, auth.user, router]);

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
    router.push('/membership');
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
      return 'Expired';
    }
    
    if (subscription.paymentStatus === 'pending') {
      return 'Payment Pending';
    }
    
    const daysRemaining = getDaysRemaining(subscription.endDate);
    
    if (daysRemaining <= 0) {
      return 'Expired Today';
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
                Back to Dashboard
              </motion.button>
              <h1 className="text-2xl font-bold text-white">My Subscriptions</h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBrowseMemberships}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
            >
              <FiCreditCard className="w-5 h-5 mr-2" />
              Browse Memberships
            </motion.button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Loading your subscriptions...</p>
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
              Try Again
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
                      <p className="text-sm opacity-80">Total Subscriptions</p>
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
                      <p className="text-sm opacity-80">Active Subscriptions</p>
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
                      <p className="text-sm opacity-80">Expired Subscriptions</p>
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
                <span className="text-sm text-gray-600 mr-3">Filter:</span>
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
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'active' 
                      ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'pending' 
                      ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Payment Pending
                </button>
                <button
                  onClick={() => setStatusFilter('expired')}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusFilter === 'expired' 
                      ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Expired
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
                <h3 className="mt-4 text-lg font-medium text-gray-900">No subscriptions found</h3>
                <p className="mt-1 text-gray-500">Try changing your filters or browse available memberships</p>
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBrowseMemberships}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Browse Membership Plans <FiChevronRight className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredSubscriptions.map((subscription, index) => {
                  const status = formatStatus(subscription);
                  const statusColor = getStatusColor(status);
                  const daysRemaining = getDaysRemaining(subscription.endDate);
                  
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
                        
                        {!subscription.active && (
                          <div className="mt-6">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleBrowseMemberships}
                              className="w-full inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                            >
                              Renew Subscription <FiChevronRight className="ml-1" />
                            </motion.button>
                          </div>
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
      </main>
    </div>
  );
} 