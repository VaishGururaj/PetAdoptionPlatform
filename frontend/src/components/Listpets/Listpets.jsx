import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PetDetails from "../PetDetails/PetDetails";

const Listpets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch all pets from the server
        const fetchPets = async () => {
            try {
                const response = await fetch('http://localhost:4000/pets');
                if (response.ok) {
                    const petsData = await response.json();
                    setPets(petsData);
                } else {
                    console.error('Error fetching pets:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, []);

    const handleAddPet = async (ownerId) => {
        try {
            // Send a POST request to add a pet request for the specific owner
            const response = await fetch(`http://localhost:4000/owner/${ownerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add any additional data needed for the request
                // For example, you can pass the pet details in the request body
                body: JSON.stringify({}),
            });
            if (response.ok) {
                // Handle success
                console.log('Pet request added successfully');
            } else {
                // Handle error
                console.error('Error adding pet request:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding pet request:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>User Dashboard</Typography>
                <Typography variant="h5" gutterBottom>All Pets</Typography>
                <Grid container spacing={2}>
                    {pets.map((pet) => (
                        <Grid item key={pet._id} xs={12} sm={6} md={4}>
                            <Link to={`/pets/:${pet._id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">{pet.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">{pet.species} - {pet.breed}</Typography>
                                        <Typography variant="body1">{pet.description}</Typography>
                                        <Typography variant="h6" color="primary">${pet.adoption_fee}</Typography>
                                        <Typography variant="body2" color="textSecondary">Age: {pet.age}</Typography>
                                    </CardContent>
                                    <Button onClick={() => handleAddPet(pet.owner_id)}>Add Pet</Button>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Listpets;
