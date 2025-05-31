const prisma = require('../lib/prisma');

// Lấy tất cả lượt điểm danh
exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        checkInTime: 'desc'
      }
    });

    res.status(200).json({
      status: 'success',
      results: attendances.length,
      data: {
        attendances,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Lấy tất cả lượt điểm danh của một thành viên
exports.getMemberAttendances = async (req, res) => {
  try {
    const { memberId } = req.params;

    const attendances = await prisma.attendance.findMany({
      where: { memberId },
      orderBy: {
        checkInTime: 'desc'
      }
    });

    res.status(200).json({
      status: 'success',
      results: attendances.length,
      data: {
        attendances,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Tạo điểm danh check-in
exports.checkIn = async (req, res) => {
  try {
    const { memberId, notes } = req.body;

    console.log('Check-in request:', { memberId, notes, userId: req.user?.id });

    // Kiểm tra thành viên tồn tại
    const member = await prisma.user.findUnique({
      where: { id: memberId }
    });

    if (!member) {
      console.log('Member not found:', memberId);
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy thành viên',
      });
    }

    console.log('Member found:', { id: member.id, name: member.name, role: member.role });

    // Kiểm tra thành viên có gói tập đang hoạt động (tạm thời bỏ qua cho admin test)
    // const currentDate = new Date();
    // const activeSubscription = await prisma.subscription.findFirst({
    //   where: {
    //     memberId,
    //     active: true,
    //     startDate: { lte: currentDate },
    //     endDate: { gte: currentDate },
    //   }
    // });

    // console.log('Active subscription check:', { 
    //   memberId, 
    //   activeSubscription: activeSubscription ? 'found' : 'not found',
    //   currentDate: currentDate.toISOString()
    // });

    // Tạm thời cho phép check-in ngay cả khi không có subscription (để test)
    // if (!activeSubscription) {
    //   return res.status(400).json({
    //     status: 'fail',
    //     message: 'Thành viên không có gói tập đang hoạt động',
    //   });
    // }

    // Kiểm tra xem thành viên đã check-in chưa
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        memberId,
        checkOutTime: null
      }
    });

    if (existingAttendance) {
      console.log('Member already checked in:', existingAttendance.id);
      return res.status(400).json({
        status: 'fail',
        message: 'Thành viên đã điểm danh rồi! Vui lòng check-out trước khi check-in lại.',
      });
    }

    // Tạo điểm danh mới
    const newAttendance = await prisma.attendance.create({
      data: {
        memberId,
        checkInTime: new Date(),
        notes: notes || null,
        createdById: req.user?.id || null,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    console.log('Attendance created successfully:', newAttendance.id);

    res.status(201).json({
      status: 'success',
      data: {
        attendance: newAttendance,
      },
    });
  } catch (error) {
    console.error('Error in checkIn controller:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Cập nhật điểm danh check-out
exports.checkOut = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    // Tìm điểm danh
    const attendance = await prisma.attendance.findUnique({
      where: { id }
    });

    if (!attendance) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy điểm danh',
      });
    }

    // Kiểm tra nếu đã check-out
    if (attendance.checkOutTime) {
      return res.status(400).json({
        status: 'fail',
        message: 'Thành viên đã check-out',
      });
    }

    // Tính thời gian tập (phút)
    const checkOutTime = new Date();
    const duration = Math.round((checkOutTime - new Date(attendance.checkInTime)) / (1000 * 60));

    // Cập nhật thời gian check-out
    const updatedAttendance = await prisma.attendance.update({
      where: { id },
      data: {
        checkOutTime,
        duration,
        notes: notes || attendance.notes,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        attendance: updatedAttendance,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Xoá điểm danh
exports.deleteAttendance = async (req, res) => {
  try {
    await prisma.attendance.delete({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy attendance
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy điểm danh',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}; 