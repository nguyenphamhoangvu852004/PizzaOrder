// cartController.js
import mySqlPool from "../config/db.js";

const db = mySqlPool;

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Lấy từ middleware xác thực

    try {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const [existingItem] = await db.query(
            "SELECT * FROM Carts WHERE AccountID = ? AND ProductID = ?",
            [userId, productId]
        );

        if (existingItem.length > 0) {
            // Nếu đã có, cập nhật số lượng
            await db.query(
                "UPDATE Carts SET Quantity = Quantity + ? WHERE AccountID = ? AND ProductID = ?",
                [quantity, userId, productId]
            );
        } else {
            // Nếu chưa có, thêm mới vào giỏ hàng
            await db.query(
                "INSERT INTO Carts (AccountID, ProductID, Quantity) VALUES (?, ?, ?)",
                [userId, productId, quantity]
            );
        }

        res.status(200).json({ success: true, message: "Đã thêm sản phẩm vào giỏ hàng" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi khi thêm sản phẩm vào giỏ hàng" });
    }
};

export const getCart = async (req, res) => {
    const userId = req.userId;

    try {
        const [cartItems] = await db.query(
            "SELECT c.*, p.Name, p.Price FROM Carts c JOIN Products p ON c.ProductID = p.ProductID WHERE c.AccountID = ?",
            [userId]
        );

        res.status(200).json({ success: true, cart: cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi khi lấy thông tin giỏ hàng" });
    }
};
