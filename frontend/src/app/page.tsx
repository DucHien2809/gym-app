'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiClock, FiClipboard, FiCalendar, FiTrendingUp, FiLogOut, FiBarChart2, FiArrowRight, FiActivity } from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';

export default function Home() {
  const { auth, logout } = useAuth();

  // Animation variants
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
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <GiWeightLiftingUp className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">GYM MANAGEMENT</h1>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors duration-200">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors duration-200">
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
                      className="text-gray-800 hover:text-indigo-600 font-medium flex items-center transition-colors duration-200"
                    >
                      <FiBarChart2 className="mr-1" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-gray-800 hover:text-indigo-600 font-medium flex items-center transition-colors duration-200"
                    >
                      <FiLogOut className="mr-1" /> Đăng xuất
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/auth/login" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors duration-200">
                      Đăng nhập
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/register"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-md"
                    >
                      Đăng ký
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {/* Mobile Menu Button - would need implementation */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 opacity-95"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 mb-12 lg:mb-0 z-10"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-white leading-tight">
                  Quản lý phòng gym <span className="text-indigo-300">hiệu quả</span> với Gym Management System
                </h1>
                <p className="text-lg lg:text-xl mb-8 text-indigo-100">
                  Hệ thống quản lý phòng gym toàn diện giúp bạn quản lý thành viên, gói tập, lịch tập và nhiều tính năng
                  khác một cách dễ dàng.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/auth/register"
                      className="bg-white text-indigo-900 font-bold px-6 py-3 rounded-lg hover:shadow-xl transition-all duration-200 flex items-center"
                    >
                      Đăng ký ngay <FiArrowRight className="ml-2" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/membership"
                      className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                    >
                      Xem gói tập
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2 z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  {/* Modern floating card design */}
                  <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl mx-auto bg-gradient-to-br from-white to-gray-100 p-1">
                    <div className="rounded-xl overflow-hidden bg-white">
                      <img 
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                        alt="Modern Gym" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Quản lý hiện đại</h3>
                        <p className="text-gray-600">Hệ thống quản lý toàn diện cho phòng gym của bạn, với giao diện đẹp mắt và dễ sử dụng.</p>
                        
                        {/* Stats preview */}
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <div className="bg-indigo-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-indigo-600 font-medium">THÀNH VIÊN</p>
                            <p className="text-lg font-bold text-indigo-700">500+</p>
                          </div>
                          <div className="bg-purple-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-purple-600 font-medium">GÓI TẬP</p>
                            <p className="text-lg font-bold text-purple-700">15+</p>
                          </div>
                          <div className="bg-blue-50 p-2 rounded-lg text-center">
                            <p className="text-xs text-blue-600 font-medium">THIẾT BỊ</p>
                            <p className="text-lg font-bold text-blue-700">100+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 bg-opacity-20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-600 bg-opacity-20 rounded-full blur-xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 inline-block">Tính năng nổi bật</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hệ thống quản lý phòng gym của chúng tôi cung cấp đầy đủ các tính năng cần thiết để vận hành phòng tập hiệu quả.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6 text-white shadow-md">
                <FiUser className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quản lý thành viên</h3>
              <p className="text-gray-600 mb-4">
                Quản lý hồ sơ thành viên, lịch sử đăng ký gói tập và theo dõi tiến trình. Hỗ trợ thông báo gia hạn và trạng thái thành viên.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Hồ sơ chi tiết</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Lịch sử thanh toán</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Quản lý thẻ thành viên</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 text-white shadow-md">
                <FiClipboard className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quản lý gói tập</h3>
              <p className="text-gray-600 mb-4">
                Tạo và quản lý các gói tập với thời hạn, giá và tính năng khác nhau. Hỗ trợ các gói trả trước, ưu đãi và khuyến mãi.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Tùy chỉnh gói linh hoạt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Quản lý giá và khuyến mãi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Báo cáo doanh thu</span>
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 text-white shadow-md">
                <FiCalendar className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hệ thống điểm danh</h3>
              <p className="text-gray-600 mb-4">
                Điểm danh khi thành viên check-in, check-out và theo dõi thời gian tập luyện. Thống kê và báo cáo hoạt động.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Check-in/out tự động</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Thống kê thời gian tập</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700 text-sm">Báo cáo hoạt động</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Bắt đầu quản lý phòng gym của bạn ngay hôm nay</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Đăng ký và trải nghiệm hệ thống quản lý phòng gym hiện đại nhất hiện nay.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/auth/register"
                className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-200 inline-flex items-center"
              >
                Bắt đầu ngay <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <FiBarChart2 className="h-6 w-6 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">GYM MANAGEMENT</h3>
              </Link>
              <p className="text-gray-400">Hệ thống quản lý phòng gym toàn diện giúp bạn quản lý mọi hoạt động một cách hiệu quả.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Trang chủ</Link></li>
                <li><Link href="/membership" className="text-gray-400 hover:text-white transition-colors duration-200">Gói tập</Link></li>
                <li><Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors duration-200">Đăng nhập</Link></li>
                <li><Link href="/auth/register" className="text-gray-400 hover:text-white transition-colors duration-200">Đăng ký</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
              <p className="text-gray-400 mb-2">Email: info@gymmanagement.com</p>
              <p className="text-gray-400 mb-2">Điện thoại: (123) 456-7890</p>
              <p className="text-gray-400">Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Gym Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
