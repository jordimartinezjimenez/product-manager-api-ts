import request from "supertest"
import server from "../../server"

describe("POST /api/products", () => {
    it("Should display valitadation errors", async () => {
        const res = await request(server)
            .post("/api/products")
            .send({})

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    it("Should validate that the price is greater than -1", async () => {
        const res = await request(server)
            .post("/api/products")
            .send({
                name: "Product Test",
                price: -1
            })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    it("Should validate that the price is a number and greater than -1", async () => {
        const res = await request(server)
            .post("/api/products")
            .send({
                name: "Product Test",
                price: "Hello"
            })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(2)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(4)
    })

    it("Should create a new product", async () => {
        const res = await request(server)
            .post("/api/products")
            .send({
                name: "Product Test",
                price: 100
            })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products", () => {
    it("Should check if /api/products URL exists", async () => {
        const res = await request(server)
            .get("/api/products")
        expect(res.status).not.toBe(404)
    })

    it("Should GET a JSON response with products", async () => {
        const res = await request(server)
            .get("/api/products")
        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveLength(1)
        expect(res.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products/:id", () => {
    it("Should return a 404 response for a non-existent product", async () => {
        const productId = 2000
        const res = await request(server)
            .get(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error).toBe("Product not found")
    })

    it("Should check a valid ID in the URL", async () => {
        const res = await request(server)
            .get(`/api/products/not-valid`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Invalid ID")
    })

    it("Should GET a JSON response for a single product", async () => {
        const res = await request(server)
            .get(`/api/products/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")
    })
})

describe("PUT /api/products/:id", () => {
    it("Should check a valid ID in the URL", async () => {
        const res = await request(server)
            .put(`/api/products/not-valid`)
            .send({
                name: "Product Test",
                price: 200,
                availability: true
            })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Invalid ID")
    })

    it("Should display validation error messages when updating a product", async () => {
        const res = await request(server)
            .put("/api/products/1")
            .send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(5)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    it("Should validate that the price is greater than -1", async () => {
        const res = await request(server)
            .put("/api/products/1")
            .send({
                name: "Product Test",
                price: -1,
                availability: true
            })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Price must be greater than or equal to 0",)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    it("Should return a 404 response for a non-existent product", async () => {
        const productId = 2000
        const res = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Product Test",
                price: 300,
                availability: true
            })
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error).toBe("Product not found")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    it("Should update an existing product", async () => {
        const res = await request(server)
            .put(`/api/products/1`)
            .send({
                name: "Product Test",
                price: 300,
                availability: true
            })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("errors")
    })
})

describe("PATCH /api/products/:id", () => {
    it("Should check a valid ID in the URL", async () => {
        const res = await request(server)
            .patch(`/api/products/not-valid`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Invalid ID")
    })

    it("Should return a 404 response for a non-existent product", async () => {
        const productId = 2000
        const res = await request(server)
            .patch(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error).toBe("Product not found")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    it("Should update an existing product", async () => {
        const res = await request(server)
            .patch(`/api/products/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("errors")
    })

    it("Should update the product availability", async () => {
        const res = await request(server)
            .patch(`/api/products/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveProperty("availability")
        expect(res.body.data.availability).toBe(true)

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("error")
    })
})

describe("DELETE /api/products/:id", () => {
    it("Should check a valid ID in the URL", async () => {
        const res = await request(server)
            .delete(`/api/products/not-valid`)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Invalid ID")
    })

    it("Should return a 404 response for a non-existent product", async () => {
        const productId = 2000
        const res = await request(server)
            .delete(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error).toBe("Product not found")
        expect(res.status).not.toBe(200)
    })

    it("Should delete an existing product", async () => {
        const res = await request(server)
            .delete(`/api/products/1`)
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("message")
        expect(res.body.message).toBe("Product deleted successfully")

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("errors")
    })
})