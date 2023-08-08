import express from "express"
import { getAllProduct, getProductById, createProduct, deleteProduct, updateProduct } from "../controller/Product.js";
import { verifyUser } from "../middleware/AuthUser.js"

const router = express.Router()

router.get("/product", verifyUser, getAllProduct)
router.get("/product/:id", verifyUser, getProductById)
router.post("/product", verifyUser, createProduct)
router.put("/product/:id", verifyUser, updateProduct)
router.delete("/product/:id", verifyUser, deleteProduct)


export default router;