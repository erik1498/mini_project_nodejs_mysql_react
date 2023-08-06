import express from "express"
import cors from "cors"
import session from "express-session"
import dotenv from "dotenv"
import UserRoute from "./app/routes/UserRoute.js"
import ProductRoute from "./app/routes/ProductRoute.js"
// import db from "./config/Database.js"

dotenv.config();

const app = express()

// await db.sync()

app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:"auto"
    }
}))

app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))

app.use(express.json());
app.use(UserRoute)
app.use(ProductRoute)

app.listen(process.env.APP_PORT, () => {
    console.log("Server Running")
})