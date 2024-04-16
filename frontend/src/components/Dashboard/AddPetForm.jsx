import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const AddPetForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [adoptionFee, setAdoptionFee] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new pet object with the form data
        const newPet = {
            name,
            species,
            breed,
            description,
            adoption_fee: adoptionFee,
        };

        // Call the onAdd function passed from the parent component
        onAdd(newPet);

        // Clear the form fields after submission
        setName('');
        setSpecies('');
        setBreed('');
        setDescription('');
        setAdoptionFee('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>Add Pet</Typography>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Species</InputLabel>
                <Select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    label="Species"
                >
                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                </Select>
            </FormControl>
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
                margin="normal"
                multiline
                rows={4}
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
