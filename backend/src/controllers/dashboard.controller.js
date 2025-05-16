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