
import express from "express"
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookiesParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors"
import bodyParser from "body-parser";
import {app,server} from "./lib/socket.js"
dotenv.config()

const PORT = process.env.PORT 

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json())
app.use(cookiesParser())

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials:true
    }
))

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)



server.listen(PORT,()=>{
    console.log("server is srunning on port "+PORT)
    connectDB()
})

