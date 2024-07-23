const express = require('express')
const router = express.Router()
const userController = require("../controllers/UserController")
const {authMiddleWare, authUserMiddleWare} = require("../middleware/authmiddleware")

router.post('/sign-up', userController.createUser)  //register
router.post('/sign-in', userController.loginUser)   //login
router.put('/update-user/:id', userController.updateUser)   // update user based on specified 'id' (using PUT)
router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser) // delete user based on specified 'id' (using DELETE)
router.get('/getAll', authMiddleWare, userController.getAllUser)    // authMiddleWare => accept get all users if is Admin
router.get('/get-detail/:id', authUserMiddleWare, userController.getDetailUser)    // get one user
router.post('/refresh-token',  userController.refreshToken)      // if access token is expired => use this route to refresh 

module.exports = router