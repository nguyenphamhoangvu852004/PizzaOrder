import e from "express";
import { authenticate } from "../controllers/authController.js";


//router object
const router = e.Router()

//routes

//GET ALL PRODUCTS LIST
router.get("/auth", authenticate)

export default router