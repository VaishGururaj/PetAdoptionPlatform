const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    owner_id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['individual', 'agency'], required: true },
    contact_details: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

module.exports = mongoose.model('owners', ownerSchema);
