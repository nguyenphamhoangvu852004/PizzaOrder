import mySqlPool from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const db = mySqlPool
const salt = 10;

const createAccount = async (req, res) => {
    try {
        const { username, phone, email, password } = req.body;

        // Kiểm tra xem có đầy đủ thông tin không
        if (!username || !phone || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin tài khoản'
            });
        }

        // Thực hiện Hash Password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Thực hiện query để tạo tài khoản
        const [result] = await db.query(
            "INSERT INTO Accounts (Username, Phone, Email, Password) VALUES (?, ?, ?, ?)",
            [username, phone, email, hashedPassword]
        );

        if (result.affectedRows > 0) {
            res.status(201).json({
                success: true,
                message: 'Tạo tài khoản thành công',
                accountId: result.insertId
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Không thể tạo tài khoản'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi trong quá trình tạo tài khoản',
            error: error.message
        });
    }
}

const loginAccount = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp tên đăng nhập và mật khẩu'
            });
        }

        const [results] = await db.query(
            "SELECT * FROM Accounts WHERE Username = ?",
            [username]
        );

        if (results.length > 0) {
            const isMatch = await bcrypt.compare(password, results[0].Password);
            if (isMatch) {
                // Generate JWT token
                const token = jwt.sign(
                    { id: results[0].ID, username: results[0].Username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                
                res.status(200).json({
                    success: true,
                    message: 'Đăng nhập thành công',
                    user: {
                        id: results[0].ID,
                        username: results[0].Username,
                        email: results[0].Email
                    },
                    token: token
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng'
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi trong quá trình đăng nhập',
            error: error.message
        });
    }
}

export { createAccount, loginAccount }