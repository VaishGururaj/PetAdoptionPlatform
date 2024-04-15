const mongoose = require('mongoose');
const Owner = require('../models/owners');

const Schema = mongoose.Schema;

const petSchema = new Schema({
    age: { type: Number, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    species: { type: String, enum: ['cat', 'dog'], required: true },
    breed: { type: String, required: true },
    description: { type: String },
    owner_id: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    adoption_fee: { type: Number, required: true },
    photo_image: { type: String }
}, { timestamps: true });

// Define compound index for unique combination of name and owner_id
petSchema.index({ name: 1, owner_id: 1 }, { unique: true });

module.exports = mongoose.model('Pets', petSchema);
