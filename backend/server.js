import 'dotenv/config';

import express from "express"
import cors from "cors"
import foodRouter from './Routes/FoodRoute.js'

import prisma from './prisma/index.js';


// App config
const app = express()
const port = process.env.PORT || 3000


// Middleware
app.use(express.json())
app.use(cors())

app.get("/" , (req, res) => {
    res.send("API working")
})



// API Endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))




// Listening to the port
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

