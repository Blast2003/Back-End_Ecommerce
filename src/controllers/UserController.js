const JwtService = require("../services/JwtService.js")
const UserService = require('../services/UserService.js')

const createUser = async (req, res) =>{
    try{
        const{name, email, password, confirmPassword, phone} = req.body
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isCheckEmail = reg.test(email)
        //check registration
        if(!name|| !email || !password || !confirmPassword|| !phone){ 
            return res.status(200).json({
                status: "ERROR",
                msg: "The input is required"
            })
        } else if(!isCheckEmail){
            return res.status(200).json({
                status: "ERROR",
                msg: "The input is email"
            })
        } else if(password !== confirmPassword){
            return res.status(200).json({
                status: "ERROR",
                msg: "The input is equal confirmPassword"
            })
        }

        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const loginUser = async (req, res) =>{
    try{
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }

        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const updateUser = async (req, res) =>{
    try{
        const userId = req.params.id // const {id, action} = req.params; => localhost:3000/user/:id/:action
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The userId is required"
            })
        }

        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const deleteUser = async (req, res) =>{
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The userId is required"
            })
        }

        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const getAllUser = async (req, res) =>{
    try{
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const getDetailUser = async (req, res) =>{
    try{
        const userId = req.params.id        // create Beare in Headers of Postman
        if(!userId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The userId is required"
            })
        }

        const response = await UserService.getDetailUser(userId)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

const refreshToken = async (req, res) =>{
    try{
        const refresh_token = req.headers.token.split(' ')[1]       // create Beare in Headers of Postman  (put the refresh token to headers  => verify refresh token => ))
        if(!refresh_token){
            return res.status(200).json({
                status: "ERROR",
                msg: "The refresh token is required"
            })
        }

        const response = await JwtService.refreshTokenJwtService(refresh_token)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

module.exports = {
    createUser, 
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser, 
    refreshToken
}