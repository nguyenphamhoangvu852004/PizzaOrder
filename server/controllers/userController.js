import mySqlPool from "../config/db.js"

const db = mySqlPool

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

        // Thực hiện query để tạo tài khoản
        const [result] = await db.query(
            "INSERT INTO Accounts (Username, Phone, Email, Password) VALUES (?, ?, ?, ?)",
            [username, phone, email, password]
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

export { createAccount }