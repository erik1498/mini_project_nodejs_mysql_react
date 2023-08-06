import express from "express"
import { getAllProduct, getProductById, createProduct, deleteProduct, updateProduct } from "../controller/Product.js";

const router = express.Router()

router.get("/products", getAllProduct)
router.get("/product/:id", getProductById)
router.post("/product", createProduct)
router.put("/product/:id", updateProduct)
router.delete("/product/:id", deleteProduct)


export default router;