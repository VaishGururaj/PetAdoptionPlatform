const express = require('express');
const router = express.Router();
const PetRequest = require('../models/petRequests');
const Pets = require('../models/pets');
const Transaction = require('../models/transactions');
const Owner = require('../models/owners');
const CatBreed = require('../models/catBreed');
const DogBreed = require('../models/dogBreed');
const mongoose = require('mongoose');


router.get('/adopted-gender', async (req, res) => {
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
          gender: 1,
          adopted: {
            $cond: { if: { $gt: [{ $size: '$transactions' }, 0] }, then: true, else: false }
          }
        }
      },
      {
        $group: {
          _id: { species: '$species', gender: '$gender' },
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
router.post('/search/:personid', async (req, res) => {
  const { name, species, requested, expectancy} = req.body;
  const owner_id = req.params.personid.replace(':', '');
  const pipeline = [];
  
  pipeline.push({ $match: { "owner_id": new mongoose.Types.ObjectId(owner_id) } });


  if (name || species) {
      console.log(name)
    const matchStage = {};
    if (name) matchStage.name = name;
    if (species) matchStage.species = species;
    console.log(species)

    pipeline.push({ $match: matchStage });
  }

  if (expectancy) {
    let expectancVal = parseInt(expectancy);
    console.log(expectancy)

    pipeline.push({
      $lookup: {
        from: 'catBreed',
        let: { breedName: '$breed' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$name', '$$breedName'] },
              min_life_expectancy: expectancVal
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
              min_expectancy: expectancVal
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
    pipeline.push({
      $project: {
        _id: 1,
        age: 1,
        name: 1,
        gender: 1,
        species: 1,
        description: 1,
        adoption_fee: 1,
        photo_image: 1,
      }
    });
  }

  if (requested && requested === 'WithRequests') {
    const petRequests = await PetRequest.find({}, 'pet_id');
    const petrequestids = petRequests.map(petRequest => petRequest.pet_id);
    pipeline.push({ $match: { _id: { $in: petrequestids } } });
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