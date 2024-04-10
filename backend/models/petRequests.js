const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petRequestSchema = new Schema({
    user_id: { type: Number, required: true },
    pet_id: { type: Number, required: true}
},{timestamps:true});

module.exports = mongoose.model('petRequests', petRequestSchema);
