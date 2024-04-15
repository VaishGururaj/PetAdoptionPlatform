const mongoose = require('mongoose');
const Owner = require('../models/owners');
const Pets = require('../models/pets');

const Schema = mongoose.Schema;

const petRequestSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pet_id: { type: Schema.Types.ObjectId, ref: 'Pets', required: true },
},{timestamps:true});

module.exports = mongoose.model('PetRequests', petRequestSchema);
