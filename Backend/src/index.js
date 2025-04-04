import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {connectDB} from "./lib/db.index.js"
import cors from "cors"
import { app,server } from "./lib/socket.js"

import path from "path"

dotenv.config()

const PORT = process.env.PORT
const _dirname = path.resolve();

app.use(express.json({ limit: '50mb' })); 
app.use(cookieParser())
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
)

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")))


    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../frontend","dist","index.html"))
    })
}

const startServer = async()=>{
    try {
        await connectDB();
        server.listen(PORT,()=>{
            console.log(`server is running on Port ${PORT}`)
        })
    } catch (error) {
        console.error("failed to connect to mongoDB")
        process.exit(1)
    }
}
startServer();