import e from "express";
import { createAccount, loginAccount, getUserInfo, getUserName, updateUser, updateAddress, getAddresss, removeAddress } from "../controllers/userController.js";
import { addToCart, getCart } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authGoogleLogin } from '../controllers/AuthGoogleController.js'
//router object
const router = e.Router()

//routes

// Route login && Signup
router.post("/sign-up", createAccount)
router.post("/log-in", loginAccount)

// Route Login with Google
router.post("/authGoogle/log-in", authGoogleLogin);

// Route show username of the user logged in
router.get("/username", verifyToken, getUserName)

// Route show all infomation of the user logged in
router.get("/userInfo", verifyToken, getUserInfo)

// This Route allow user update their information
router.put("/updateUser", verifyToken, updateUser)

// This Route allow user add the product that user want into the shopping cart
router.post('/add', verifyToken, addToCart);

// This Route will query all the product of the user in shopping cart
router.get('/', verifyToken, getCart);

// This Route allow user add (modify) user's address
router.put('/addAddress', verifyToken, updateAddress);

// This Route will query address of the user
router.get('/getAddress', verifyToken, getAddresss)

// This Route allow user remove address out of database
router.put('/removeAddress', verifyToken, removeAddress)


export default router