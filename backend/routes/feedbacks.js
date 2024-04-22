const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Feedback = require('../models/feedbacks');
const Login = require('../models/login');

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Login.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Post a new feedback
router.post('/', authenticateUser, async (req, res) => {
    try {
        const feedbackData = req.body;
        const feedback = new Feedback(feedbackData);
        const savedFeedback = await feedback.save();
        res.json({ id: savedFeedback._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single feedback
router.get('/:id', authenticateUser, async (req, res) => {
    try {
        const id  = req.params.id.replace(':', '');
        const feedback = await Feedback.find({ _id: new mongoose.Types.ObjectId(id) });
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a single feedback
router.delete('/:id', authenticateUser, async (req, res) => {
    try {
        const id = req.params.id.replace(':', '');
        await Feedback.findByIdAndDelete(new mongoose.Types.ObjectId(id));
        res.json({ msg: 'Feedback deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a single feedback
router.patch('/:id', authenticateUser, async (req, res) => {
    try {
        const id = req.params.id.replace(':', '');
        const { stars, description } = req.body;
        const updatedFeedback = await Feedback.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { stars, description }, { new: true });
        if (!updatedFeedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json({ msg: 'Feedback updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
