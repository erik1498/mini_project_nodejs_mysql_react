import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op, where } from "sequelize";

export const getAllProduct =  async (req, res) => {
    try {
        let productResponse;
        if (req.role == "admin") {
            productResponse = await Product.findAll({
                attributes:["uuid", "name", "price"],
                include:[{
                    model:User,
                    attributes:["name", "role"]
                }]
            })
        }else{
            productResponse = await Product.findAll({
                attributes:["uuid", "name", "price"],
                include:[{
                    model:User,
                    attributes:["name", "role"]
                }],
                where:{
                    userId:req.userId
                }
            })
        }
        res.status(200).json(productResponse)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if (!product) {
            return res.status(404).json({msg:"Data tidak ditemukan"})
        }
        let productResponse;
        if (req.role == "admin") {
            productResponse = await Product.findOne({
                attributes:["uuid", "name", "price"],
                where:{
                    id:product.id
                },
                include:[{
                    model:User,
                    attributes:["name", "role"]
                }]
            })
        }else{
            productResponse = await Product.findOne({
                attributes:["uuid", "name", "price"],
                include:[{
                    model:User,
                    attributes:["name", "role"]
                }],
                where:{
                    [Op.and]:[{
                        id:product.id,
                        userId:req.userId
                    }]
                }
            })
        }
        res.status(200).json(productResponse)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const createProduct = async (req, res) => {
    const { name, price } = req.body
    try {
        await Product.create({
            name:name,
            price:price,
            userId:req.userId
        })
        res.status(201).json({msg:"Product berhasil ditambahkan"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if (!product) {
            return res.status(404).json({msg:"Data tidak ditemukan"})
        }
        const { name, price } = req.body
        if (req.role == "admin") {
            await Product.update({name, price}, {
                where:{
                    id: product.id
                }
            })
        }else{
            if (req.userId != product.userId) {
                return res.status(403).json({msg:"Akses ditolak"})
            }
            await Product.update({name, price}, {
                where:{
                    [Op.and]:[{
                        id:product.id,
                        userId:req.userId
                    }]
                }
            })
        }
        res.status(200).json({msg:"Berhasil Update Product"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where:{
                uuid:req.params.id
            }
        })
        if (!product) {
            return res.status(404).json({msg:"Data tidak ditemukan"})
        }
        const { name, price } = req.body
        if (req.role == "admin") {
            await Product.destroy({
                where:{
                    id: product.id
                }
            })
        }else{
            if (req.userId != product.userId) {
                return res.status(403).json({msg:"Akses ditolak"})
            }
            await Product.destroy({
                where:{
                    [Op.and]:[{
                        id:product.id,
                        userId:req.userId
                    }]
                }
            })
        }
        res.status(200).json({msg:"Product berhasil dihapus"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}