import React, { useState } from 'react';
import { Typography, TextField, Button, Rating, Box, Snackbar } from '@mui/material';

const FeedbackForm = ({ onSubmit, userData }) => {
    const [feedback, setFeedback] = useState({
        stars: 0,
        description: '',
        username: userData?.username || '',
        password: userData?.password || '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value,
        }));
    };

    const handleRatingChange = (newValue) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            stars: newValue,
        }));
    };

    const handleSubmit = () => {
        onSubmit(feedback);
        setIsSubmitted(true);
        setFeedback({
            stars: 0,
            description: '',
            username: userData?.username || '',
            password: userData?.password || '',
        });
    };

    const handleCloseNotification = () => {
        setIsSubmitted(false);
    };

    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Leave Feedback
            </Typography>
            <Rating
                name="stars"
                value={feedback.stars}
                onChange={(event, newValue) => handleRatingChange(newValue)}
                precision={1}
                size="large"
                sx={{ mb: 2 }}
            />
            <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                value={feedback.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <TextField
                name="username"
                label="Username"
                value={feedback.username}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                value={feedback.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit Feedback
            </Button>

            <Snackbar
                open={isSubmitted}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                message="Feedback submitted successfully!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default FeedbackForm;
