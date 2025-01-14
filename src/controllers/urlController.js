const { createShortUrl, getUrlByAlias, incrementClickCount, deleteExpiredUrls } = require('../models/urlModel');
const { generateAlias, isValidUrl, formatUrl } = require('../utils/helpers');

/**
 * Create a shortened URL.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const createUrl = async (req, res, next) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;

    // Validate the original URL
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ message: 'Invalid URL provided.' });
    }

    // Format the URL to ensure it has a proper protocol
    const formattedUrl = formatUrl(originalUrl);

    // Check if a custom alias was provided; otherwise, generate one
    const alias = customAlias || generateAlias();

    // Save the shortened URL to the database
    const newUrl = await createShortUrl(formattedUrl, alias, expiresAt ? new Date(expiresAt) : null);

    res.status(201).json({
      message: 'Shortened URL created successfully.',
      shortUrl: `${req.protocol}://${req.get('host')}/${newUrl.shortUrl}`,
      data: newUrl,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Redirect to the original URL based on the short alias.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const redirectUrl = async (req, res, next) => {
  try {
    const { shortUrl } = req.params;

    // Find the URL record by alias
    const urlRecord = await getUrlByAlias(shortUrl);

    // Check if the URL exists and is not expired
    if (!urlRecord || (urlRecord.expiresAt && urlRecord.expiresAt < new Date())) {
      return res.status(404).json({ message: 'URL not found or expired.' });
    }

    // Increment click count
    await Promise.all([
        incrementClickCount(shortUrl).catch((err) => console.error(err)),
        res.redirect(urlRecord.originalUrl),
    ]);
      
    // await incrementClickCount(shortUrl);

    // Redirect to the original URL
    // res.redirect(urlRecord.originalUrl);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete expired URLs (clean-up).
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const cleanUpExpiredUrls = async (req, res, next) => {
  try {
    const deletedCount = await deleteExpiredUrls();
    res.status(200).json({
      message: `Expired URLs cleaned up successfully.`,
      deletedCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUrl, redirectUrl, cleanUpExpiredUrls };
