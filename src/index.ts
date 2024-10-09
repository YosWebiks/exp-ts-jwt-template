import 'dotenv/config'
import apiRouter from './routes/api'


import express, {
    Express,
    Request,
    Response,
    ErrorRequestHandler,
} from 'express'

import { connectDB } from './config/db'

// Constants
const PORT = process.env.PORT || 3000

// Connect to database
connectDB()

// App
const app: Express = express()
// parse request bodies (req.body)
app.use(express.json())
// Serving static assets
app.use(express.static('public'))

// API Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).send({ message: 'Welcome to My Express App API.' })
})

app.use('/api/v1/', apiRouter)


/* Error handler middleware */
app.use(((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(statusCode).json({ message: err.message })

    return
}) as ErrorRequestHandler)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
