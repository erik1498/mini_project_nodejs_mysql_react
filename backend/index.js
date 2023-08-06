import express from "express"
import cors from "cors"
import session from "express-session"


const app = express()

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

app.listen(process.env.APP_PORT, () => {
    console.log("Server Running")
})