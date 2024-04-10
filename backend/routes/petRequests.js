const express = require('express')

const router = express.Router()


//get a single pet
router.get('/:id',(req,res)=>{
    res.json({msg:'get a single request'})
})

//post a new pet
router.post('/',(req,res)=>{
    res.json({msg:'post a new request'})
})

//delete a single pet
router.delete('/:id',(req,res)=>{
    res.json({msg:'delete a single request'})
})

//update a single pet
router.patch('/:id',(req,res)=>{
    res.json({msg:'update a single request'})
})

module.exports = router