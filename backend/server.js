const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const prisma = require('./src/lib/prisma');
const { errorHandler } = require('./src/middleware/error.middleware');

// Import routes
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const membershipRoutes = require('./src/routes/membership.routes');
const subscriptionRoutes = require('./src/routes/subscription.routes');
const attendanceRoutes = require('./src/routes/attendance.routes');

// Load env variables
dotenv.config();

// Initialize express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Cho phép tất cả các origin trong môi trường phát triển
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Enable pre-flight for all routes
app.options('*', cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/attendance', attendanceRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Gym Management API is running');
});

// Test routes
app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Test endpoint is working'
  });
});

app.post('/api/test', (req, res) => {
  console.log('Test POST endpoint received body:', req.body);
  res.status(200).json({ 
    status: 'success', 
    message: 'Test POST endpoint is working',
    data: { received: req.body }
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle Prisma disconnect on app termination
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = app; 