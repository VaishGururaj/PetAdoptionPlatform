import React from 'react';
import { makeStyles } from '@mui/styles';
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles({
    aboutContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '18px',
        lineHeight: '1.6',
        marginBottom: '10px',
    },
});

const About = () => {
    const classes = useStyles();

    return (
        <div className={classes.aboutContainer}>
            <Navbar />
            <h1 className={classes.heading}>About Us</h1>
            <p className={classes.paragraph}>Welcome to our website!</p>
            <p className={classes.paragraph}>We are dedicated to providing high-quality products and services to our customers.</p>
            <p className={classes.paragraph}>Our team consists of experienced professionals who are passionate about what they do.</p>
            <p className={classes.paragraph}>Feel free to explore our website to learn more about us and our offerings.</p>
        </div>
    );
}

export default About;
