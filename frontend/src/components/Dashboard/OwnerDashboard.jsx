import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddPetForm from "./AddPetForm";

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
        flexGrow: 1
    },
});

const OwnerDashboard = ({ userData }) => {
    const classes = useStyles();
    const [ownerPets, setOwnerPets] = useState(userData.ownerPets);

    const handleAddPet = (newPet) => {
        // Send a POST request to add the new pet to the server
        fetch(`http://localhost:4000/owner/:${userData[0].owner_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPet),
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the ownerPets state with the new pet added
                setOwnerPets([...ownerPets, data]);
            })
            .catch((error) => console.error('Error adding pet:', error));
    };

    const handleConfirmRequest = (requestId) => {
        // Send a POST request to confirm the pet request
        fetch(`http://localhost:4000/confirmRequest/${requestId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success
                    console.log('Pet request confirmed successfully');
                } else {
                    // Handle error
                    console.error('Error confirming pet request:', response.statusText);
                }
            })
            .catch((error) => console.error('Error confirming pet request:', error));
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Owner Dashboard</Typography>
            <AddPetForm onAdd={handleAddPet} />
            <div>
                <Typography variant="h4" gutterBottom>My Pets</Typography>
                <Grid container spacing={3}>
                    {/* Display owner's pets */}
                </Grid>
                <Typography variant="h4" gutterBottom>My Pet Requests</Typography>
                <Grid container spacing={3}>
                    {userData.map(data => (
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
                                    <Button onClick={() => handleConfirmRequest(request.petrequestid)} variant="contained" color="primary">Confirm</Button>
                                </Card>
                            </Grid>
                        ))
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default OwnerDashboard;
