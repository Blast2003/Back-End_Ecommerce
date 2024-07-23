const express = require('express')
const dotenv = require('dotenv')
const {default: mongoose} = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001


app.use(cors())

// use before route  => get the content of json file
app.use(bodyParser.json())

routes(app)

app.get('/', (req, res)=>{
    res.send('<h1>Hello world</h1>')
})

mongoose.connect(process.env.MONGO_DB)
    .then(() =>{
        console.log('Connect Database success!')
    })
    .catch((error)=>{
        console.log(error)
    })

app.listen(port, ()=>{
    console.log('Server is running in port: ', + port)
})
