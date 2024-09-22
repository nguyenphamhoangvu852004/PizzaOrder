import mySqlPool from "../config/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { OAuth2Client } from 'google-auth-library';
dotenv.config()
const db = mySqlPool
const salt = 10;


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
                    { id: results[0].AccountID, username: results[0].Username, password: results[0].Password },
                    process.env.JWT_SECRET,
                    { expiresIn: '1800s' }
                );

                res.status(200).json({
                    success: true,
                    message: 'Đăng nhập thành công',
                    user: {
                        id: results[0].AccountID,
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
const getUserName = async (req, res) => {
    const id = req.userId

    try {
        const [results] = await db.query('SELECT Username FROM Accounts WHERE AccountID = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy tài khoản với ID này' });
        }

        const username = results[0].Username;
        res.json({ username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
};

const getUserInfo = async (req, res) => {
    const id = req.userId

    try {
        const [results] = await db.query('SELECT * FROM Accounts WHERE AccountID = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy tài khoản với ID này' });
        }

        // const dataUserInfo = [results[0].Username, results[0].Email, results[0].Phone]

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
}

const updateUser = async (req, res) => {
    const id = req.userId
    const { Username, Phone, Email } = req.body;

    try {
        // Kiểm tra xem có dữ liệu được gửi để cập nhật không
        if (!Username && !Phone && !Email) {
            return res.status(400).json({
                success: false,
                message: 'Không có thông tin nào được cung cấp để cập nhật'
            });
        }

        // Tạo mảng chứa các trường cần cập nhật và giá trị tương ứng
        const updateFields = [];
        const values = [];

        if (Username) {
            updateFields.push('Username = ?');
            values.push(Username);
        }
        if (Phone) {
            updateFields.push('Phone = ?');
            values.push(Phone);
        }
        if (Email) {
            updateFields.push('Email = ?');
            values.push(Email);
        }

        // Thêm ID vào cuối mảng values
        values.push(id);

        // Tạo câu truy vấn SQL động
        const query = `UPDATE Accounts SET ${updateFields.join(', ')} WHERE AccountID = ?`;

        // Thực hiện truy vấn
        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tài khoản với ID này hoặc không có thay đổi nào được thực hiện'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin tài khoản thành công',
            updatedFields: updateFields.map(field => field.split(' = ')[0])
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi cập nhật thông tin người dùng',
            error: error.message
        });
    }
};

const updateAddress = async (req, res) => {
    const id = req.userId
    const { address } = req.body;

    try {
        // Thực hiện truy vấn cập nhật
        const [result] = await db.query(`UPDATE Accounts SET Address = ? WHERE AccountID = ?`, [address, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tài khoản với ID này hoặc không có thay đổi nào được thực hiện'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật địa chỉ tài khoản thành công'
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật địa chỉ người dùng:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi cập nhật địa chỉ người dùng',
            error: error.message
        });
    }
};

const getAddresss = async (req, res) => {
    const id = req.userId

    try {
        const [results] = await db.query('SELECT Address FROM Accounts WHERE AccountID = ?;', [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy địa chỉ với ID này' });
        }

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
}
const removeAddress = async (req, res) => {
    const id = req.userId

    try {
        const [results] = await db.query(`UPDATE Accounts SET Address = '' WHERE AccountID = ?;`, [id]);


        if (results.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy địa chỉ với ID này hoặc không có thay đổi nào được thực hiện'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Xóa địa chỉ thành công.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu' });
    }
}
export { createAccount, loginAccount, getUserName, getUserInfo, updateUser, updateAddress, getAddresss, removeAddress }