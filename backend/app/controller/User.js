import argon2 from "argon2";
import User from "../models/UserModel.js";
import { where } from "sequelize";

export const getAllUser = async (req, res) => {
    try{
        const response = await User.findAll({
            attributes:['uuid', 'name', 'email', 'role']
        });
        res.status(200).json({
            msg: "Request Success",
            data: response
        })
    }catch(error){
        res.status(500).json({
            msg: error.message
        })
    }
}

export const getUserById = async (req, res) => {
    try{
        const response = await User.findOne({
            where:{
                uuid:req.params.id
            }
        });
        res.status(200).json({
            msg: "Request Success",
            data: response
        })
    }catch(error){
        res.status(500).json({
            msg: error.message
        })
    }
}

export const createUser = async (req, res) => {
    const {name, email, password, confirmPassword, role} = req.body
    if (password !== confirmPassword) {
        res.status(400).json({msg:"Password dan Confirm Password tidak sama"})
    }
    const hashPassword = await argon2.hash(password)
    try {
        await User.create({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        })
        res.status(200).json({msg:"Registrasi Sukses"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where:{
            uuid: req.params.id
        }
    })
    if (!user) res.status(400).json({msg:"User Tidak Ditemukan"})
    const {name, email, password, confirmPassword, role} = req.body;
    if (password !== confirmPassword) {
        res.status(400).json({msg:"Password dan Confirm Password tidak sama"})
    }
    let hashPassword;
    if (password != "" || password != null) {
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password)
    }
    try {
        await User.update({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        }, {
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg:"Berhasil Update User"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where:{
                uuid: req.params.id
            }
        })
        if (!user) res.status(400).json({msg:"User Tidak Ditemukan"})
        await User.destroy({
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg: "User Berhasil DiHapus"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}