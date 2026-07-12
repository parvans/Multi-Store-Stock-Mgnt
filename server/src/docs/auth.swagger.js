/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     security: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Arun Kumar
 *
 *               email:
 *                 type: string
 *                 example: arunkumar@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: Arun@123
 *
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email Already Exists
 *       400:
 *         description: 
 *           Possible errors: 
 *           - Password must be at least 6 characters
 *           - Invalid email format
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Authentication]
 *     security: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *
 *             properties:
 *               email:
 *                 type: string
 *                 example: arunkumar@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: Arun@123
 *
 *     responses:
 *       200:
 *         description: User Login successfully
 *
 *       401:
 *         description: Invalid email or password
 */