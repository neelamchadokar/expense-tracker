const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    categoryName:{
        required:true,
        type:String
    },
    tag:{
        required:false,
        type:String
    }
})

module.exports = mongoose.model('Category',dataSchema)