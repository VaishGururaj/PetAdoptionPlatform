const express = require('express');
const router = express.Router();
const PetRequest = require('../models/petRequest');

// Get all entries from petRequests where userId matches 
router.get('/:userid', async (req, res) => {
    const userId = req.params.userid;

    try {
        const petRequests = await PetRequest.find({ user_id: userId });
        res.status(200).json(petRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Post a new petRequest by getting ownerid from pets table with that petid
router.post('/:userid', async (req, res) => {
    const userId = req.params.userid;
    const { pet_id } = req.body;

    try {
        // Assuming you have a function to fetch owner_id from pets table based on pet_id
        const owner_id = await getOwnerIdFromPet(pet_id);

        // Create a new petRequest
        const newPetRequest = new PetRequest({ user_id: userId, pet_id, owner_id });
        await newPetRequest.save();

        res.status(201).json({ message: 'Pet request created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a single petRequest
router.delete('/:userid', async (req, res) => {
    const userId = req.params.userid;
    const { pet_id } = req.body;

    try {
        // Delete the pet request
        await PetRequest.deleteOne({ user_id: userId, pet_id });

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
