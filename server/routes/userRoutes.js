import e from "express";
import { createAccount } from "../controllers/userController.js";
//router object
const router = e.Router()

//routes

//GET ALL PRODUCTS LIST
router.post("/sign-up", createAccount)

export default router