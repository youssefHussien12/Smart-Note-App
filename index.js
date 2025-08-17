import express from 'express'
import { dbConnection } from './db/dbConnection.js'
import 'dotenv/config'
import cors from 'cors'
import authRouter from './src/modules/auth/auth.routes.js'
import noteRouter from './src/modules/notes/note.routes.js'
import { globalError } from './src/middleware/globalError.js'
const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
dbConnection()
app.use(cors())

app.use('/auth',authRouter)
app.use('/api',noteRouter)

//https://documenter.getpostman.com/view/32840844/2sB3B7MtX1

app.use(globalError)

app.listen(port, () => console.log(`Server is running on port ${port}`))
