import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import OwnerDashboard from './OwnerDashboard';
import UserDashboardInitial from './UserDashboardInitial';
import FeedbackForm from '../Feedback/Feedback';

const Dashboard = () => {
    const location = useLocation();
    const { role, userData } = location.state;
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    const handleFeedbackSubmit = async (feedbackData) => {
        try {
            const response = await fetch('http://localhost:4000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });
            if (response.ok) {
                // Feedback submitted successfully
                console.log('Feedback submitted successfully');
            } else {
                console.error('Error submitting feedback:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
                {role === 'owner' ? (
                    <OwnerDashboard userData={userData} />
                ) : (
                    <UserDashboardInitial userData={userData} />
                )}
                <FeedbackForm userData={userData} onSubmit={handleFeedbackSubmit} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                    sx={{ marginTop: '20px' }}
                >
                    Logout
                </Button>
            </Container>
        </div>
    );
};

export default Dashboard;
