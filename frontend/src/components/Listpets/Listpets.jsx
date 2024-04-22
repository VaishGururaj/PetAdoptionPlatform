import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, Button, FormControl, Select, MenuItem } from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Listpets = () => {
    const location = useLocation();
    const { userId } = location.state;
    const [pets, setPets] = useState([]);
    const [shedding, setShedding] = useState('');
    const [gender, setGender] = useState('');
    const [species, setSpecies] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
    const role = 'user';

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

    const handleSearch = async () => {
        try {
            // Construct the URL with the search filters
            let url = `http://localhost:4000/visual/search`;
            const searchData = { shedding, gender, species, status };

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

    const handleAddPet = async (petId) => {
        try {
            const response = await fetch(`http://localhost:4000/user/:${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Pass the pet details in the request body
                body: JSON.stringify({pet_id : petId }),
            });
            if (response.ok) {
                // Handle success
                const userData = await response.json();
                navigate('/dashboard', { state: { role, userData } });
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
                <div style={{ marginBottom: '20px' }}>
                    <FormControl variant="outlined" style={{ marginRight: '10px' }}>
                        <Select
                            value={shedding}
                            onChange={(e) => setShedding(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">Shedding</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{ marginRight: '10px' }}>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">Gender</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
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
                            <MenuItem value="">Status</MenuItem>
                            <MenuItem value="adopted">Adopted</MenuItem>
                            <MenuItem value="not_adopted">Not Adopted</MenuItem>
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
                                <Button onClick={() => handleAddPet(pet._id)}>Adopt</Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Listpets;
