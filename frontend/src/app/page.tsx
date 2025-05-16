'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiClock, FiClipboard, FiCalendar, FiTrendingUp, FiLogOut, FiBarChart2, FiArrowRight, FiActivity } from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';

export default function Home() {
  const { auth, logout } = useAuth();

  // Biến thể hoạt ảnh
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Đầu trang/Điều hướng */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 blur group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white rounded-full p-2">
            <GiWeightLiftingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">QUẢN LÝ PHÒNG TẬP</h1>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-800 hover:text-indigo-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link 
                  href="/membership" 
                  className="text-gray-800 hover:text-indigo-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300"
                >
                  Gói tập
                </Link>
              </li>
              {auth.isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href={
                        auth.user?.role === 'admin'
                          ? '/dashboard/admin'
                          : auth.user?.role === 'trainer'
                          ? '/dashboard/trainer'
                          : '/dashboard/member'
                      }
                      className="text-gray-800 hover:text-indigo-600 font-medium flex items-center transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300"
                    >
                      <FiBarChart2 className="mr-2" /> Bảng điều khiển
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-gray-800 hover:text-indigo-600 font-medium flex items-center transition-colors duration-200 group"
                    >
                      <FiLogOut className="mr-2 group-hover:rotate-90 transition-transform duration-300" /> Đăng xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      href="/auth/login" 
                      className="text-gray-800 font-medium hover:text-indigo-600 transition-all px-4 py-2 rounded-lg hover:bg-indigo-50"
                    >
                      Đăng nhập
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/register"
                      className="gradient-bg text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Đăng ký
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          {/* Nút Menu cho Thiết bị Di động */}
          <button className="md:hidden relative p-2 rounded-full text-indigo-600 hover:bg-indigo-50 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Phần Giới thiệu */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Nền gradient hiện đại */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-800"></div>
        
        {/* Nền hiệu ứng hạt/lưới hoạt ảnh */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Lớp phủ lưới */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="lg:w-1/2 mb-12 lg:mb-0 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="inline-block px-4 py-1 bg-indigo-500 bg-opacity-20 border border-indigo-300 border-opacity-30 rounded-full text-indigo-100 text-sm font-medium mb-6">
                  Nền tảng quản lý hàng đầu cho phòng gym
                </span>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight tracking-tight">
                  Quản lý phòng gym
                  <div className="inline-block relative mx-3 my-2">
                    <span className="relative z-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-indigo-200 to-purple-100">hiệu quả</span>
                    <div className="absolute -bottom-2 left-0 w-full h-3 bg-indigo-400 opacity-30 rounded-full"></div>
                  </div>
                  với Gym Management System
                </h1>
                
                <p className="text-lg lg:text-xl mb-8 text-indigo-100 leading-relaxed">
                  Hệ thống quản lý phòng gym toàn diện giúp bạn quản lý thành viên, gói tập, lịch tập và nhiều tính năng
                  khác một cách dễ dàng và chuyên nghiệp.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
                    <Link
                      href="/auth/register"
                      className="relative bg-white text-indigo-900 font-semibold px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 flex items-center justify-center min-w-[160px]"
                    >
                      Đăng ký ngay <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-70 blur-sm transition duration-300"></div>
                    <Link
                      href="/membership"
                      className="relative bg-transparent border-2 border-indigo-300 border-opacity-50 text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center min-w-[160px]"
                    >
                      Xem gói tập <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                </div>
                
                {/* Chỉ số tin cậy */}
                <div className="flex items-center space-x-6 text-indigo-200">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 border-2 border-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-900">
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 text-sm">Được tin dùng bởi 500+ phòng tập</span>
                  </div>
                  <div className="h-6 w-px bg-indigo-400 bg-opacity-30"></div>
                  <div className="flex items-center">
                    <span className="text-sm">Đã xử lý 10,000+ lượt đăng ký</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <div className="relative">
                  {/* Mô phỏng bảng điều khiển nổi hiện đại */}
                  <div className="w-full max-w-md mx-auto">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-950 to-gray-900 p-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
                      
                      {/* Thanh trên kiểu trình duyệt */}
                      <div className="bg-gray-800 rounded-t-xl px-4 py-2 flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded-md text-xs text-gray-400 py-0.5 px-3 text-center">
                          Bảng điều khiển - Quản lý Phòng tập
                        </div>
                      </div>
                      
                      <div className="rounded-b-xl overflow-hidden">
                        <div className="p-5 bg-gray-900 text-white">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Bảng điều khiển</h3>
                            <div className="bg-indigo-600 bg-opacity-30 text-indigo-300 text-xs px-3 py-1 rounded-full">
                              Quản trị viên
                            </div>
                          </div>
                          
                          {/* Các mục xem trước bảng điều khiển */}
                          <div className="space-y-4 mb-6">
                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl border border-gray-700">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="text-sm font-medium text-gray-300">Tổng quan hệ thống</h4>
                                <span className="text-xs text-indigo-400">Hôm nay</span>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-lg border border-indigo-700">
                                  <div className="text-xs text-indigo-300 mb-1 font-medium">THÀNH VIÊN</div>
                                  <div className="text-xl font-bold text-white">521</div>
                                  <div className="text-xs text-green-400 mt-1 flex items-center">
                                    <span>+12.3%</span>
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg border border-purple-700">
                                  <div className="text-xs text-purple-300 mb-1 font-medium">GÓI TẬP</div>
                                  <div className="text-xl font-bold text-white">17</div>
                                  <div className="text-xs text-purple-300 mt-1">Đang hoạt động</div>
                                </div>
                                
                                <div className="p-3 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg border border-blue-700">
                                  <div className="text-xs text-blue-300 mb-1 font-medium">DOANH THU</div>
                                  <div className="text-xl font-bold text-white">128tr</div>
                                  <div className="text-xs text-green-400 mt-1 flex items-center">
                                    <span>+8.7%</span>
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl border border-gray-700">
                              <h4 className="text-sm font-medium text-gray-300 mb-3">Lịch trình hôm nay</h4>
                              <div className="space-y-2">
                                <div className="flex items-center p-2 rounded-lg bg-indigo-900 bg-opacity-30 border border-indigo-800">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                  <div className="text-xs text-indigo-200 mr-3">08:00</div>
                                  <div className="text-xs text-white">Yoga Morning - 12 người</div>
                                </div>
                                <div className="flex items-center p-2 rounded-lg bg-purple-900 bg-opacity-30 border border-purple-800">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                  <div className="text-xs text-purple-200 mr-3">10:30</div>
                                  <div className="text-xs text-white">Cardio Burn - 8 người</div>
                                </div>
                              </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400 bg-opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 bg-opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute -top-96 -right-96 w-[500px] h-[500px] rounded-full bg-indigo-100 bg-opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-96 -left-96 w-[500px] h-[500px] rounded-full bg-purple-100 bg-opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-5 py-2 text-sm font-medium mb-6 shadow-sm">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 mr-2">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Được phát triển với công nghệ hiện đại</span>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 relative">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Tính năng nổi bật</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-2 bg-indigo-100 rounded-full"></div>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8">
              Hệ thống quản lý phòng gym của chúng tôi cung cấp đầy đủ các tính năng cần thiết để vận hành 
              phòng tập một cách chuyên nghiệp và hiệu quả.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white rounded-2xl z-10"></div>
              
              <div className="relative z-20">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiUser className="h-8 w-8 text-white" />
              </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors">Quản lý thành viên</h3>
                
                <p className="text-gray-600 mb-5 leading-relaxed">
                Quản lý hồ sơ thành viên, lịch sử đăng ký gói tập và theo dõi tiến trình. Hỗ trợ thông báo gia hạn và trạng thái thành viên.
              </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Hồ sơ chi tiết và đầy đủ</span>
                </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Quản lý thanh toán tự động</span>
                </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Thẻ thành viên thông minh</span>
                </li>
              </ul>
                
                <Link 
                  href="/dashboard/members" 
                  className="text-indigo-600 font-medium flex items-center group-hover:text-indigo-700 group-hover:font-semibold transition-all"
                >
                  Xem chi tiết 
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white rounded-2xl z-10"></div>
              
              <div className="relative z-20">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiClipboard className="h-8 w-8 text-white" />
              </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">Quản lý gói tập</h3>
                
                <p className="text-gray-600 mb-5 leading-relaxed">
                Tạo và quản lý các gói tập với thời hạn, giá và tính năng khác nhau. Hỗ trợ các gói trả trước, ưu đãi và khuyến mãi.
              </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Gói tập tùy chỉnh linh hoạt</span>
                </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Quản lý khuyến mãi tự động</span>
                </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Báo cáo doanh thu chi tiết</span>
                </li>
              </ul>
                
                <Link 
                  href="/dashboard/membership" 
                  className="text-purple-600 font-medium flex items-center group-hover:text-purple-700 group-hover:font-semibold transition-all"
                >
                  Xem chi tiết 
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white rounded-2xl z-10"></div>
              
              <div className="relative z-20">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiCalendar className="h-8 w-8 text-white" />
              </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">Hệ thống điểm danh</h3>
                
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Điểm danh khi thành viên check-in, check-out và theo dõi thời gian tập luyện. Thống kê và báo cáo hoạt động chi tiết.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Check-in/out bằng thẻ NFC</span>
                </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Thống kê thời gian tập trực quan</span>
                </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Báo cáo hoạt động theo thời gian</span>
                </li>
              </ul>
                
                <Link 
                  href="/dashboard/attendance" 
                  className="text-blue-600 font-medium flex items-center group-hover:text-blue-700 group-hover:font-semibold transition-all"
                >
                  Xem chi tiết 
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Feature 4 - Quản lý thiết bị */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white rounded-2xl z-10"></div>
              
              <div className="relative z-20">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors">Quản lý thiết bị</h3>
                
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Theo dõi tình trạng, lịch bảo trì và thống kê sử dụng của từng thiết bị trong phòng gym. Tối ưu hóa hiệu suất và tuổi thọ thiết bị.
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Quản lý danh mục thiết bị</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Lịch bảo trì tự động</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Thống kê mức độ sử dụng</span>
                  </li>
                </ul>
                
                <Link 
                  href="/dashboard/equipment" 
                  className="text-green-600 font-medium flex items-center group-hover:text-green-700 group-hover:font-semibold transition-all"
                >
                  Xem chi tiết 
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* View all features button */}
          <div className="flex justify-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/features" 
                className="relative px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium inline-flex items-center transition-all hover:shadow-lg overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10"></span>
                <span className="relative flex items-center">
                  Xem tất cả tính năng
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full mix-blend-overlay opacity-10 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-1/3 w-40 h-40 bg-white rounded-full mix-blend-overlay opacity-10 animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Mesh pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <div className="inline-flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white font-medium mb-6 border border-white border-opacity-20">
                <span className="flex h-2 w-2 bg-white rounded-full mr-2 animate-ping"></span>
                Bắt đầu miễn phí, nâng cấp bất cứ khi nào
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Nâng tầm phòng tập của bạn với <span className="relative inline-block">
                  <span className="relative z-10">GYM Management</span>
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-indigo-400 opacity-30 rounded"></span>
                </span>
              </h2>
              
              <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Đăng ký ngay hôm nay và trải nghiệm hệ thống quản lý phòng gym hiện đại, 
                toàn diện nhất. Chúng tôi cam kết mang đến giải pháp tối ưu cho phòng tập của bạn.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <Link
                href="/auth/register"
                    className="relative bg-white text-indigo-700 font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 inline-flex items-center"
                  >
                    Bắt đầu ngay <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#contact"
                    className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 inline-flex items-center"
                  >
                    Liên hệ với chúng tôi
              </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
        {/* Footer decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-900 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-900 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-6 group">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GiWeightLiftingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">GYM MANAGEMENT</h3>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">Hệ thống quản lý phòng gym toàn diện giúp bạn quản lý mọi hoạt động một cách hiệu quả và chuyên nghiệp.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-5 text-white">Liên kết nhanh</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/membership" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Gói tập
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Đăng ký
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-5 text-white">Giải pháp</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Cho phòng tập nhỏ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Cho chuỗi phòng tập
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Cho trung tâm thể thao
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Các tính năng độc quyền
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-5 text-white">Liên hệ</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center mr-3 mt-1">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-indigo-300 text-sm font-medium mb-1">Email</h5>
                    <p className="text-gray-400">support@gymmanagement.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center mr-3 mt-1">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-indigo-300 text-sm font-medium mb-1">Điện thoại</h5>
                    <p className="text-gray-400">(+84) 123 456 789</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center mr-3 mt-1">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
            <div>
                    <h5 className="text-indigo-300 text-sm font-medium mb-1">Địa chỉ</h5>
                    <p className="text-gray-400">123 Đường Lê Lợi, Quận 1, TP.HCM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Gym Management System. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 hover:text-indigo-400 transition-colors">Điều khoản sử dụng</Link>
              <Link href="#" className="text-gray-500 hover:text-indigo-400 transition-colors">Chính sách bảo mật</Link>
              <Link href="#" className="text-gray-500 hover:text-indigo-400 transition-colors">Trợ giúp</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
