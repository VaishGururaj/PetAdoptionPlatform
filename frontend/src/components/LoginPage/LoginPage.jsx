// LoginPage.jsx
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { TextField, Button, Typography, Container, MenuItem } from '@mui/material';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    role
                })
            });
            if (response.ok) {
                const userData = await response.json();
                navigate('/dashboard', { state: { role, userData } });
            } else {
                const data = await response.json();
                alert(data.message); // Display error message from the server
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    select
                    label="Role"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value="owner">Owner</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            <Typography variant="body2" marginTop={2}>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;
