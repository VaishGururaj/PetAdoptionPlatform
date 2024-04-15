const express = require('express')
const Pets = require('../models/pets')
const PetRequest = require('../models/petRequests');
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
            { $unwind: '$pet_requests' },
            { $unwind: '$requesting_users' },
            {
                $project: {
                    _id: 0,
                    petrequestid: '$pet_requests._id',
                    userid: '$requesting_users._id',
                    petid: '$_id',
                    petname: '$name',
                    username: '$requesting_users.username',
                    description: '$requesting_users.description',
                    contact_details: '$requesting_users.contact_details'
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


//if it comes to post adopt route, a new entry should be made in transaction collection with 
// petid, owner_id and user_id. The entry in petrequest collection corresponding to that petid an d
//userid must be deleted.
router.post('/accept', async (req, res) => {
    const { petrequestid } = req.body;
    try {
        const result = await PetRequest.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(petrequestid) } },
            {
                $project: {
                    _id: 0,
                    pet_id: 1,
                    user_id: 1
                }
            }
        ]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pet request not found' });
        }

        const { pet_id, user_id } = result[0];

        // Aggregate to find owner_id corresponding to pet_id
        const petResult = await Pet.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(pet_id) } }, // Match the pet_id
            {
                $project: {
                    _id: 0,
                    owner_id: 1
                }
            }
        ]);

        if (petResult.length === 0) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        
        const { owner_id } = petResult[0];

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

module.exports = router