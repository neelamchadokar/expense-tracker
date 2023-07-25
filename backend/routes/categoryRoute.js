const express = require('express');
const router = express.Router()
const Model = require('../model/model');
const Category = require('../model/category');
module.exports = router;

router.use(express.json());
router.use(express.urlencoded());
router.post('/addCategory',async(req,res)=>{
    const data =new Category({
        categoryName : req.body.categoryName,
        tag:req.body.tag
    })
    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})



router.get('/getCategories',async(req,res)=>{
    try{
        const data = await Category.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/deleteCategory',async(req,res)=>{
    try{
        const data = await Category.findByIdAndDelete(req.query.id)
        res.json('category deleted')
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})