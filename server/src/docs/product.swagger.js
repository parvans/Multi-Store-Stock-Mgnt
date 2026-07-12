/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create Product
 *     tags: [Products]
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
 *               - sku
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Macbook Pro M4
 *
 *               sku:
 *                 type: string
 *                 example: MBP-M4
 *
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Name and SKU are required
 *       409:
 *         description: Product already exist with the same SKU
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get All Products
 *     tags: [Products]
 *
 *     responses:
 *       200:
 *         description: Product List
 */