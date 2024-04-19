import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, Container } from '@mui/material';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/pets/${id}`);
                if (response.ok) {
                    const petData = await response.json();
                    setPet(petData);
                } else {
                    console.error('Error fetching pet details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPetDetails();
    }, [id]);

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>
                <Typography variant="h4" gutterBottom style={{ color: '#041464' }}>Pet Details</Typography>
                {pet ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6"><strong>Name:</strong> {pet.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Species:</strong> {pet.species}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Gender:</strong> {pet.gender}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Description:</strong> {pet.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Adoption Fee:</strong> ${pet.adoption_fee}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Age:</strong> {pet.age}</Typography>
                        </Grid>
                        {pet.breedDetails && (
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom><strong>Breed Details</strong></Typography>
                                <Typography variant="body1"><strong>Name:</strong> {pet.breedDetails.name}</Typography>
                                <Typography variant="body1"><strong>Length:</strong> {pet.breedDetails.length}</Typography>
                                <Typography variant="body1"><strong>Origin:</strong> {pet.breedDetails.origin}</Typography>
                                <Typography variant="body1"><strong>Life Expectancy:</strong> {pet.breedDetails.min_life_expectancy} to {pet.breedDetails.max_life_expectancy} years</Typography>
                                <Typography variant="body1"><strong>Weight:</strong> {pet.breedDetails.min_weight} to {pet.breedDetails.max_weight} pounds</Typography>
                                <Typography variant="body1"><strong>Family Friendly:</strong> {pet.breedDetails.family_friendly}/5</Typography>
                                <Typography variant="body1"><strong>Shedding:</strong> {pet.breedDetails.shedding}/5</Typography>
                                <Typography variant="body1"><strong>General Health:</strong> {pet.breedDetails.general_health}/5</Typography>
                                <Typography variant="body1"><strong>Playfulness:</strong> {pet.breedDetails.playfulness}/5</Typography>
                                <Typography variant="body1"><strong>Children Friendly:</strong> {pet.breedDetails.children_friendly}/5</Typography>
                                <Typography variant="body1"><strong>Grooming:</strong> {pet.breedDetails.grooming}/5</Typography>
                                <Typography variant="body1"><strong>Intelligence:</strong> {pet.breedDetails.intelligence}/5</Typography>
                                <Typography variant="body1"><strong>Other Pets Friendly:</strong> {pet.breedDetails.other_pets_friendly}/5</Typography>
                            </Grid>
                        )}
                    </Grid>
                ) : (
                    <Typography variant="body1" style={{ color: '#777' }}>Loading...</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default PetDetails;
