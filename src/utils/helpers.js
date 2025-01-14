const crypto = require('crypto');

/**
 * Generate a random alias for a shortened URL.
 * @param {number} length - Length of the alias (default: 6).
 * @returns {string} - Randomly generated alias.
 */
const generateAlias = (length = 6) => {
  return crypto.randomBytes(length).toString('base64url').slice(0, length);
};

/**
 * Validate if a string is a valid URL.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if valid, otherwise false.
 */
const isValidUrl = (url) => {
  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return urlRegex.test(url);
};

/**
 * Format the URL to ensure it includes the protocol (http/https).
 * @param {string} url - The URL to format.
 * @returns {string} - Formatted URL with protocol.
 */

const formatUrl = (url) => {
  try {
    const parsedUrl = new URL(url); // Will throw if the URL is invalid
    return parsedUrl.href; // Return the full, correctly formatted URL
  } catch (error) {
    // If URL is invalid or missing protocol, assume http:// by default
    return `http://${url}`;
  }
}

// const formatUrl = (url) => {
//   if (!/^https?:\/\//i.test(url)) {
//     return `http://${url}`;
//   }
//   return url;
// };

module.exports = { generateAlias, isValidUrl, formatUrl };
