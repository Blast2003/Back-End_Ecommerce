
const ProductService = require('../services/ProductService')

const createProduct = async (req, res) =>{
    try{
        const{name, image, type, price, countInStock, rating, description} = req.body

        //check registration
        if(!name|| !image || !type || !price|| !countInStock || !rating ){ 
            return res.status(200).json({
                status: "ERROR",
                msg: "The input is required"
            })
        }

        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 


const updateProduct = async (req, res) =>{
    try{
        const ProductId = req.params.id
        const data = req.body
        if(!ProductId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The ProductId is required"
            })
        }

        const response = await ProductService.updateProduct(ProductId, data)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const getDetailsProduct = async (req, res) =>{
    try{
        const ProductId = req.params.id        // create Beare in Headers of Postman
        if(!ProductId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The ProductId is required"
            })
        }

        const response = await ProductService.getDetailsProduct(ProductId)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
}

const getAllProduct = async (req, res) =>{
    try{
        const {limit, page, sort, filter} = req.query 
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const deleteProduct = async (req, res) =>{
    try{
        const ProductId = req.params.id
        if(!ProductId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The ProductId is required"
            })
        }

        const response = await ProductService.deleteProduct(ProductId)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
}


module.exports = {
    createProduct, updateProduct, getDetailsProduct, deleteProduct, getAllProduct
}