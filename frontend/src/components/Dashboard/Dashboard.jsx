import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';

const Dashboard = ({ role }) => {
// role = 'owner'
    return (
        <div>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: '100px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Dashboard</Typography>
                {role === 'owner' ? (
                    <div>
                        <Button variant="contained" color="primary" component={Link} to="/add-pet">
                            Add Pet
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/delete-pet">
                            Delete Pet
                        </Button>
                        <Button variant="contained" color="primary" component={Link} to="/update-pet">
                            Update Pet
                        </Button>
                    </div>
                ) : (
                    <div>
                        {/*<Button variant="contained" color="primary" component={Link} to="/list-pets">*/}
                        {/*    View Pets*/}
                        {/*</Button>*/}
                        {/*<Button variant="contained" color="secondary" component={Link} to="/request-pet">*/}
                        {/*    Request Pet*/}
                        {/*</Button>*/}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Dashboard;
