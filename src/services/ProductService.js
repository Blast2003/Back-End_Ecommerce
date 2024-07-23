// process many things which are relative to API
const Product = require("../models/ProductModel")


const createProduct = (newProduct) =>{
    return new Promise( async (resolve, reject)=>{
        const{name, image, type, price, countInStock, rating, description} = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){ // check if the email has been existed 
                resolve({
                    status: "Error",
                    message: "The name of product is already",
                })
            }

            const createdProduct = await Product.create({   // carefully about var: createdUser
                name, 
                image, 
                type, 
                price, 
                countInStock, 
                rating, 
                description
            })
            if(createdProduct){
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdProduct
                })
        }
        }catch(e){
            reject(e);
        }
    })
}


const updateProduct = (id, data) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id  // find user based on id
            })

            if(checkProduct === null){
                resolve({
                    status: "Error",
                    mgs: "The product is not defined"
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true}) //{new : true} => make auto refresh after updating
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProduct
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const getDetailsProduct = (id) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const product = await Product.findOne({
                _id: id  // find user based on id
            })

            if(product === null){
                resolve({
                    status: "Error",
                    mgs: "The product is not defined"
                })
            }

            // await User.findById(id)
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const getAllProduct = (limit , page, sort, filter) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const totalProduct = await Product.countDocuments()

            // filter
            if(filter){
                const label = filter[0]
                // find with appropriate letters
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] }   }).limit(limit).skip(page * limit)  
                resolve({
                    status: "ok",
                    message: "SUCCESS",
                    data: allObjectFilter,
                    total: totalProduct,
                    CurrentPage: Number(page + 1),
                    TotalPages: Math.ceil(totalProduct / limit)
                })
            }

            //sort
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: "ok",
                    message: "SUCCESS",
                    data: allProductSort,
                    total: totalProduct,
                    CurrentPage: Number(page + 1),
                    TotalPages: Math.ceil(totalProduct / limit)
                })
            }

            //get all
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: "ok",
                message: "SUCCESS",
                data: allProduct,
                total: totalProduct,
                CurrentPage: Number(page + 1),
                TotalPages: Math.ceil(totalProduct / limit)
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const deleteProduct = (id) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const checkProduct = await Product.findOne({
                _id: id  // find user based on id
            })

            if(checkProduct === null){
                resolve({
                    status: "Error",
                    mgs: "The product is not defined"
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "DELETE PRODUCT SUCCESS",
            })
            
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    createProduct, updateProduct, getDetailsProduct, deleteProduct, getAllProduct
   
}