import e from "express";
import { getCartFromID, createCart, addProductToCart } from '../controllers/cartController.js'
import { verifyToken } from '../middlewares/authMiddleware.js';
//router object
const router = e.Router()

//routes

router.get('/getCartFromID', verifyToken, getCartFromID);
router.post('/createCart', verifyToken, createCart);
router.post('/addProductToCart', verifyToken, addProductToCart);

export default router