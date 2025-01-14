const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Connect to the database
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { prisma, connectDB };
