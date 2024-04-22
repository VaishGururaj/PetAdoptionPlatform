const express = require('express');
const router = express.Router();
const PetRequest = require('../models/petRequests');
const Pets = require('../models/pets');
const Transaction = require('../models/transactions');
const Owner = require('../models/owners');
const CatBreed = require('../models/catBreed');
const DogBreed = require('../models/dogBreed');

router.get('/adopted-species', async (req, res) => {
    try {
      const speciesCount = await Transaction.aggregate([
        {
          $lookup: {
            from: 'pets',
            localField: 'pet_id',
            foreignField: '_id',
            as: 'pet'
          }
        },
        {
          $unwind: '$pet'
        },
        {
          $group: {
            _id: '$pet.species',
            count: { $sum: 1 }
          }
        }
      ]);
  
      // Convert the result to an object for easier access in React
      const speciesCountObj = {};
      speciesCount.forEach(species => {
        if (species._id) { // Check if _id is not null
          speciesCountObj[species._id] = species.count;
        }
      });
  
      res.json(speciesCountObj);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

router.get('/adoption-status', async (req, res) => {
    try {
      const adoptionStatus = await Transaction.aggregate([
        { $group: { _id: '$pet_id', count: { $sum: 1 } } }
      ]);
  
      const pets = await Pets.aggregate([
        {
          $lookup: {
            from: 'transactions',
            localField: '_id',
            foreignField: 'pet_id',
            as: 'transactions'
          }
        },
        {
          $project: {
            _id: 1,
            species: 1,
            adopted: {
              $cond: { if: { $gt: [{ $size: '$transactions' }, 0] }, then: true, else: false }
            }
          }
        },
        {
          $group: {
            _id: '$species',
            total: { $sum: 1 },
            adopted: { $sum: { $cond: ['$adopted', 1, 0] } },
            notAdopted: { $sum: { $cond: ['$adopted', 0, 1] } }
          }
        }
      ]);
  
      res.json(pets);
    } catch (error) {
      res.status(500).json({ message: error.message });
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