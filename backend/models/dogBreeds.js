const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dogBreedSchema = new Schema({
    description: { type: String },
    temperament: { type: String },
    popularity: { type: Number },
    min_height: { type: Number },
    max_height: { type: Number },
    min_weight: { type: Number },
    max_weight: { type: Number },
    min_expectancy: { type: Number },
    max_expectancy: { type: Number },
    group: { type: String },
    grooming_frequency_value: { type: Number },
    grooming_frequency_category: { type: String },
    shedding_value: { type: Number },
    shedding_category: { type: String },
    energy_level_value: { type: Number },
    energy_level_category: { type: String },
    trainability_value: { type: Number },
    trainability_category: { type: String },
    demeanor_value: { type: Number },
    demeanor_category: { type: String }
});

module.exports = mongoose.model('DogBreeds', dogBreedSchema);
