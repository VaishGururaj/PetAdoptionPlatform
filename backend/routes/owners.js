const express = require('express');
const Pets = require('../models/pets');
const PetRequest = require('../models/petRequests');
const Transaction = require('../models/transactions');
const router = express.Router();
const mongoose = require('mongoose');


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
    const role = "owner";
    try {
        const result = await Pets.aggregate([
            { 
                $match: { owner_id: new mongoose.Types.ObjectId(ownerId) } 
            },
            {
                $lookup: {
                    from: 'petrequests',
                    let: { petId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$pet_id', '$$petId'] }
                            }
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'requesting_users'
                            }
                        },
                        {
                            $addFields: {
                                petrequestid: '$_id',
                                userid: '$user_id',
                                petid: '$pet_id',
                                petname: '$$REMOVE',
                                username: { $arrayElemAt: ['$requesting_users.name', 0] },
                                description: { $arrayElemAt: ['$requesting_users.description', 0] },
                                contact_details: { $arrayElemAt: ['$requesting_users.contact_details', 0] }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                petrequestid: 1,
                                userid: 1,
                                petid: 1,
                                petname: 1,
                                username: 1,
                                description: 1,
                                contact_details: 1
                            }
                        }
                    ],
                    as: 'pet_requests'
                }
            },
            {
                $project: {
                    pet_requests: 1,
                    age: 1,
                    name: 1,
                    gender: 1,
                    species: 1,
                    breed: 1,
                    description: 1,
                    adoption_fee: 1,
                    photo_image: 1,
                    role: 1,
                    owner_id: 1
                }
            }
        ]);
        res.status(200).json({result,role,ownerId});
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