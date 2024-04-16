import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const UserDashboard = () => {
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

    return (
        <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>User Dashboard</Typography>
            <Typography variant="h5" gutterBottom>All Pets</Typography>
            <Grid container spacing={2}>
                {pets.map((pet) => (
                    <Grid item key={pet._id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">{pet.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{pet.species} - {pet.breed}</Typography>
                                <Typography variant="body1">{pet.description}</Typography>
                                <Typography variant="h6" color="primary">${pet.adoption_fee}</Typography>
                                <Typography variant="body2" color="textSecondary">Age: {pet.age}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserDashboard;
