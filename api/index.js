import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config()
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('MongoDB Connected!');
}).catch(err => {
    console.log(err);
})
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.listen(8000, () => {
    console.log("Server running on port 8000");
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";


    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

