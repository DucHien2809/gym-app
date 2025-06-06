const prisma = require('../lib/prisma');

/**
 * Get trainer dashboard statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTrainerDashboardStats = async (req, res) => {
  try {
    // Get total members count
    const totalMembers = await prisma.user.count({
      where: { role: 'member', active: true }
    });

    // Get active members (members who have checked in within the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeMembers = await prisma.attendance.groupBy({
      by: ['memberId'],
      where: {
        checkInTime: {
          gte: thirtyDaysAgo
        }
      },
      _count: true
    });

    // Get today's check-ins
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCheckIns = await prisma.attendance.count({
      where: {
        checkInTime: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    // Vì không có model Appointment, chúng ta sẽ tạo dữ liệu giả cho upcomingAppointments
    // Trong thực tế, bạn nên tạo model Appointment trong schema Prisma
    const upcomingAppointments = [];
    const upcomingSessions = 0;

    // Get recent activities (check-ins, achievements, etc.)
    const recentActivities = await prisma.attendance.findMany({
      where: {
        checkInTime: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        member: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        checkInTime: 'desc'
      },
      take: 4
    });

    // Format activities for frontend
    const formattedActivities = recentActivities.map(activity => {
      const timeDiff = new Date() - new Date(activity.checkInTime);
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));
      const hoursDiff = Math.floor(minutesDiff / 60);
      const daysDiff = Math.floor(hoursDiff / 24);
      
      let timeText = '';
      if (daysDiff > 0) {
        timeText = `${daysDiff} ngày trước`;
      } else if (hoursDiff > 0) {
        timeText = `${hoursDiff} giờ trước`;
      } else {
        timeText = `${minutesDiff} phút trước`;
      }

      let action = 'đã check-in';
      if (activity.checkOutTime) {
        action = 'đã hoàn thành buổi tập';
      }

      return {
        id: activity.id,
        memberName: activity.member && activity.member.name ? activity.member.name : 'Thành viên không xác định',
        action,
        time: timeText
      };
    });

    // Get member alerts (missed sessions, goals not met, etc.)
    // This is more complex and would require additional business logic
    // For now, we'll return an empty array or implement a simplified version
    const memberAlerts = [];

    // Return all stats
    return res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalMembers,
          activeMembers: activeMembers.length,
          todayCheckIns,
          upcomingSessions
        },
        upcomingAppointments,
        recentActivities: formattedActivities,
        memberAlerts
      }
    });
  } catch (error) {
    console.error('Error fetching trainer dashboard stats:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

/**
 * Get admin dashboard statistics with revenue calculation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAdminDashboardStats = async (req, res) => {
  try {
    // Get total members count
    const totalMembers = await prisma.user.count({
      where: { role: 'member', active: true }
    });

    // Get active subscriptions count
    const activeSubscriptions = await prisma.subscription.count({
      where: { 
        active: true,
        endDate: {
          gte: new Date()
        }
      }
    });

    // Calculate total revenue from ALL paid subscriptions (including cancelled ones)
    // because we only subtract the actual refund amount, not the full subscription price
    const totalRevenueResult = await prisma.subscription.aggregate({
      where: {
        OR: [
          { paymentStatus: 'completed' },
          { paymentStatus: 'cancelled' } // Include cancelled subscriptions in total revenue
        ]
      },
      _sum: {
        paymentAmount: true
      }
    });

    // Calculate total refunds from approved cancellation requests
    const totalRefundsResult = await prisma.subscriptionCancellationRequest.aggregate({
      where: {
        status: 'approved',
        refundAmount: {
          not: null
        }
      },
      _sum: {
        refundAmount: true
      }
    });

    // Calculate revenue from subscriptions only (no baseline)
    const totalRevenue = totalRevenueResult._sum.paymentAmount || 0;
    const totalRefunds = totalRefundsResult._sum.refundAmount || 0;
    const netRevenue = totalRevenue - totalRefunds;

    // Get monthly revenue for current month
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);

    const monthlyRevenueResult = await prisma.subscription.aggregate({
      where: {
        OR: [
          { paymentStatus: 'completed' },
          { paymentStatus: 'cancelled' }
        ],
        paymentDate: {
          gte: currentMonth,
          lt: nextMonth
        }
      },
      _sum: {
        paymentAmount: true
      }
    });

    // Calculate monthly refunds for current month
    const monthlyRefundsResult = await prisma.subscriptionCancellationRequest.aggregate({
      where: {
        status: 'approved',
        refundAmount: {
          not: null
        },
        processedDate: {
          gte: currentMonth,
          lt: nextMonth
        }
      },
      _sum: {
        refundAmount: true
      }
    });

    // Monthly revenue = new subscriptions this month - refunds this month (no baseline for monthly)
    const monthlyRevenue = (monthlyRevenueResult._sum.paymentAmount || 0) - (monthlyRefundsResult._sum.refundAmount || 0);

    // Get pending cancellation requests
    const pendingCancellations = await prisma.subscriptionCancellationRequest.count({
      where: {
        status: 'pending'
      }
    });

    // Get total equipment count
    const totalEquipment = await prisma.equipment.count({
      where: {
        status: {
          not: 'retired'
        }
      }
    });

    // Get recent transactions (subscriptions and refunds)
    const recentSubscriptions = await prisma.subscription.findMany({
      where: {
        paymentStatus: 'completed'
      },
      include: {
        member: {
          select: {
            name: true
          }
        },
        membership: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        paymentDate: 'desc'
      },
      take: 5
    });

    // For now, get recent cancellation requests instead of refunds
    const recentRefunds = await prisma.subscriptionCancellationRequest.findMany({
      where: {
        status: 'approved'
      },
      include: {
        subscription: {
          include: {
            member: {
              select: {
                name: true
              }
            },
            membership: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        processedDate: 'desc'
      },
      take: 5
    });

    // Format recent transactions
    const recentTransactions = [
      ...recentSubscriptions.map(sub => ({
        id: sub.id,
        type: 'revenue',
        memberName: sub.member.name,
        membershipName: sub.membership.name,
        amount: sub.paymentAmount,
        date: sub.paymentDate || sub.createdAt,
        description: `Thanh toán gói ${sub.membership.name}`
      })),
      ...recentRefunds.map(refund => ({
        id: refund.id,
        type: 'refund',
        memberName: refund.subscription.member.name,
        membershipName: refund.subscription.membership.name,
        amount: -(refund.refundAmount || 0), // Use actual refund amount
        date: refund.processedDate,
        description: `Hoàn tiền gói ${refund.subscription.membership.name}`
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

    // Return all stats
    return res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalMembers,
          activeSubscriptions,
          totalRevenue,
          totalRefunds,
          netRevenue,
          monthlyRevenue,
          pendingCancellations,
          totalEquipment
        },
        recentTransactions
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch admin dashboard statistics',
      error: error.message
    });
  }
}; 