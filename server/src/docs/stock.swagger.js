/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: Stock Adjustment, Store to Store Transfer and List
 */

/**
 * @swagger
 * /stocks/adjustorcreate:
 *   post:
 *     summary: Adjust Stock quantity, Create new stock if stock is not exist.
 *     tags: [Stocks]
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - productId
 *               - storeId
 *               - quantity
 *
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 6a534565d34a8e55df464a83
 *
 *               storeId:
 *                 type: string
 *                 example: 6a534565d34a8e55df464a8a
 * 
 *               quantity:
 *                 type: number
 *                 example: 5
 *
 *     responses:
 *       200:
 *         description: Stock adjustment completed successfully
 *       400:
 *         description: Product and Store are required
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /stocks/transferstoretostore:
 *   post:
 *     summary: Transfer stock between stores and updated per-store levels.
 *     tags: [Stocks]
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - productId
 *               - sourceStoreId
 *               - destinStoreId
 *               - quantity
 *
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 6a534565d34a8e55df464a83
 *
 *               sourceStoreId:
 *                 type: string
 *                 example: 6a534565d34a8e55df464a83
 * 
 *               destinStoreId:
 *                 type: string
 *                 example: 6a534565d34a8e55df464a83
 * 
 *               quantity:
 *                 type: number
 *                 example: 5
 *
 *     responses:
 *       200:
 *         description: Stock transfered successfully
 *       400:
 *         description: All fields required
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /stocks:
 *   get:
 *     summary: Get All Stocks
 *     tags: [Stocks]
 *
 *     responses:
 *       200:
 *         description: Stock List
 */