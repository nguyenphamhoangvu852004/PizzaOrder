import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mySqlPool from '../config/db.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Thay thế CLIENT_ID bằng giá trị của bạn

const salt = 10;

const authGoogleLogin = async (req, res) => {
    try {
        const googleToken = req.headers.authorization?.split(' ')[1];
        if (!googleToken) {
            return res.status(400).json({ success: false, message: "Không có token Google." });
        }

        // Xác thực token Google và lấy payload
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID, // Khớp với CLIENT_ID từ Google
        });

        const payload = ticket.getPayload(); // Lấy thông tin người dùng từ token
        console.log("Payload:", payload);

        // Thông tin người dùng
        const { sub: userId, email, name, picture, given_name, family_name } = payload;

        // Tạo username từ email (ví dụ: lấy phần trước @)
        const username = email.split('@')[0];

        // Tạo mật khẩu ngẫu nhiên
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomPassword, salt);

        // Kiểm tra xem người dùng đã tồn tại chưa
        const [users] = await mySqlPool.execute(
            'SELECT * FROM Accounts WHERE Email = ?',
            [email]
        );

        let accountId;

        if (users.length === 0) {
            // Người dùng chưa tồn tại, tạo mới
            const [result] = await mySqlPool.execute(
                'INSERT INTO Accounts (Username, Phone, Email, Password) VALUES (?, ?, ?, ?)',
                [username, '', email, hashedPassword]
            );
            accountId = result.insertId;
        } else {
            // Người dùng đã tồn tại
            accountId = users[0].AccountID;
        }

        // Tạo JWT token mới
        const token = jwt.sign({ id: accountId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            success: true,
            message: "Đăng nhập thành công",
            user: {
                id: accountId,
                username,
                email,
                name,
                picture,
                given_name,
                family_name
            },
            token
        });
    } catch (error) {
        console.error("Lỗi khi xác thực token Google:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

export { authGoogleLogin };
