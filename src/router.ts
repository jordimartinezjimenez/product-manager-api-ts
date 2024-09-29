import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

router.get("/", getProducts)

router.get("/:id",
    param("id").isInt().withMessage("Invalid ID"),
    handleInputErrors,
    getProductById
)

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

router.patch("/:id",
    param("id").isInt().withMessage("Invalid ID"),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",
    param("id").isInt().withMessage("Invalid ID"),
    handleInputErrors,
    deleteProduct
)

export default router