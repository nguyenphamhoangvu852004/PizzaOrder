import e from "express";
import { createAccount, loginAccount, getUserInfo, getUserName } from "../controllers/userController.js";
import { addToCart, getCart } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
//router object
const router = e.Router()

//routes

//GET ALL PRODUCTS LIST
router.post("/sign-up", createAccount)
router.post("/log-in", loginAccount)
router.get("/username/:id", getUserName)

router.get("/userInfo/:id", getUserInfo)

router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCart);


export default router