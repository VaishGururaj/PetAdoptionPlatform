const express = require('express');
const router = express.Router();
const Owner = require('../models/owners');
const User = require('../models/users');
const Login = require('../models/login');

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

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const login = await Login.findOne({ username, password });

        if (!login) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (role === 'owner') {
            const owner = await Owner.findOne({ username: login.username });
            if (!owner) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            res.redirect(`/owner/${owner._id}`);
        } else if (role === 'user') {
            const user = await User.findOne({ username: login.username });
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            res.redirect(`/user/${user._id}`);
        } else {
            res.status(400).json({ error: 'Invalid role specified' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:personid', async (req, res) => {
    const personId = req.params.personid;
    try {
        // Delete from the Logins collection
        await Login.findOneAndDelete({ username: personId });

        // Delete from the appropriate collection based on the role
        if (personId.startsWith('owner')) {
            await Owner.findOneAndDelete({ owner_id: personId });
            await Pets.deleteMany({ owner_id: personId });
        } else if (personId.startsWith('user')) {
            await User.findOneAndDelete({ user_id: personId });
        } else {
            return res.status(400).json({ error: 'Invalid person ID' });
        }

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