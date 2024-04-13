import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, MenuItem } from '@mui/material';

const SignUpPage = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [type, setType] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                    type,
                    password
                })
            });
            if (response.ok) {
                // Handle successful signup
                navigate('/dashboard');
            } else {
                const data = await response.json();
                alert(data.message); // Display error message from the server
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '100px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                    select
                    label="Type"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value="owner">Owner</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                </TextField>
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
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up
                </Button>
            </form>
            <Typography variant="body2" marginTop={2}>
                Already have an account? <Link to="/login">Login</Link>
            </Typography>
        </Container>
    );
};

export default SignUpPage;
