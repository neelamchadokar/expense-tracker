const express = require('express')
const mongoose = require ('mongoose')
const app = express();
const cors = require("cors");

const routes = require('./routes/routes');
const category = require('./routes/categoryRoute');


require('dotenv').config();
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error',(error)=>{
    console.log('database error',error)
})
database.once('connected',()=>{
    console.log('database connected');
})
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
    
app.use(allowCrossDomain);
    //some other code

app.use('/api',routes)
app.use('/api/c',category)
app.use(express.json());
app.use(cors);
// app.use(cors());
app.listen(3000,()=>{
console.log(`server started now at ${3000}`)
})