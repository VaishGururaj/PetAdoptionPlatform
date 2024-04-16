// OwnerDashboard.jsx
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: 'none',
    },
    cardContent: {
        flexGrow: 1,
    },
});

const OwnerDashboard = ({ userData }) => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h4" gutterBottom>My Pets</Typography>
            <Grid container spacing={3}>
                {userData.map(pet => (
                    <Grid item key={pet._id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {pet.name}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    {pet.species} - {pet.breed}
                                </Typography>
                                <Typography variant="body2" component="p" gutterBottom>
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
            <Grid container spacing={3}>
                {userData.map(data => (
                    // Map over each object in the userData array
                    data.pet_requests.map(request => (
                    <Grid item key={request.petrequestid} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Request for {request.petname}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Requester: {request.username}
                                </Typography>
                                <Typography variant="body2" component="p" gutterBottom>
                                    Description: {request.description}
                                </Typography>
                                <Typography color="text.secondary" gutterBottom>
                                    Contact Details: {request.contact_details}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                ))}
            </Grid>
        </div>
    );
};

export default OwnerDashboard;
