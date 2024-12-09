import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.routes.js'
import { connectDB } from './db/connect-db.js'

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.send("Hello, welcome to web chat app")
})

app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/v1/auth", authRouter)

const PORT =  process.env.PORT 

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)
})