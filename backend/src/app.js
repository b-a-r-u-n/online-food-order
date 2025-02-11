import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    // origin: "http://localhost:5173",
    // origin: [
    //     'http://localhost:5173',
    //     'http://192.168.56.1:5173',
    //     'http://192.168.137.1:5173',
    //     'http://192.168.16.1:5173',
    //     'http://192.168.37.1:5173',
    //     'http://192.168.67.237:5173'
    //     ],
    origin: "https://online-food-order-frontend-x5dx.onrender.com",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],  // ✅ Allow specific methods
    // allowedHeaders: ["Content-Type", "Authorization"],  // ✅ Allow necessary headers
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());



import { router } from "./routes/user.route.js";

app.use("/api/v1/user", router);

export {app}
