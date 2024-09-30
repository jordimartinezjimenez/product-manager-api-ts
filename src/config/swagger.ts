import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.1.0",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ],
        info: {
            title: "Product Manager REST API - Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar-wrapper .link {
            content: url("https://res.cloudinary.com/dn18bccoy/image/upload/v1727720818/toad.png");
            width: 100%;
        }

        .swagger-ui .topbar-wrapper {
            width: 3rem;
        }

        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: "Documentation - Product Manager REST API"
}

export default swaggerSpec
export { swaggerUiOptions }