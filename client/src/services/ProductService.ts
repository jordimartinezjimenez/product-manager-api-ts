import { safeParse, parse, number, pipe, string, transform } from "valibot"
import axios from "axios"
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
// import { toBoolean } from "../utils"

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Invalid data')
        }

    } catch (error) {
        console.error(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('There was an error')
        }

    } catch (error) {
        console.error(error)
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('There was an error')
        }

    } catch (error) {
        console.error(error)
    }
}

export async function editProduct(data: ProductData, id: Product['id']) {
    try {
        console.log(data)
        const NumberSchema = pipe(string(), transform(Number), number())
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            // availability: toBoolean(data.availability.toString())
            availability: data.availability ? true : false
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }

    } catch (error) {
        console.error(error)
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.error(error)
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.error(error)
    }
}