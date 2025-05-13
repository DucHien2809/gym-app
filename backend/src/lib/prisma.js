// This file is used to instantiate the Prisma client with global caching
const { PrismaClient } = require('../generated/prisma');

// Create global prisma instance
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Connection management
const connect = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// Handle connection events
connect();

// Export prisma instance
module.exports = prisma; 