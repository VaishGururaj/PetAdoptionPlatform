const express = require('express')

const router = express.Router()


//get a single pet
router.get('/:id',(req,res)=>{
    res.json({msg:'get a single user'})
})

//post a new pet
router.post('/',(req,res)=>{
    res.json({msg:'post a new user'})
})

//delete a single pet
router.delete('/:id',(req,res)=>{
    res.json({msg:'delete a single user'})
})

//update a single pet
router.patch('/:id',(req,res)=>{
    res.json({msg:'update a single user'})
})

module.exports = router