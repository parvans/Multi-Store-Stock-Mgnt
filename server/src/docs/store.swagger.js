/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Store Management
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create Stores
 *     tags: [Stores]
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
 *               - name
 *               - address
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: MYG Digital
 *
 *               address:
 *                 type: string
 *                 example: Mavoor Road, Kozhikode
 *
 *     responses:
 *       201:
 *         description: Store create successfully
 *       400:
 *         description: Name and Address are required
 */

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get All Stores
 *     tags: [Stores]
 *
 *     responses:
 *       200:
 *         description: Store List
 */