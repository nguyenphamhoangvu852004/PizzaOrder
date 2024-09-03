import e from "express";
import { getCartFromID, createCart,addProductToCart } from '../controllers/cartController.js'
import { verifyToken } from '../middlewares/authMiddleware.js';
//router object
const router = e.Router()

//routes

router.get('/getCartFromID/:id', verifyToken, getCartFromID);
router.post('/createCart/:id', verifyToken, createCart);
router.post('/addProductToCart/:id', verifyToken, addProductToCart);

export default router