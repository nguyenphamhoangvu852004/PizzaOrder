import e from "express";
import { createAccount, loginAccount, getUserInfo, getUserName, updateUser, updateAddress, getAddresss, removeAddress } from "../controllers/userController.js";
import { addToCart, getCart } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
//router object
const router = e.Router()

//routes

//GET ALL PRODUCTS LIST
router.post("/sign-up", createAccount)
router.post("/log-in", loginAccount)
router.get("/username/:id", verifyToken, getUserName)
router.get("/userInfo/:id", verifyToken, getUserInfo)
router.put("/updateUser/:id", verifyToken, updateUser)
router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCart);
router.put('/addAddress/:id', verifyToken, updateAddress);
router.get('/getAddress/:id', verifyToken, getAddresss)
router.put('/removeAddress/:id', verifyToken, removeAddress)


export default router