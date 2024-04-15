require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const petRoutes = require('./routes/pets');
const ownerRoutes = require('./routes/owners');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/users');
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
app.use('/pets',petRoutes);
app.use('/owner',ownerRoutes);
app.use('/login',loginRoutes);
app.use('/user',userRoutes);



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

