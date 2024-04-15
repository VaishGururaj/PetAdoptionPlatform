const mongoose = require('mongoose');
const Owner = require('../models/owners');
const User = require('../models/users');
const Pets = require('../models/pets');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    owner_id: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    pet_id: { type: Schema.Types.ObjectId, ref: 'Pets', required: true },
},{timestamps:true});

module.exports = mongoose.model('Transactions', transactionSchema);
