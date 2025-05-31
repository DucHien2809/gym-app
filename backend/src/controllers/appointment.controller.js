const prisma = require('../lib/prisma');

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true
          }
        },
        trainer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        appointmentDate: 'desc'
      }
    });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get appointments for a specific member
exports.getMemberAppointments = async (req, res) => {
  try {
    const { memberId } = req.params;

    const appointments = await prisma.appointment.findMany({
      where: { memberId },
      include: {
        trainer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        appointmentDate: 'desc'
      }
    });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get appointments for a specific trainer
exports.getTrainerAppointments = async (req, res) => {
  try {
    const { trainerId } = req.params;

    const appointments = await prisma.appointment.findMany({
      where: { trainerId },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true
          }
        }
      },
      orderBy: {
        appointmentDate: 'desc'
      }
    });

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { memberId, trainerId, title, description, appointmentDate, duration, notes } = req.body;

    // Validate member exists
    const member = await prisma.user.findUnique({
      where: { id: memberId, role: 'member' }
    });
    if (!member) {
      return res.status(404).json({
        status: 'fail',
        message: 'Member not found',
      });
    }

    // Validate trainer exists
    const trainer = await prisma.user.findUnique({
      where: { id: trainerId, role: 'trainer' }
    });
    if (!trainer) {
      return res.status(404).json({
        status: 'fail',
        message: 'Trainer not found',
      });
    }

    // Check for appointment time conflicts
    const conflictingAppointments = await prisma.appointment.findMany({
      where: {
        trainerId,
        appointmentDate: {
          gte: new Date(appointmentDate),
          lt: new Date(new Date(appointmentDate).getTime() + duration * 60000)
        },
        status: { in: ['pending', 'accepted'] }
      }
    });

    if (conflictingAppointments.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'The trainer already has an appointment scheduled for this time',
      });
    }

    // Create new appointment
    const newAppointment = await prisma.appointment.create({
      data: {
        memberId,
        trainerId,
        title,
        description,
        appointmentDate: new Date(appointmentDate),
        duration,
        notes,
        status: 'pending'
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        trainer: {
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
        appointment: newAppointment,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Update appointment status (accept/reject)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['pending', 'accepted', 'rejected', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status value',
      });
    }

    // Ensure the appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!appointment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Appointment not found',
      });
    }

    // Update the appointment
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        status,
        notes: notes || appointment.notes,
        updatedAt: new Date()
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        trainer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        appointment: updatedAppointment,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.appointment.delete({
      where: { id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    // Handle not found error
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'fail',
        message: 'Appointment not found',
      });
    }
    
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}; 