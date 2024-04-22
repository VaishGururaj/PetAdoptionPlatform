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
  console.log(shedding, gender, species, status)
  const query = {};

  if (gender) query.gender = gender;
  if (species) query.species = species;

  try {
      // Retrieve pets matching gender and species criteria
      let pets = await Pets.find(query);

      // If shedding value is provided, filter pets by shedding value
      if (shedding) {
        let sheddingValue=parseInt(shedding);
        
        if (species === 'cat'  || !species) {
            const catBreeds = await CatBreed.find({ shedding: sheddingValue });
            const catBreedIds = catBreeds.map(breed => breed.name);
            pets = pets.filter(pet => catBreedIds.includes(pet.breed));
        } else if (species === 'dog'  || !species) {
            const dogBreeds = await DogBreed.find({ shedding_value: sheddingValue });
            const dogBreedIds = dogBreeds.map(breed => breed.Name);
            pets = pets.filter(pet => dogBreedIds.includes(pet.breed));
        }
    }

      // If adoption status is provided, filter pets by adoption status
      if (status === 'adopted') {
          const adoptedPetIds = (await Transaction.find({}, 'pet_id')).map(transaction => transaction.pet_id);
          pets = pets.filter(pet => adoptedPetIds.includes(pet._id));
      } else if (status === 'not_adopted') {
          const adoptedPetIds = (await Transaction.find({}, 'pet_id')).map(transaction => transaction.pet_id);
          pets = pets.filter(pet => !adoptedPetIds.includes(pet._id));
      }

      res.json(pets);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;