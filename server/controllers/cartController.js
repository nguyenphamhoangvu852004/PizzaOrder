// cartController.js
import mySqlPool from "../config/db.js";

const db = mySqlPool;

const addToCart = async (req, res) => {
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

const getCart = async (req, res) => {
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

const getCartFromID = async (req, res) => {
    const id = req.userId;
    try {
        const [carts] = await db.query(`SELECT 
            C.CartID, 
            C.DateOfOrder, 
            P.Name, 
            P.Price, 
            CI.Quantity,
            (P.Price * CI.Quantity) AS TotalAmount  -- Tính tổng tiền
        FROM 
            Carts C
        JOIN 
            CartItems CI ON C.CartID = CI.CartID
        JOIN 
            Products P ON CI.ProductID = P.ProductID
        WHERE 
            C.AccountID = ?;`, [id]); // Sử dụng id từ req.userId
        res.status(200).json({ success: true, carts: carts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `"Lỗi khi lấy thông tin giỏ hàng từ ${id}"` });
    }
};

const createCart = async (req, res) => {
    const id = req.userId;
    try {
        const [response] = await db.query(`INSERT INTO Carts (AccountID) VALUES (?);`, [id]);
        const cartId = response.insertId;  // Lấy ID của giỏ hàng mới tạo
        res.status(200).json({ success: true, cartId: cartId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Có lỗi xảy ra khi tạo Cart cho ${id}` });
    }
};

const addProductToCart = async (req, res) => {
    const { CartID, ProductID, Quantity } = req.body;
    try {
        // Kiểm tra CartID có tồn tại không
        const [cartExists] = await db.query('SELECT * FROM Carts WHERE CartID = ?', [CartID]);
        if (cartExists.length === 0) {
            return res.status(404).json({ success: false, message: 'Cart không tồn tại' });
        }

        // Kiểm tra ProductID có tồn tại không
        const [productExists] = await db.query('SELECT * FROM Products WHERE ProductID = ?', [ProductID]);
        if (productExists.length === 0) {
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
        }

        // Thêm sản phẩm vào giỏ hàng
        const [response] = await db.query(
            'INSERT INTO CartItems (CartID, ProductID, Quantity) VALUES (?, ?, ?)',
            [CartID, ProductID, Quantity]
        );

        res.status(200).json({ success: true, response: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng' });
    }
};

export { addToCart, getCart, getCartFromID, createCart, addProductToCart }