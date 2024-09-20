import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/coment.route.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();
app.use(cookieParser())


app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('MongoDB Connected!');
}).catch(err => {
    console.log(err);
})

// app.listen(process.env.PORT || 8000, () => {
//     console.log("Server running on port 8000");
// })

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";


    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

