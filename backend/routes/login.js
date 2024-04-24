const express = require('express');
const router = express.Router();
const Owner = require('../models/owners');
const User = require('../models/users');
const Login = require('../models/login');
const PetRequest = require('../models/petRequests');
const Pets = require('../models/pets');
const mongoose = require('mongoose');





router.post('/signup', async (req, res) => {
    try {
        const { role, username, password, ...userData } = req.body;
        let collectionToUpdate;

        // Determine which collection to update based on the role
        if (role === 'owner') {
            collectionToUpdate = Owner;
        } else if (role === 'user') {
            collectionToUpdate = User;
        } else {
            return res.status(400).json({ error: 'Invalid role specified' });
        }

        // Create a new document in the appropriate collection
        const newDocument = new collectionToUpdate(userData);
        newDocument.username = username; // Update the username
        await newDocument.save();

        // Create a new document in the Logins collection
        const newLogin = new Login({ username, password });
        await newLogin.save();

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//login a person
router.post('/', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Perform a lookup to find the corresponding user or owner based on the role
        const login = await Login.findOne({ username, password });
        if (!login) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        let redirectPath = '';

        if (role === 'owner') {
            // Look for the owner based on the username from the login
            const owner = await Owner.aggregate([
                {
                    $match: { username: login.username }
                },
                {$project: {_id: 1}
                }
            ]);
            if (owner.length === 0) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            redirectPath = `/owner/${owner[0]._id}`;
        } else if (role === 'user') {
            // Look for the user based on the username from the login
            const user = await User.aggregate([
                {
                    $match: { username: login.username }
                },
                {
                    $project: { _id: 1}
                }
            ]);
            if (user.length === 0) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            redirectPath = `/user/${user[0]._id}`;
        } else {
            return res.status(400).json({ error: 'Invalid role specified' });
        }
        // Redirect to the appropriate path
        res.redirect(redirectPath);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/', async (req, res) => {
    const { role, personId } = req.body;
    try {
        let deletePipeline = [];

        // Define the match stage based on the role
        let matchStage;
        let model;
        if (role === "owner") {
            matchStage = { $match: { "_id": new mongoose.Types.ObjectId(personId) } };
            model = Owner;
        } else if (role === "user") {
            matchStage = { $match: { "_id": new mongoose.Types.ObjectId(personId) } };
            model = User;
        } else {
            return res.status(400).json({ error: 'Invalid role specified' });
        }
        deletePipeline.push(matchStage);

        // Get the username from the matched document
        deletePipeline.push({ $lookup: { from: "logins", localField: "username", foreignField: "username", as: "login" } });
        deletePipeline.push({ $unwind: "$login" });
        deletePipeline.push({ $project: { "login.username": 1 } });

        let result = await model.aggregate(deletePipeline);
        console.log(result)
        let usernamesToDelete = result.map(doc => doc.login.username);
        console.log(usernamesToDelete)
        await Login.deleteMany({ username: { $in: usernamesToDelete } });
        await Promise.all([
            Login.deleteMany({ username: { $in: usernamesToDelete } }),
            Owner.deleteMany({ username: { $in: usernamesToDelete } }),
            Pets.deleteMany({ owner_id: personId }),
            User.deleteMany({ username: { $in: usernamesToDelete } }),
            PetRequest.deleteMany({ user_id: personId })
        ]);

        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.patch('/:personid', async (req, res) => {
    const personId = req.params.personid;
    const { role, ...userData } = req.body;
    let collectionToUpdate;

    // Determine which collection to update based on the role
    if (role === 'owner') {
        collectionToUpdate = Owner;
    } else if (role === 'user') {
        collectionToUpdate = User;
    } else {
        return res.status(400).json({ error: 'Invalid role specified' });
    }

    try {
        // Update the document in the appropriate collection
        const updatedUser = await collectionToUpdate.findOneAndUpdate({ user_id: personId }, userData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;