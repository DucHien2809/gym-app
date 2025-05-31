const prisma = require('../lib/prisma');

// Lấy tất cả đăng ký tập
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        membership: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true
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
      results: subscriptions.length,
      data: {
        subscriptions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Lấy tất cả đăng ký tập của một thành viên
exports.getMemberSubscriptions = async (req, res) => {
  try {
    const { memberId } = req.params;

    const subscriptions = await prisma.subscription.findMany({
      where: { memberId },
      include: {
        membership: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true
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
      results: subscriptions.length,
      data: {
        subscriptions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Lấy thông tin một đăng ký tập
exports.getSubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: req.params.id },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        membership: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true
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

    if (!subscription) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy đăng ký',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        subscription,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Tạo đăng ký tập mới
exports.createSubscription = async (req, res) => {
  try {
    // Kiểm tra quyền - nếu là member thì chỉ được tạo đăng ký cho chính mình
    if (req.user.role === 'member' && req.body.memberId !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'Bạn chỉ có thể đăng ký gói tập cho chính mình',
      });
    }

    // Kiểm tra thành viên và gói tập tồn tại
    const member = await prisma.user.findUnique({
      where: { id: req.body.memberId || req.body.member }
    });
    
    const membership = await prisma.membership.findUnique({
      where: { id: req.body.membershipId || req.body.membership }
    });

    if (!member) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy thành viên',
      });
    }

    if (!membership) {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy gói tập',
      });
    }

    // Tính ngày kết thúc dựa vào thời hạn gói tập
    const startDate = new Date(req.body.startDate || Date.now());
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + membership.duration);

    // Tạo đăng ký mới
    const memberId = req.body.memberId || req.body.member;
    const membershipId = req.body.membershipId || req.body.membership;
    
    const newSubscription = await prisma.subscription.create({
      data: {
        memberId,
        membershipId,
        startDate,
        endDate,
        paymentAmount: req.body.paymentAmount || membership.price,
        paymentStatus: req.body.paymentStatus || 'pending',
        paymentMethod: req.body.paymentMethod || 'cash',
        paymentDate: req.body.paymentDate ? new Date(req.body.paymentDate) : null,
        notes: req.body.notes || null,
        createdById: req.user.id,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        membership: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true
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

    res.status(201).json({
      status: 'success',
      data: {
        subscription: newSubscription,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Cập nhật trạng thái thanh toán
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod, paymentDate } = req.body;
    
    const subscription = await prisma.subscription.update({
      where: { id: req.params.id },
      data: {
        paymentStatus,
        paymentMethod,
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        membership: {
          select: {
            id: true,
            name: true,
            duration: true,
            price: true
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
        subscription,
      },
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy subscription
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy đăng ký',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Hủy đăng ký
exports.cancelSubscription = async (req, res) => {
  try {
    await prisma.subscription.delete({
      where: { id: req.params.id }
    });

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    // Xử lý lỗi không tìm thấy subscription
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Không tìm thấy đăng ký',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}; 