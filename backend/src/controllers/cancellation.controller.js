const prisma = require('../lib/prisma');

// Lấy tất cả yêu cầu hủy đăng ký
exports.getAllCancellationRequests = async (req, res) => {
  try {
    const requests = await prisma.subscriptionCancellationRequest.findMany({
      include: {
        subscription: {
          include: {
            membership: true
          }
        },
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        processedBy: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        requestDate: 'desc'
      }
    });

    res.status(200).json({
      status: 'success',
      results: requests.length,
      data: {
        cancellationRequests: requests,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Lấy các yêu cầu hủy đăng ký của một thành viên
exports.getMemberCancellationRequests = async (req, res) => {
  try {
    const { memberId } = req.params;

    const requests = await prisma.subscriptionCancellationRequest.findMany({
      where: { memberId },
      include: {
        subscription: {
          include: {
            membership: true
          }
        },
        processedBy: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        requestDate: 'desc'
      }
    });

    res.status(200).json({
      status: 'success',
      results: requests.length,
      data: {
        cancellationRequests: requests,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Yêu cầu hủy đăng ký
exports.requestCancellation = async (req, res) => {
  try {
    const { subscriptionId, reason } = req.body;
    
    // Kiểm tra quyền - nếu là member thì chỉ được yêu cầu hủy đăng ký của chính mình
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId }
    });

    if (!subscription) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy đăng ký',
      });
    }

    if (req.user.role === 'member' && subscription.memberId !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Bạn chỉ có thể yêu cầu hủy đăng ký của chính mình',
      });
    }

    // Kiểm tra xem đã có yêu cầu hủy đăng ký nào đang chờ xử lý không
    const existingRequest = await prisma.subscriptionCancellationRequest.findFirst({
      where: {
        subscriptionId,
        status: 'pending'
      }
    });

    if (existingRequest) {
      return res.status(400).json({
        status: 'fail',
        message: 'Đã có yêu cầu hủy đăng ký đang chờ xử lý',
      });
    }

    // Tạo yêu cầu hủy đăng ký mới
    const newRequest = await prisma.subscriptionCancellationRequest.create({
      data: {
        subscriptionId,
        memberId: subscription.memberId,
        reason: reason || 'Không có lý do được cung cấp',
        status: 'pending',
        requestDate: new Date()
      },
      include: {
        subscription: {
          include: {
            membership: true
          }
        },
        member: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      status: 'success',
      data: {
        cancellationRequest: newRequest,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Xử lý yêu cầu hủy đăng ký (chấp nhận hoặc từ chối)
exports.processCancellationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;
    
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({
        status: 'fail',
        message: 'Trạng thái không hợp lệ. Phải là "approved" hoặc "rejected"',
      });
    }

    // Kiểm tra xem yêu cầu tồn tại không
    const request = await prisma.subscriptionCancellationRequest.findUnique({
      where: { id },
      include: {
        subscription: true
      }
    });

    if (!request) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy yêu cầu hủy đăng ký',
      });
    }

    if (request.status !== 'pending') {
      return res.status(400).json({
        status: 'fail',
        message: 'Yêu cầu này đã được xử lý trước đó',
      });
    }

    // Cập nhật trạng thái của yêu cầu
    const updatedRequest = await prisma.subscriptionCancellationRequest.update({
      where: { id },
      data: {
        status,
        adminNote: adminNote || null,
        processedById: req.user.id,
        processedDate: new Date()
      },
      include: {
        subscription: {
          include: {
            membership: true
          }
        },
        member: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        processedBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Nếu chấp nhận yêu cầu, thực hiện hủy đăng ký
    if (status === 'approved') {
      await prisma.subscription.delete({
        where: { id: request.subscriptionId }
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        cancellationRequest: updatedRequest,
      },
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy yêu cầu
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy yêu cầu hủy đăng ký',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}; 