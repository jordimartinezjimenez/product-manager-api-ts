import { Request, Response } from "express"
import { validationResult } from 'express-validator'
import Product from "../models/Products.model"
// import { IsNumeric } from "sequelize-typescript"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [['price', 'ASC']],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        })

        res.json({ data: products })
    } catch (error) {
        console.error(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.json({ data: product })
    } catch (error) {
        console.error(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    // Validations
    // await check('name')
    //     .notEmpty().withMessage('Name is required')
    //     .run(req)
    // await check('price')
    //     .isNumeric().withMessage('Price must be numeric')
    //     .notEmpty().withMessage('Price is required')
    //     .custom(value => value >= 0).withMessage('Price must be greater than or equal to 0')
    //     .run(req)
    //
    // let errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }

    try {
        const product = await Product.create(req.body)

        res.json({ data: product })
    } catch (error) {
        console.error(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const updatedProduct = await product.update(req.body)
        await product.save()

        res.json({ data: updatedProduct })
    } catch (error) {
        console.error(error)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // product.availability = req.body.availability
        product.availability = !product.dataValues.availability
        await product.save()

        res.json({ data: product })
    } catch (error) {
        console.error(error)
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        await product.destroy()

        res.json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.error(error)
    }
}