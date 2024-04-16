import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const AddPetForm = ({ onAdd }) => {
    const [petName, setPetName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [adoptionFee, setAdoptionFee] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new pet object with the form data
        const newPet = {
            name: petName,
            species,
            breed,
            description,
            adoption_fee: adoptionFee,
        };
        // Pass the new pet object to the onAdd function
        onAdd(newPet);
        // Reset the form fields
        setPetName('');
        setSpecies('');
        setBreed('');
        setDescription('');
        setAdoptionFee('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>Add a New Pet</Typography>
            <TextField
                label="Pet Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
            />
            <TextField
                label="Species"
                variant="outlined"
                fullWidth
                margin="normal"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
            />
            <TextField
                label="Breed"
                variant="outlined"
                fullWidth
                margin="normal"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                label="Adoption Fee"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={adoptionFee}
                onChange={(e) => setAdoptionFee(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Pet
            </Button>
        </form>
    );
};

export default AddPetForm;
