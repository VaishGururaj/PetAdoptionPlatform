import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import OwnerDashboard from './OwnerDashboard'; // Import the OwnerDashboard component

const Dashboard = ({ role, userData }) => {
    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Dashboard</Typography>
                {role === 'owner' ? (
                    <OwnerDashboard ownerPets={userData} />
                ) : (
                    <div>
                        <Button variant="contained" color="primary" component={Link} to="/list-pets">
                            View Pets
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/request-pet">
                            Request Pet
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Dashboard;
