const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    id: { type: Number, required: true },
    stars: { type: Number, required: true },
    description: { type: String },
    emailid: { type: String, required: true}
});

module.exports = mongoose.model('feedbacks', feedbackSchema);
