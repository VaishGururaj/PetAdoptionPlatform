const mongoose = require('mongoose');
const Login = require('../models/login');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['individual', 'agency'], required: true },
    contact_details: { type: String, required: true },
    username: { type: Schema.Types.String, ref: 'Login', required: true, unique: true }
});

module.exports = mongoose.model('Owners', ownerSchema);
