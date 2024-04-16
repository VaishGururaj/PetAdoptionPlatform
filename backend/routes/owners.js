const express = require('express');
const Pets = require('../models/pets');
const PetRequest = require('../models/petRequests');
const Transaction = require('../models/transactions');
const router = express.Router();

// If it comes to post adopt route, a new entry should be made in transaction collection with 
// petid, owner_id and user_id. The entry in petrequest collection corresponding to that petid and
// userid must be deleted.
router.post('/accept', async (req, res) => {
    const { petrequestid } = req.body;
    try {
        const petRequest = await PetRequest.findById(petrequestid);
        if (!petRequest) {
            return res.status(404).json({ message: 'Pet request not found' });
        }

        const { pet_id, user_id } = petRequest;

        // Find the owner_id corresponding to pet_id
        const pet = await Pets.findById(pet_id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        const { owner_id } = pet;

        // Create a new entry in the Transaction collection
        const transaction = new Transaction({ pet_id, owner_id, user_id });
        await transaction.save();

        // Delete the pet request
        await PetRequest.findByIdAndDelete(petrequestid);

        res.status(200).json({ message: 'Transaction created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all listings with particular id from pets table and from petRequests table where that petid exists
router.get('/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId.replace(':', '');
    try {
        const result = await Pets.aggregate([
            { $match: { owner_id: ownerId } },
            {
                $lookup: {
                    from: 'petrequests',
                    localField: '_id',
                    foreignField: 'pet_id',
                    as: 'pet_requests'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'pet_requests.user_id',
                    foreignField: '_id',
                    as: 'requesting_users'
                }
            },
            {
                $addFields: {
                    role: 'owner',
                    owner_id: ownerId,
                    pet_requests: {
                        $map: {
                            input: "$pet_requests",
                            as: "request",
                            in: {
                                petrequestid: "$$request._id",
                                userid: "$$request.user_id",
                                petid: "$_id",
                                petname: "$name",
                                username: { $arrayElemAt: ["$requesting_users.username", 0] },
                                description: { $arrayElemAt: ["$requesting_users.description", 0] },
                                contact_details: { $arrayElemAt: ["$requesting_users.contact_details", 0] }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    requesting_users: 0
                }
            }
        ]);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Post a new pet
router.post('/:ownerId', async (req, res) => {
    const { age, name, gender, species, breed, description, adoption_fee, picture } = req.body;
    const owner_id = req.params.ownerId.replace(':', '');
    const role = 'owner';
    try {
        const pets = await Pets.create({ age, name, gender, species, breed, description, adoption_fee, picture, owner_id });
        const responsePets = { ...pets.toObject(), role, owner_id };
        res.status(200).json(responsePets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a single pet
router.delete('/:petid', async (req, res) => {
    const petId = req.params.petid.replace(':', '');
    const role = 'owner';
    try {
        await Pets.findByIdAndDelete(petId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a single pet
router.patch('/:petid', async (req, res) => {
    const petId = req.params.petid.replace(':', '');
    const updateFields = req.body;
    try {
        const updatedPet = await Pets.findByIdAndUpdate(petId, updateFields, { new: true });
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;