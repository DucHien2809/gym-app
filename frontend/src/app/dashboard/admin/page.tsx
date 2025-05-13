'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userAPI, membershipAPI, subscriptionAPI } from '@/services/api';

export default function AdminDashboard() {
  const { auth } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalStaff: 0,
    totalMemberships: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists and has an ID before fetching data
    if (auth.user && auth.user.id) {
      // Only verify role
      if (auth.user.role !== 'admin') {
        router.push(`/dashboard/${auth.user.role}`);
        return;
      }
      
      fetchDashboardData();
    }
  }, [auth.user, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersResponse = await userAPI.getAllUsers();
      const users = Array.isArray(usersResponse.data?.users) 
        ? usersResponse.data?.users 
        : [];
      const members = users.filter((user: any) => user.role === 'member') || [];
      const staff = users.filter((user: any) => user.role === 'staff') || [];
      
      // Fetch memberships
      const membershipsResponse = await membershipAPI.getAllMemberships();
      const memberships = Array.isArray(membershipsResponse.data?.memberships)
        ? membershipsResponse.data?.memberships
        : [];
      
      // Fetch subscriptions
      const subscriptionsResponse = await subscriptionAPI.getAllSubscriptions();
      const subscriptions = Array.isArray(subscriptionsResponse.data?.subscriptions)
        ? subscriptionsResponse.data?.subscriptions
        : [];
      const activeSubscriptions = subscriptions.filter((sub: any) => sub.active) || [];
      
      setStats({
        totalMembers: members.length,
        totalStaff: staff.length,
        totalMemberships: memberships.length,
        totalSubscriptions: subscriptions.length,
        activeSubscriptions: activeSubscriptions.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManageUsers = () => {
    router.push('/dashboard/admin/users');
  };

  const handleManageMemberships = () => {
    router.push('/dashboard/admin/memberships');
  };

  const handleManageSubscriptions = () => {
    router.push('/dashboard/admin/subscriptions');
  };

  const handleManageAttendance = () => {
    router.push('/dashboard/admin/attendance');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center">
            <p className="text-lg">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Total Members</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalMembers}</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Total Staff</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalStaff}</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Membership Plans</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalMemberships}</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Active Subscriptions</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.activeSubscriptions}</dd>
              </div>
            </div>

            <h2 className="mb-6 text-2xl font-bold">Management</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <button
                onClick={handleManageUsers}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow transition hover:bg-indigo-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">User Management</h3>
                <p className="mt-1 text-sm text-gray-500">Manage members and staff accounts</p>
              </button>
              
              <button
                onClick={handleManageMemberships}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow transition hover:bg-indigo-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Membership Plans</h3>
                <p className="mt-1 text-sm text-gray-500">Manage membership packages</p>
              </button>
              
              <button
                onClick={handleManageSubscriptions}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow transition hover:bg-indigo-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Subscriptions</h3>
                <p className="mt-1 text-sm text-gray-500">Manage member subscriptions</p>
              </button>
              
              <button
                onClick={handleManageAttendance}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow transition hover:bg-indigo-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Attendance</h3>
                <p className="mt-1 text-sm text-gray-500">View and manage attendance records</p>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 