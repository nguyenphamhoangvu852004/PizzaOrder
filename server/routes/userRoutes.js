import e from "express";
import { createAccount, loginAccount, getUserInfo, getUserName, updateUser, updateAddress, getAddresss, removeAddress } from "../controllers/userController.js";
import { addToCart, getCart } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authGoogleLogin } from '../controllers/AuthGoogleController.js'
//router object
const router = e.Router()

//routes

//GET ALL PRODUCTS LIST
router.post("/sign-up", createAccount)
router.post("/log-in", loginAccount)
router.post("/authGoogle/log-in", authGoogleLogin);

router.get("/username", verifyToken, getUserName)
router.get("/userInfo", verifyToken, getUserInfo)
router.put("/updateUser", verifyToken, updateUser)
router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCart);
router.put('/addAddress', verifyToken, updateAddress);
router.get('/getAddress', verifyToken, getAddresss)
router.put('/removeAddress', verifyToken, removeAddress)


export default router