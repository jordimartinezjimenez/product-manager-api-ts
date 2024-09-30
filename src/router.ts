import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: Keyboard
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 100
 *         availability:
 *           type: boolean
 *           description: The availability of the product
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags: [Products]
 *      description: The list of products
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags: [Products]
 *      description: Return a product based on its unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Not found
 *          404:
 *              description: Invalid ID
 */
router.get("/:id",
    param("id").isInt().withMessage("Invalid ID"),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags: [Products]
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       type: object
 *                       properties:
 *                          name:
 *                              type: string
 *                              example: Keyboard
 *                          price:
 *                              type: number
 *                              example: 100
 *      responses:
 *          201:
 *              description: Product created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input data
 */
router.post("/",
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric().withMessage('Price must be numeric')
        .notEmpty().withMessage('Price is required')
        .custom(value => value >= 0).withMessage('Price must be greater than or equal to 0'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags: [Products]
 *      description: Returns the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                       type: object
 *                       properties:
 *                          name:
 *                              type: string
 *                              example: Keyboard - Updated
 *                          price:
 *                              type: number
 *                              example: 100
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or input data
 *          404:
 *              description: Product not found
 */
router.put("/:id",
    param("id").isInt().withMessage("Invalid ID"),
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric().withMessage('Price must be numeric')
        .notEmpty().withMessage('Price is required')
        .custom(value => value >= 0).withMessage('Price must be greater than or equal to 0'),
    body('availability')
        .isBoolean().withMessage('Availability must be a boolean'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update the availability of a product
 *      tags: [Products]
 *      description: Returns the updated availability
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product availability updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */
router.patch("/:id",
    param("id").isInt().withMessage("Invalid ID"),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by ID
 *      tags: [Products]
 *      description: Returns a confirmation message
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Product deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Product deleted successfully"
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */
router.delete("/:id",
    param("id").isInt().withMessage("Invalid ID"),
    handleInputErrors,
    deleteProduct
)

export default router