const express = require('express')
const CatBreed = require('../models/catBreeds');
const DogBreed = require('../models/dogBreeds');
const Pets = require('../models/pets');
const router = express.Router();
const mongoose = require('mongoose');


//get all pets
router.get('/', async (req, res) => {
    try {
        const pets = await Pets.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a single pet with breed details using aggregation
router.get('/:id', async (req, res) => {
    const petId = req.params.id.replace(':', '');
    try {
        const petAggregate = await Pets.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(petId) } },
            {
                $lookup: {
                    from: 'catBreed',
                    localField: 'breed',
                    foreignField: 'name',
                    as: 'catBreedDetails'
                }
            },
            {
                $lookup: {
                    from: 'dogBreed',
                    localField: 'breed',
                    foreignField: 'Name',
                    as: 'dogBreedDetails'
                }
            },
            {
                $project: {
                    _id: 1,
                    age: 1,
                    name: 1,
                    gender: 1,
                    species: 1,
                    description: 1,
                    adoption_fee: 1,
                    photo_image: 1,
                    breedDetails: {
                        $cond: {
                            if: { $eq: ["$species", "cat"] },
                            then: { $arrayElemAt: ["$catBreedDetails", 0] },
                            else: { $arrayElemAt: ["$dogBreedDetails", 0] }
                        }
                    }
                }
            }
        ]);

        if (!petAggregate || petAggregate.length === 0) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(petAggregate[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;