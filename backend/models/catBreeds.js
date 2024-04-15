const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catBreedSchema = new Schema({
    name: { type: String, required: true },
    length: { type: Number },
    origin: { type: String },
    min_life_expectancy: { type: Number },
    max_life_expectancy: { type: Number },
    min_weight: { type: Number },
    max_weight: { type: Number },
    family_friendly: { type: Boolean },
    shedding: { type: Number },
    general_health: { type: Number },
    playfulness: { type: Number },
    children_friendly: { type: Boolean },
    grooming: { type: Number },
    intelligence: { type: Number },
    other_pets_friendly: { type: Boolean }
});

module.exports = mongoose.model('CatBreed', catBreedSchema);
