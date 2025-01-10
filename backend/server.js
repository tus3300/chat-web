import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js';
import messagesRoutes from './routes/message.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware xử lý JSON payload
app.use(express.json());
app.use(cookieParser());

// Định nghĩa route
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

// Server lắng nghe
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
