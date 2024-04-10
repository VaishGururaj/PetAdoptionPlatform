const express = require('express')

const router = express.Router()

//get all pets
router.get('/',(req,res)=>{
    res.json({msg:'get all pets'})
})

//get a single pet
router.get('/:id',(req,res)=>{
    res.json({msg:'get a single pet'})
})

//post a new pet
router.post('/',(req,res)=>{
    res.json({msg:'post a new pet'})
})

//delete a single pet
router.delete('/:id',(req,res)=>{
    res.json({msg:'delete a single pet'})
})

//update a single pet
router.patch('/:id',(req,res)=>{
    res.json({msg:'update a single pet'})
})

module.exports = router