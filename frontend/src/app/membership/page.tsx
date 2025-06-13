'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { membershipAPI } from '@/services/api';
import { Membership } from '@/types';

export default function MembershipPage() {
  const { auth } = useAuth();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        const response = await membershipAPI.getAllMemberships();
        if (response.status === 'success' && response.data?.memberships) {
          setMemberships((response.data as any).memberships);
        }
      } catch (error) {
        setError('Không thể tải dữ liệu gói tập. Vui lòng thử lại sau.');
        console.error('Error fetching memberships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-700">
            QUẢN LÝ PHÒNG TẬP
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-800 hover:text-indigo-600 font-medium">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-indigo-600 font-medium">
                  Gói tập
                </Link>
              </li>
              {auth.isAuthenticated ? (
                <li>
                  <Link
                    href={
                      auth.user?.role === 'admin'
                        ? '/admin'
                        : auth.user?.role === 'trainer'
                        ? '/dashboard/trainer'
                        : '/dashboard/member'
                    }
                    className="text-gray-800 hover:text-indigo-600 font-medium"
                  >
                    Bảng điều khiển
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href="/auth/login" className="text-gray-800 hover:text-indigo-600 font-medium">
                    Đăng nhập
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-12">Các gói tập</h1>

          {loading ? (
            <div className="flex justify-center">
              <p className="text-gray-500">Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Thử lại
              </button>
            </div>
          ) : memberships.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500">Hiện tại chưa có gói tập nào.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Demo membership plans in case API doesn't work */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-indigo-600 p-6 text-white">
                  <h3 className="text-xl font-bold">Gói Cơ bản</h3>
                  <p className="text-3xl font-bold mt-2">500.000 đ</p>
                  <p className="mt-1 text-indigo-100">1 tháng</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Sử dụng tất cả máy tập</span>
                    </li>
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Tập không giới hạn thời gian</span>
                    </li>
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Nước uống miễn phí</span>
                    </li>
                  </ul>
                  <Link
                    href={auth.isAuthenticated ? '/dashboard/member' : '/auth/login'}
                    className="block w-full mt-6 bg-indigo-600 text-white py-2 text-center rounded-md hover:bg-indigo-700"
                  >
                    {auth.isAuthenticated ? 'Đăng ký ngay' : 'Đăng nhập để đăng ký'}
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-indigo-700 p-6 text-white">
                  <h3 className="text-xl font-bold">Gói Tiêu chuẩn</h3>
                  <p className="text-3xl font-bold mt-2">1.200.000 đ</p>
                  <p className="mt-1 text-indigo-100">3 tháng</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Tất cả tính năng của gói Cơ bản</span>
                    </li>
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>1 buổi PT miễn phí</span>
                    </li>
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Giảm 10% khi mua sản phẩm tại gym</span>
                    </li>
                  </ul>
                  <Link
                    href={auth.isAuthenticated ? '/dashboard/member' : '/auth/login'}
                    className="block w-full mt-6 bg-indigo-700 text-white py-2 text-center rounded-md hover:bg-indigo-800"
                  >
                    {auth.isAuthenticated ? 'Đăng ký ngay' : 'Đăng nhập để đăng ký'}
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-indigo-800 p-6 text-white">
                  <h3 className="text-xl font-bold">Gói Premium</h3>
                  <p className="text-3xl font-bold mt-2">3.600.000 đ</p>
                  <p className="mt-1 text-indigo-100">12 tháng</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Tất cả tính năng của gói Tiêu chuẩn</span>
                    </li>
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>5 buổi PT miễn phí</span>
                    </li>
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Giảm 20% khi mua sản phẩm tại gym</span>
                    </li>
                    <li className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Ưu tiên đăng ký lớp học nhóm</span>
                    </li>
                  </ul>
                  <Link
                    href={auth.isAuthenticated ? '/dashboard/member' : '/auth/login'}
                    className="block w-full mt-6 bg-indigo-800 text-white py-2 text-center rounded-md hover:bg-indigo-900"
                  >
                    {auth.isAuthenticated ? 'Đăng ký ngay' : 'Đăng nhập để đăng ký'}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-3">GYM MANAGEMENT</h3>
              <p className="text-gray-400">Hệ thống quản lý phòng gym toàn diện</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Liên hệ</h4>
              <p className="text-gray-400 mb-2">Email: info@gymmanagement.com</p>
              <p className="text-gray-400">Điện thoại: (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Gym Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
