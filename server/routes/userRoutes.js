import e from "express";
import { createAccount, loginAccount } from "../controllers/userController.js";
//router object
const router = e.Router()

//routes

//GET ALL PRODUCTS LIST
router.post("/sign-up", createAccount)
router.post("/log-in", loginAccount)

export default router