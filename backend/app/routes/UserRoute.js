import express from "express"
import { getAllUser, getUserById, createUser, deleteUser, updateUser } from "../controller/User.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router()

router.get("/user", verifyUser, adminOnly, getAllUser)
router.get("/user/:id", verifyUser, adminOnly, getUserById)
router.post("/user", verifyUser, adminOnly, createUser)
router.put("/user/:id", verifyUser, adminOnly, updateUser)
router.delete("/user/:id", verifyUser, adminOnly, deleteUser)


export default router;