require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const petRoutes = require('./routes/pets');
const ownerRoutes = require('./routes/owners');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/users');
const visualRoutes = require('./routes/visual');
const feedbackRoutes = require('./routes/feedbacks');


const cors = require('cors');

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

//routes
app.use('/pets',petRoutes); // get all pets, one pet
app.use('/owner',ownerRoutes); // post, update, delete a single pet
app.use('/login',loginRoutes); // signup, login, update user, delete user
app.use('/user',userRoutes); //get all pet requests, post pet request, delete pet request
app.use('/visual',visualRoutes); // get species count and adoption status
app.use('/feedback',feedbackRoutes); //feedbacks



//connect to db
mongoose.connect(MONGO_URI)

.then(()=>{
    //listen for request
    app.listen(PORT, ()=>{
    console.log("Connected to db and Listening on port 4000!");
    })
})
.catch((error)=>{
    console.log(error)
})

