const express = require('express');
const { createUrl, redirectUrl, cleanUpExpiredUrls } = require('../controllers/urlController');

const router = express.Router();

/**
 * @swagger
 * /api/url/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     tags:
 *       - URL Shortener
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: The original URL to be shortened
 *               customAlias:
 *                 type: string
 *                 description: Custom alias for the shortened URL
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 description: Expiration date for the shortened URL
 *     responses:
 *       201:
 *         description: Successfully created a shortened URL
 *       400:
 *         description: Invalid input
 */
router.post('/shorten', createUrl);

/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     summary: Redirect to the original URL
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: Alias for the shortened URL
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: URL not found or expired
 */
router.get('/:shortUrl', redirectUrl);

/**
 * @swagger
 * /api/url/cleanup:
 *   delete:
 *     summary: Delete expired URLs
 *     tags:
 *       - URL Shortener
 *     responses:
 *       200:
 *         description: Successfully deleted expired URLs
 */
router.delete('/cleanup', cleanUpExpiredUrls);

module.exports = router;
