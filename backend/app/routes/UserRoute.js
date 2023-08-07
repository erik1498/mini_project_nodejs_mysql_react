import express from "express"
import { getAllUser, getUserById, createUser, deleteUser, updateUser } from "../controller/User.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router()

router.get("/users", verifyUser, adminOnly, getAllUser)
router.get("/users/:id", verifyUser, adminOnly, getUserById)
router.post("/users", verifyUser, adminOnly, createUser)
router.put("/users/:id", verifyUser, adminOnly, updateUser)
router.delete("/users/:id", verifyUser, adminOnly, deleteUser)


export default router;