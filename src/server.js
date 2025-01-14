const app = require('./app');
const { connectDB } = require('./config/db');

// Load environment variables
require('dotenv').config();

// Connect to the database
connectDB().then(() => {
  console.log('Connected to the database successfully.');

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error.message);
  process.exit(1);
});
