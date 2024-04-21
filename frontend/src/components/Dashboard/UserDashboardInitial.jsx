import React from 'react';
import {Container, Typography, Card, CardContent, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";

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

    return (
        <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>User Dashboard</Typography>
            <Button onClick={handleDeleteProfile} variant="contained" color="error">Delete Profile</Button>
            <Typography variant="h5" gutterBottom>Requested Pets</Typography>
            {userData && userData.enrichedPetRequests.map((request) => (
                <Card key={request.petrequestid} sx={{ marginBottom: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', width: '300px', margin: '0 auto' }}>
                    <CardContent sx={{ padding: '10px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{request.petname}</Typography>
                        <Typography sx={{ fontStyle: 'italic', fontSize: '1rem' }}>Owner: {request.ownername}</Typography>
                        <Typography sx={{ fontSize: '1rem' }}>Contact: {request.ownercontact}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>

    );
};

export default UserDashboardInitial;
