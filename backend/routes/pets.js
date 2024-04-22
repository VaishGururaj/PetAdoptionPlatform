const express = require('express')
const catBreed = require('../models/catBreed');
const dogBreed = require('../models/dogBreed');
const Pets = require('../models/pets');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/transactions');


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


// Search function
router.post('/search', async (req, res) => {
    const { shedding, gender, species, status } = req.body;
  
    const pipeline = [];
  
    if (gender || species) {
      const matchStage = {};
      if (gender) matchStage.gender = gender;
      if (species) matchStage.species = species;
      pipeline.push({ $match: matchStage });
    }
  
    if (shedding) {
      let sheddingValue = parseInt(shedding);
  
      pipeline.push({
        $lookup: {
          from: 'catBreed',
          let: { breedName: '$breed' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$name', '$$breedName'] },
                shedding: sheddingValue
              }
            }
          ],
          as: 'matchedCatBreeds'
        }
      });
  
      pipeline.push({
        $lookup: {
          from: 'dogBreed',
          let: { breedName: '$breed' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$Name', '$$breedName'] },
                shedding_value: sheddingValue
              }
            }
          ],
          as: 'matchedDogBreeds'
        }
      });
  
      pipeline.push({
        $addFields: {
          matchedBreeds: { $concatArrays: ['$matchedCatBreeds', '$matchedDogBreeds'] }
        }
      });
  
      pipeline.push({
        $match: {
          matchedBreeds: { $ne: [] } // Filter out documents without matched breeds
        }
      });
    }
  
  
  
    if (status) {
      const adoptedPetIds = (await Transaction.find({}, 'pet_id')).map(transaction => transaction.pet_id);
      if (status === 'adopted') {
        pipeline.push({ $match: { _id: { $in: adoptedPetIds } } });
      } else {
        pipeline.push({ $match: { _id: { $nin: adoptedPetIds } } });
      }
    }
  
    try {
      // Execute the aggregation pipeline
      const pets = await Pets.aggregate(pipeline);
      res.json(pets);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  

module.exports = router;