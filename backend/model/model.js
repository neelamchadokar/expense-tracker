const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    eventDate:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
    },
    subCategory:{
        required:false,
        type:String
    },
    amount:{
        required:true,
        type:Number
    },
    remarks:{
        required:false,
        type:String
    }
})

module.exports = mongoose.model('Data', dataSchema)