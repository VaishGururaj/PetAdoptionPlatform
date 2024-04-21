const express = require('express')

const router = express.Router()


//search function
router.get('/',(req,res)=>{
    res.json()
})

//post a new pet
router.post('/',(req,res)=>{
    res.json({msg:'post a new feedback'})
})

//delete a single pet
router.delete('/:id',(req,res)=>{
    res.json({msg:'delete a single feedback'})
})

//update a single pet
router.patch('/:id',(req,res)=>{
    res.json({msg:'update a single feedback'})
})

module.exports = router