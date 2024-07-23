const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

const generateAccessToken = async (payload) =>{
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

    return access_token
}


const generateRefreshToken = async (payload) =>{
    const refresh_token = jwt.sign({
        payload
    },process.env.REFRESH_TOKEN, {expiresIn: '365d'})

    return refresh_token
}

const refreshTokenJwtService = (refresh_token) =>{
    return new Promise((resolve, reject)=>{
        try{
            console.log("refresh_token", refresh_token)
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (error, user) =>{
                if(error){
                    resolve({
                        status: 'Error',
                        msg: "The authentication"
                    })
                }
                const { payload } = user
                const access_token = await generateAccessToken({
                    id: payload.id, 
                    isAdmin: payload.isAdmin
                })
                console.log("access token", access_token)
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token
                })

            })
            
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    generateAccessToken, 
    generateRefreshToken, 
    refreshTokenJwtService
}