import React from 'react';
import {useLocation} from 'react-router-dom';
import {Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import OwnerDashboard from './OwnerDashboard';
import UserDashboard from "./UserDashboard"; // Import the OwnerDashboard component

const Dashboard = () => {
    const location = useLocation();
    const { role, userData } = location.state;
    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
                {role === 'owner' ? (
                    <OwnerDashboard userData={userData} />
                ) : (
                    <div>
                        <UserDashboard />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Dashboard;
