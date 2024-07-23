// process many things which are relative to API
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken } = require("./JwtService")

const createUser = (newUSer) =>{
    return new Promise( async (resolve, reject)=>{
        const{ name, email, password, confirmPassword, phone } = newUSer
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){ // check if the email has been existed 
                resolve({
                    status: "Error",
                    message: "The email is already",
                })
            }
            const hash = bcrypt.hashSync(password, 10) // ma~ hoa'
            const createdUser = await User.create({   // carefully about var: createdUser
                name, 
                email, 
                password: hash, 
                phone,
            })
            if(createdUser){
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser
                })
            }
        }catch(e){
            reject(e);
        }
    })
}

const loginUser = (userLogin) =>{
    return new Promise( async (resolve, reject)=>{
        const{ email, password } = userLogin
        try{
            const checkUser = await User.findOne({ // checkUser = User logged in 
                email: email
            })
            if(checkUser === null){ // check if the email has been existed 
                resolve({
                    status: "Error",
                    message: "The user is not defined",
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword){
                resolve({
                    status: "Error",
                    message: "Password or user is incorrect",
                })
            }
            const access_token = await generateAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generateRefreshToken({ // when access token is expired => provide the new access_token
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token,
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const updateUser = (id, data) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id  // find user based on id
            })

            if(checkUser === null){
                resolve({
                    status: "Error",
                    mgs: "The user is not defined"
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const deleteUser = (id) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id  // find user based on id
            })

            if(checkUser === null){
                resolve({
                    status: "Error",
                    mgs: "The user is not defined"
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETE USER SUCCESS",
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const getAllUser = () =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const allUser = await User.find()
            resolve({
                status: "ok",
                message: "SUCCESS",
                data: allUser
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const getDetailUser = (id) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const user = await User.findOne({
                _id: id  // find user based on id
            })

            if(user === null){
                resolve({
                    status: "Error",
                    mgs: "The user is not defined"
                })
            }

            // await User.findById(id)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            })
            
        }catch(e){
            reject(e);
        }
    })
}



module.exports = {
    createUser, 
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}