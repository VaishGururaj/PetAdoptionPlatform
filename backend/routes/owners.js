const express = require('express')
const Pets = require('../models/pets')
const router = express.Router()


//get all listings with particular id from pets table and from petRequests table where that petid exists
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
                    owner_id: ownerId
                }
            }
        ]);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//post a new pet
router.post('/:ownerId',async (req,res)=>{
    const {age, name, gender, species, breed, description, adoption_fee, picture} = req.body
    const owner_id = req.params.ownerId.replace(':', '');
    const role = 'owner';
  try {
    const pets = await Pets.create({ age, name, gender, species, breed, description, adoption_fee, picture, owner_id });
    const responsePets = { ...pets.toObject(), role, owner_id };
    res.status(200).json(responsePets);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

//delete a single pet
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


//update a single pet
router.patch('/:petid', async (req, res) => {
    const petId = req.params.petid.replace(':', '');;
    const updateFields = req.body;
    try {
        const updatedPet = await Pets.findByIdAndUpdate(petId, updateFields, { new: true });
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router