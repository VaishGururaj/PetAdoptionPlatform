const express = require('express');
const router = express.Router();
const PetRequest = require('../models/petRequests');
const Pets = require('../models/pets');
const Owner = require('../models/owners');
const Transaction = require('../models/transactions');


//post a new pet request
router.post('/:userid', async (req, res) => {
    const userId = req.params.userid.replace(':', '');
    const { pet_id } = req.body;

    try {
        const newPetRequest = new PetRequest({ user_id: userId, pet_id });
        await newPetRequest.save();
        
        getPetRequestsByUserId(userId, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function getPetRequestsByUserId(userId, res) {
    const role = "user";
    try {
        // Retrieve active pet requests
        const petRequests = await PetRequest.find({ user_id: userId });
        const enrichedPetRequests = [];

        for (const petRequest of petRequests) {
            const pet = await Pets.findById(petRequest.pet_id);
            if (!pet) {
                continue;
            }

            const owner = await Owner.findById(pet.owner_id);
            if (!owner) {
                continue;
            }

            const enrichedPetRequest = {
                petrequestid: petRequest._id,
                userid: petRequest.user_id,
                petid: pet._id,
                petname: pet.name,
                petimage: pet.photo_image,
                ownername: owner.name,
                ownercontact: owner.contact_details,
            };
            enrichedPetRequests.push(enrichedPetRequest);
        }

        // Retrieve all adopted pets for the user
        const adoptedPets = await Transaction.find({ user_id: userId });
        const adoptedPetDetails = [];
        for (const transaction of adoptedPets) {
            const pet = await Pets.findById(transaction.pet_id);
            if (pet) {
                const owner = await Owner.findById(pet.owner_id);
                if (owner) {
                    adoptedPetDetails.push({
                        transactionid: transaction._id, // Use transaction ID as pet request ID for adopted pets
                        userid: userId,
                        petid: pet._id,
                        petname: pet.name,
                        petimage: pet.photo_image,
                        ownername: owner.name,
                        ownercontact: owner.contact_details,
                    });
                }
            }
        }

        res.status(200).json({ enrichedPetRequests, adoptedPetDetails, role, userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all entries from petRequests where userId matches 
router.get('/:userid', async (req, res) => {
    const userId = req.params.userid.replace(':', '');
    getPetRequestsByUserId(userId, res);
});


// Delete a single petRequest
router.delete('/', async (req, res) => {
    const userId = req.params.userid.replace(':', '');
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
