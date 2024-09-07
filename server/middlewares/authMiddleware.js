
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv"
dotenv.config()

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log("Received token:", token);
    if (!token) {
        return res.status(403).json({ message: "Token không được cung cấp" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Lưu userId vào request để sử dụng sau này
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



export { verifyToken };