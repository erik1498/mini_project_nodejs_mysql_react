import express from "express"
import {
    loginUser,
    logoutUser,
    introspect
} from "../controller/Auth.js"

const router = express.Router()

router.get("/introspect", introspect)
router.post("/login", loginUser)
router.delete("/logout", logoutUser)

export default router;