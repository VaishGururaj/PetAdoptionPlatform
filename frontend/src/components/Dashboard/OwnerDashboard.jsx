import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, FormControl, Grid, MenuItem, Select, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import AddPetForm from "./AddPetForm";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

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

export let [ownerPets, setOwnerPets] = []

const OwnerDashboard = ({ userData }) => {
    //console.log(userData)
    const classes = useStyles();
    [ownerPets, setOwnerPets] = useState(userData || []);
    const [name, setName] = useState('');
    const [lifeExpectancy, setLifeExpectancy] = useState('');
    const [species, setSpecies] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);


    useEffect(() => {
        // Fetch owner pets when component mounts or params
        //console.log("useEffect triggered with ownerId:", ownerPets.ownerId);
        if (ownerPets.ownerId) {
            fetchOwnerPets(ownerPets.ownerId);
        }
    }, ); // Only listen to changes in params.ownerId

    const fetchOwnerPets = (ownerId) => {
        fetch(`http://localhost:4000/owner/:${ownerId}`)
            .then(response => response.json())
            .then(data => setOwnerPets(data))
            .catch(error => console.error('Error fetching owner pets:', error));
    };

    const handleAddPet = (newPet) => {
        // Send a POST request to add the new pet to the server
        fetch(`http://localhost:4000/owner/:${ownerPets.ownerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPet),
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
        console.log(ownerPets)
        const requestBody = {
            role: ownerPets.role,
            personId: ownerPets.ownerId
        };

        fetch(`http://localhost:4000/login`, {
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

    const handleSearch = async () => {
        try {
            // Construct the URL with the search filters
            let url = `http://localhost:4000/visual/search/:${ownerPets.ownerId}`;
            const searchData = { name, lifeExpectancy, species, status };

            // Send a POST request with search filters
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData),
            });

            if (response.ok) {
                // Get the response data
                const searchData = await response.json();
                console.log('Search data:', searchData);

                // Update the pets list with the filtered data
                setPets(searchData);
            } else {
                // Handle error
                console.error('Error searching pets:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching pets:', error);
        }
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
                <Box mb={4}>
                <Typography variant="h4" gutterBottom>My Pets</Typography>
                    <div style={{ marginBottom: '20px' }}>
                        <FormControl variant="outlined" style={{ marginRight: '10px' }}>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                displayEmpty
                                style={{
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                    width: '200px', // Adjust width as needed
                                }}
                            >
                            </input>
                        </FormControl>
                        <FormControl variant="outlined" style={{ marginRight: '10px' }}>
                            <input
                                type="text"
                                placeholder="Search by life expectancy"
                                value={lifeExpectancy}
                                onChange={(e) => setLifeExpectancy(e.target.value)}
                                displayEmpty
                                style={{
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginBottom: '10px',
                                    width: '200px', // Adjust width as needed
                                }}
                            >
                            </input>
                        </FormControl>
                        <FormControl variant="outlined" style={{ marginRight: '10px' }}>
                            <Select
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">Species</MenuItem>
                                <MenuItem value="dog">Dog</MenuItem>
                                <MenuItem value="cat">Cat</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{ marginRight: '10px' }}>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">Requested</MenuItem>
                                <MenuItem value="withRequest">With Request</MenuItem>
                                <MenuItem value="withoutRequest">Not Requested</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={handleSearch} variant="contained" color="primary">Search</Button>
                    </div>
                    <Grid container spacing={2}>
                        {pets.map((pet) => (
                            <Grid item key={pet._id} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Link to={`/pets/:${pet._id}`} style={{ textDecoration: 'none' }}>
                                            <Typography variant="h6">{pet.name}</Typography>
                                            <Typography variant="body2" color="textSecondary">{pet.species} - {pet.breed}</Typography>
                                            <Typography variant="body1">{pet.description}</Typography>
                                            <Typography variant="h6" color="primary">${pet.adoption_fee}</Typography>
                                            <Typography variant="body2" color="textSecondary">Age: {pet.age}</Typography>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
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
                </Box>
                <Box mb={4}>
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
                </Box>
            </div>
        </div>
    );
};

export default OwnerDashboard;
