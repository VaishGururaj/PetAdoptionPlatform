import React, {useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import AddPetForm from "./AddPetForm";
import {Link, useNavigate} from "react-router-dom";

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
    //console.log(userData)
    const classes = useStyles();
    const [ownerPets, setOwnerPets] = useState(userData || []);

    const navigate = useNavigate();


    const handleAddPet = (newPet) => {
        // Send a POST request to add the new pet to the server
        fetch(`http://localhost:4000/owner/:${ownerPets?.[0]?.owner_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPet),
        })
            .then((response) => response.json())
            .then((data) => {
                setOwnerPets((prevOwnerPets) => {
                    return [...prevOwnerPets, data];
                });
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
                    console.log('Pet request confirmed successfully');
                } else {
                    console.error('Error confirming pet request:', response.statusText);
                }
            })
            .catch((error) => console.error('Error confirming pet request:', error));
    };

    const handleDeleteProfile = () => {
        // Send a DELETE request to delete the profile
        const requestBody = {
            role: userData?.[0]?.role,
            username: userData?.[0]?.username,
            owner_id: userData?.[0]?.owner_id
        };

        fetch('http://localhost:4000/login/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Profile deleted successfully');
                } else {
                    console.error('Error deleting profile:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting profile:', error));

        navigate('/login');
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Owner Dashboard</Typography>
            <AddPetForm onAdd={handleAddPet} />
            <Button onClick={handleDeleteProfile} variant="contained" color="error">Delete Profile</Button>
            <div>
                <Typography variant="h4" gutterBottom>My Pets</Typography>
                <Grid container spacing={3}>
                    {ownerPets && ownerPets.map((pet) => (
                        <Grid item key={pet._id} xs={12} sm={6} md={4}>
                            <Link to={`/pets/:${pet._id}`} style={{ textDecoration: 'none' }}>
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
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h4" gutterBottom>My Pet Requests</Typography>
                <Grid container spacing={3}>
                    {ownerPets.map((data) => (
                        data.pet_requests && data.pet_requests.map((request) => (
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
