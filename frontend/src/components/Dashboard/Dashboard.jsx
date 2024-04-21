import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Container} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import OwnerDashboard from './OwnerDashboard';
import UserDashboardInitial from "./UserDashboardInitial";

const Dashboard = () => {
    const location = useLocation();
    const { role, userData } = location.state;
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };
    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
                {role === 'owner' ? (
                    <OwnerDashboard userData={userData} />
                ) : (
                    <div>
                        <UserDashboardInitial userData={userData} />
                    </div>
                )}
                <Button variant="contained" color="primary" onClick={handleLogout} sx={{ marginTop: '20px' }}>
                    Logout
                </Button>
            </Container>
        </div>
    );
};

export default Dashboard;
