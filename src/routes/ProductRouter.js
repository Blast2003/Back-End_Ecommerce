const express = require('express') // import package
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const { authMiddleWare } = require('../middleware/authmiddleware')

router.post('/create-product', ProductController.createProduct)  //register
router.put('/update-product/:id', authMiddleWare, ProductController.updateProduct)  //update
router.get('/get-details/:id', ProductController.getDetailsProduct)    //get details
router.delete('/delete/:id', ProductController.deleteProduct)          //delete
router.get('/getAll', ProductController.getAllProduct)          //get all 

module.exports = router