const { prisma } = require('../config/db');

/**
 * Create a new shortened URL record.
 * @param {string} originalUrl - The original URL to be shortened.
 * @param {string} shortUrl - The alias for the shortened URL.
 * @param {Date|null} expiresAt - The expiration date (optional).
 * @returns {object} - The created URL record.
 */
const createShortUrl = async (originalUrl, shortUrl, expiresAt = null) => {
  return await prisma.url.create({
    data: {
      originalUrl,
      shortUrl,
      expiresAt,
    },
  });
};

/**
 * Retrieve a URL record by its shortened alias.
 * @param {string} shortUrl - The alias of the shortened URL.
 * @returns {object|null} - The matching URL record or null if not found.
 */
const getUrlByAlias = async (shortUrl) => {
  return await prisma.url.findUnique({
    where: { shortUrl },
  });
};

/**
 * Increment the click count for a shortened URL.
 * @param {string} shortUrl - The alias of the shortened URL.
 * @returns {object} - The updated URL record.
 */
const incrementClickCount = async (shortUrl) => {
  return await prisma.url.update({
    where: { shortUrl },
    data: {
      clickCount: { increment: 1 },
    },
  });
};

/**
 * Delete expired URLs.
 * @returns {number} - The number of deleted records.
 */
const deleteExpiredUrls = async () => {
  const result = await prisma.url.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(), // Delete where expiration date is less than or equal to now
      },
    },
  });
  return result.count;
};

module.exports = {
  createShortUrl,
  getUrlByAlias,
  incrementClickCount,
  deleteExpiredUrls,
};
