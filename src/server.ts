import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'

// Connect to database
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue('Connection has been established successfully.'))
    } catch (error) {
        // console.error(error)
        console.log(colors.red.bold('Unable to connect to the database'))
    }
}
connectDB()

// Express instance
const server = express()

// Read forms data
server.use(express.json())

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server