import React from 'react';
import {Container, Typography, Card, CardContent, Button, Grid} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

const UserDashboardInitial = ({ userData }) => {
    const navigate = useNavigate();
    console.log(userData)
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
                    // Handle success (e.g., redirect to login page)
                    console.log('Profile deleted successfully');
                } else {
                    // Handle error
                    console.error('Error deleting profile:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting profile:', error));

        navigate('/login');
    };

    const handleListPets = () => {
        navigate('/listpets', { state: { userId: userData.userId } });
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '90px', left: '130px' }}>
                <Button onClick={handleListPets} variant="contained" color="primary">List Pets</Button>
            </div>
            <Typography variant="h4" gutterBottom>User Dashboard</Typography>
            <Box mb={4}>
            <Button onClick={handleDeleteProfile} variant="contained" color="error">Delete Profile</Button>
            </Box>
            <Box mb={4}>
                <Typography variant="h5" gutterBottom>Requested Pets</Typography>
                <Grid container spacing={2} justifyContent="center">
                    {userData && userData.enrichedPetRequests.map((request) => (
                        <Grid item key={request.petrequestid} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{request.petname}</Typography>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '1rem' }}>Owner: {request.ownername}</Typography>
                                    <Typography sx={{ fontSize: '1rem' }}>Contact: {request.ownercontact}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box mb={4}>
                <Typography variant="h5" gutterBottom>Adopted Pets</Typography>
                <Grid container spacing={2} justifyContent="center">
                    {userData && userData.adoptedPetDetails.map((pet) => (
                        <Grid item key={pet.transactionid} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{pet.petname}</Typography>
                                    <Typography sx={{ fontStyle: 'italic', fontSize: '1rem' }}>Owner: {pet.ownername}</Typography>
                                    <Typography sx={{ fontSize: '1rem' }}>Contact: {pet.ownercontact}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default UserDashboardInitial;
