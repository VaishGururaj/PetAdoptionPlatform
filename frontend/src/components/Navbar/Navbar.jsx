import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { makeStyles } from '@mui/styles';

const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Contact', link: '/contact' },
    { label: 'Visualization', link: '/visualization'}
];

const useStyles = makeStyles({
    logo: {
        height: '40px',
        marginRight: '20px',
    },
    navLinks: {
        display: 'flex',
        justifyContent: 'center', // Center items horizontally
        alignItems: 'center', // Center items vertically
    },
    navLink: {
        textDecoration: 'none',
        color: 'white',
        marginLeft: '20px', // Add margin between menu items
        transition: 'color 0.3s', // Smooth transition for color change
        '&:hover': {
            color: 'lightblue', // Change color on hover
        },
    },
    appBar: {
        maxWidth: '1200px', // Maximum width for the AppBar
        margin: '0 auto', // Center the AppBar
    },
});

export default function CustomAppBar() {
    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <img src={logo} alt="Logo" className={classes.logo} />
                    <div className={classes.navLinks}>
                        {menuItems.map((item, index) => (
                            <Typography
                                key={index}
                                variant="h6"
                                component={Link}
                                to={item.link}
                                className={classes.navLink}
                                style={{ marginLeft: index !== 0 ? '20px' : '0' }}
                            >
                                {item.label}
                            </Typography>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
