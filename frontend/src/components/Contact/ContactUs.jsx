import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, TextField, Button } from '@mui/material';
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles({
    contactContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    formContainer: {
        marginTop: '20px',
    },
    formField: {
        marginBottom: '20px',
    },
});

const ContactUs = () => {
    const classes = useStyles();

    return (
        <div>
            <Navbar />
            <div className={classes.contactContainer}>
                <h1 className={classes.heading}>Contact Us</h1>
                <Typography variant="body1" paragraph>
                    Have questions, feedback, or suggestions? We'd love to hear from you!
                </Typography>
                <Grid container spacing={3} justifyContent="center" className={classes.formContainer}>
                    <Grid item xs={12} sm={8} md={6}>
                        <TextField
                            id="name"
                            label="Your Name"
                            variant="outlined"
                            fullWidth
                            className={classes.formField}
                        />
                        <TextField
                            id="email"
                            label="Your Email"
                            variant="outlined"
                            fullWidth
                            className={classes.formField}
                        />
                        <TextField
                            id="message"
                            label="Your Message"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            className={classes.formField}
                        />
                        <Button variant="contained" color="primary" fullWidth>
                            Send Message
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>

    );
}

export default ContactUs;
