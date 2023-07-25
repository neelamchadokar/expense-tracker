const express = require('express');
const router = express.Router()
const Model = require('../model/model');
const Category = require('../model/category');
module.exports = router;

router.use(express.json());
router.use(express.urlencoded());

router.post('/addEvent',async(req,res)=>{
    const data = new Model({
        category:req.body.category,
        amount:req.body.amount,
        subCategory:req.body.subCategory,
        remarks:req.body.remarks,
        eventDate:req.body.eventDate
    })
    // const data = req.body;
    console.log('name :', data.category)
    console.log(data)
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})


// get api calls
router.get('/getAll',async(req,res)=>{
    try{
        const data = await Model.find();
        console.log(data.length)
        const result={
            count:data.length,
            events:data
        }
        res.json(result)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

router.get('/dateEvents',async(req,res)=>{
    console.log(req.query)
    try{
        const data = await Model.find(req.query)
        
        res.json(data)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})
router.get('/getDatePie',async(req,res)=>{

    console.log(req.query)
    try{
        const data = await Model.find(req.query)
        const cat = [...new Set(data.map(item=>item.category))]
        let result={}
        let label = []
        let series=[]
        cat.forEach(async(item,index)=>{
            const day = await Model.find({eventDate:req.query.eventDate,category:item})
            console.log(day)
            const total = day.reduce((acc,val)=>{
                acc = acc+val.amount
                return acc;
            },0)
            label.push(item)
            series.push(total)
            console.log(label,series,'ppp')
            // const data = {
            //     label: item,
            //     amount: total
            // }
            // result.push(data)
            console.log(data,index)
            if(series.length==cat.length){
                res.json({
                    labels:label,
                    series:series
                })
            }
        })
    }
    catch(err){

        res.status(400).json({message:error.message})
    }
})
router.get('/getEvents',async(req,res)=>{
    try{
        const all = await Model.find()
        let result=[]
        console.log(all,'addd')
        
        const dates =[...new Set(all.map(item=>item.eventDate))] 
        console.log(dates)
        dates.forEach(async(item,index)=>{
            const day = await Model.find({eventDate:item})
            const total = day.reduce((acc,val)=>{
                acc = acc+val.amount
                return acc;
            },0)
            const data = {
                date:item,
                amount:total,
                currency:'Rs'
            }
            result.push(data)
            console.log(data,index)
            if(result.length==dates.length){
                res.json({
                    count:dates.length,
                    events:result
                })
            }
        })
        
    }
    catch(err){
        res.status(400).json({message:err.message})
    }

})

// get conditional data

router.get('/getOne/:id',async(req,res)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})





router.patch('/update/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new:true};

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})






router.delete('/delete',async(req,res)=>{
    
    try{
        const data = await Model.findByIdAndDelete(req.query.id)
        console.log('okay')
        res.send(`Document deleted `)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})