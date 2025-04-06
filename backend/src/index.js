import express from 'express';
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookiesParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors"
import bodyParser from "body-parser";
import {app,server} from "./lib/socket.js"
import path from "path"


const PORT = process.env.PORT 
const __dirname = path.resolve()

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

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../project/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../project", "dist", "index.html"));
      });
}

server.listen(PORT,()=>{
    console.log("server is srunning on port "+PORT)
    connectDB()
})

