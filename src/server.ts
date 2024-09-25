import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'
import { col } from 'sequelize'

// Connect to database
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue('Connection has been established successfully.'))
    } catch (error) {
        // console.error(error)
        console.log(colors.red.bold('Unable to connect to the database:'))
    }
}
connectDB()

// Express instance
const server = express()

// Read forms data
server.use(express.json())

server.use('/api/products', router)

export default server