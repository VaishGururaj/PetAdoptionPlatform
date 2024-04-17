import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

const UserDashboardInitial = ({ userData }) => {
    return (
        <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>User Dashboard</Typography>
            <Typography variant="h5" gutterBottom>Requested Pets</Typography>
            {userData && userData.map((request) => (
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
