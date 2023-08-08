import argon2 from "argon2"
import User from "../models/UserModel.js"

export const loginUser = async (req, res) => {
    const user = await User.findOne({
        where:{
            email: req.body.email
        }
    })
    if (!user) {
        return res.status(401).json({msg:"Username atau password salah"})
    }

    const match = await argon2.verify(user.password, req.body.password)
    if (!match) {
        return res.status(401).json({msg:"Username atau password salah"})
    }
    
    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    const email = user.email
    const role = user.role
    res.status(200).json({uuid, name, email, role})
}

export const introspect = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({msg:"Mohon login ke akun anda"})
    }
    const user = await User.findOne({
        attributes:[
            "uuid", "name", "email", "role"
        ],
        where:{
            uuid: req.session.userId
        }
    })
    if (!user) res.status(401).json({msg:"Username atau password salah"})
    res.status(200).json(user)
}

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.status(400).json({msg:"logout gagal"})
        res.status(200).json({msg:"Berhasil logout"})
    })
}