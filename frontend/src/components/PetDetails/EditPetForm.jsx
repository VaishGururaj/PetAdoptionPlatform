import React, { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { useParams } from "react-router-dom";

const EditPetForm = () => {
    const { id } = useParams();
    const [petData, setPetData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the pet data using the provided ID
        console.log("Pet ID:", id);
        fetch(`http://localhost:4000/pets/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error fetching pet data');
                }
            })
            .then((data) => {
                setPetData(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData({ ...petData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send a PATCH request to update the pet data
        fetch(`http://localhost:4000/pets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData),
        })
            .then((response) => {
                if (response.ok) {
                    //onUpdate(petData);
                    console.log('Pet updated successfully');
                } else {
                    console.error('Error updating pet:', response.statusText);
                }
            })
            .catch((error) => console.error('Error updating pet:', error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Edit Pet Details
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        value={petData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="species"
                        label="Species"
                        value={petData.species}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="breed"
                        label="Breed"
                        value={petData.breed}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={petData.description}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="adoption_fee"
                        label="Adoption Fee"
                        type="number"
                        value={petData.adoption_fee}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        name="age"
                        label="Age"
                        type="number"
                        value={petData.age}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Update Pet
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditPetForm;
