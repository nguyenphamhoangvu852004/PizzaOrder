import e from "express";
import { getProducts } from "../controllers/productController.js";


//router object
const router = e.Router()

//routes

//GET ALL PRODUCTS LIST
router.get("/getAllProduct", getProducts)

export default router