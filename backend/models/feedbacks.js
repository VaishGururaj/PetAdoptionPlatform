const mongoose = require('mongoose');
const User = require('../models/users');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    stars: { type: Number, required: true },
    description: { type: String },
    username: { type: String, ref: 'Login',required: true },
    password: { type: String, ref: 'Login',required: true },
});

module.exports = mongoose.model('Feedbacks', feedbackSchema);
