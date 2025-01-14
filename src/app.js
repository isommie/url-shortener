const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/errorHandler');
const urlRoutes = require('./routes/urlRoutes');
const setupSwaggerDocs = require('./swagger');
const { redirectUrl } = require('./controllers/urlController'); // Import redirectUrl
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
// const allowedOrigins = ['http://localhost:3000']; // Add your frontend's URL
// app.use(cors({ origin: allowedOrigins }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Routes
app.use('/api/url', urlRoutes);
app.get('/:shortUrl', redirectUrl); // Handles redirection

// Swagger docs
setupSwaggerDocs(app);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
