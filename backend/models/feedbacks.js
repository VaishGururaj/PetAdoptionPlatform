const mongoose = require('mongoose');
const User = require('../models/users');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    stars: { type: Number, required: true },
    description: { type: String },
    username: { type: String, ref: 'User',required: true },
});

module.exports = mongoose.model('Feedbacks', feedbackSchema);
