import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const OwnerDashboard = ({ pets }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>My Pets</Typography>
            <Grid container spacing={3}>
                {pets.map(pet => (
                    <Grid item key={pet._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {pet.name}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    {pet.species} - {pet.breed}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {pet.description}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Adoption Fee: ${pet.adoption_fee}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Age: {pet.age}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" gutterBottom>My Pet Requests</Typography>
            {/* Display pet requests here */}
            <Typography variant="h4" gutterBottom>Requesting Users</Typography>
            {/* Display requesting users here */}
        </div>
    );
};

export default OwnerDashboard;
