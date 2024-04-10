const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petSchema = new Schema({
    id: { type: Number, required: true },
    age: { type: Number, required: true },
    name: { type: String, required: true },
    species: { type: String, enum: ['cat', 'dog'], required: true },
    breed: { type: String, required: true },
    description: { type: String },
    owner_id: { type: Number, required: true },
    adoption_fee: { type: Number, required: true },
    photo_image: { type: String }
},{timestamps:true});

module.exports = mongoose.model('pets', petSchema);
