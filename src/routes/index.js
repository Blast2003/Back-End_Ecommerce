const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");

const routes = (app) =>{
    app.use('/api/user', UserRouter)
    app.use('/api/Product', ProductRouter) 
}

module.exports =routes