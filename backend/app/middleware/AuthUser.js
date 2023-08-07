import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if (req.session.userId) {
        const user = await User.findOne({
            where:{
                uuid: req.session.userId
            }
        })
        if (!user) res.status(401).json({msg:"Akun Tidak Ditemukan"})
        req.userId = user.id
        req.role = user.role
        next()
    }else{
        res.status(401).json({msg:"Mohon login ke akun anda"})
    }
}

export const adminOnly = async (req, res, next) => {
    const user = await User.findOne({
        where:{
            uuid: req.session.userId
        }
    })
    if (!user) res.status(401).json({msg:"Akun Tidak Ditemukan"});
    if (user.role != "admin") {
        res.status(403).json({msg:"Akses ditolak"})
    }else{
        next()
    }
}