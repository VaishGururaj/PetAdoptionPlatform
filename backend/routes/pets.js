const express = require('express')

const router = express.Router()

//get all pets
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get a single pet
router.get('/:id', async (req, res) => {
    const petId = req.params.id.replace(':', '');
    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router