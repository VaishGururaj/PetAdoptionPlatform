const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    trans_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    owner_id: { type: Number, required: true },
    pet_id: { type: Number, required: true }
},{timestamps:true});

module.exports = mongoose.model('transactions', transactionSchema);
