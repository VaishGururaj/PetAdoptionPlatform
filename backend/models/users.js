const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    contact_details: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

module.exports = mongoose.model('users', userSchema);
