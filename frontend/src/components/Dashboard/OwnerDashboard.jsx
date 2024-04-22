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
        fetch(`http://localhost:4000/owner/accept/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({petrequestid : requestId }),
        })
            .then((response) => {
                if (response.ok) {
                    // Fetch the updated list of pets after successful deletion
                    //console.log("After deleting: ", ownerPets);
                    return fetch(`http://localhost:4000/owner/:${ownerPets.ownerId}`);
                } else {
                    throw new Error('Error deleting pet');
                }
            })
            .then((response) => {
                if (response.ok) {
                    // Parse the response data
                    return response.json();
                } else {
                    throw new Error('Error fetching updated pet list');
                }
            })
            .then((data) => {
                // Update the state with the new list of pets
                setOwnerPets(data);
            })
            .catch((error) => console.error('Error:', error));
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
    const handleDeletePet = (petId) => {
        // Send a DELETE request to delete the specific pet
        fetch(`http://localhost:4000/owner/:${petId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // Fetch the updated list of pets after successful deletion
                    //console.log("After deleting: ", ownerPets);
                    return fetch(`http://localhost:4000/owner/:${ownerPets.ownerId}`);
                } else {
                    throw new Error('Error deleting pet');
                }
            })
            .then((response) => {
                if (response.ok) {
                    // Parse the response data
                    return response.json();
                } else {
                    throw new Error('Error fetching updated pet list');
                }
            })
            .then((data) => {
                // Update the state with the new list of pets
                setOwnerPets(data);
                console.log('Pet deleted successfully');
            })
            .catch((error) => console.error('Error:', error));
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
                    {ownerPets && ownerPets.result && ownerPets.result.map((pet) => (
                        <Grid item key={pet._id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Link to={`/pets/:${pet._id}`} style={{ textDecoration: 'none' }}>
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
                                        </Link>
                                    </CardContent>
                                    <Link to={`/edit-pet/${pet._id}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary">Edit</Button>
                                    </Link>
                                    <Button onClick={() => handleDeletePet(pet._id)} variant="contained" color="error">Delete</Button>
                                </Card>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h4" gutterBottom>My Pet Requests</Typography>
                <Grid container spacing={3}>
                    {ownerPets.result.map((data) => (
                        data.pet_requests && data.pet_requests.map((request) => (
                            <Grid item key={request.petrequestid} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            Request for the pet : {data.name}
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
