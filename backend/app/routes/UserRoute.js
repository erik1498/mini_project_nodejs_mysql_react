import express from "express"
import { getAllUser, getUserById, createUser, deleteUser, updateUser } from "../controller/User.js";

const router = express.Router()

router.get("/users", getAllUser)
router.get("/users/:id", getUserById)
router.post("/users", createUser)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)


export default router;