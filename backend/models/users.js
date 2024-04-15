const mongoose = require('mongoose');
const Login = require('../models/login');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    contact_details: { type: String, required: true },
    username: { type: Schema.Types.String, ref: 'Login', required: true, unique: true }
});

module.exports = mongoose.model('Users', userSchema);
