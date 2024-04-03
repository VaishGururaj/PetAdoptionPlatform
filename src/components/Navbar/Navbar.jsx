import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import logo from './logo.png';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        maxHeight: 60, // Adjust the height of the logo as needed
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '5px', // Adjust the margin if needed
    },
    appBarContainer: {
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: '#222',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Add a box shadow

    },
    appBar: {
        backgroundColor: '#333', // Adjust the background color if needed
    },
    navigation: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 16, // Adjust the right padding if needed
        flex: 1, // Ensure navigation takes remaining space
    },
    navItem: {
        marginLeft: 16, // Adjust the spacing between navigation items
        color: '#ffffff', // Adjust the color of the navigation items
        textDecoration: 'none', // Remove underline from the navigation items
        '&:hover': {
            color: '#cccccc', // Adjust the hover color of the navigation items
        },
        fontSize: 16, // Adjust the font size of the navigation items
        fontWeight: 500, // Adjust the font weight of the navigation items
        letterSpacing: '0.5px', // Adjust the letter spacing of the navigation items
        textTransform: 'uppercase', // Convert the text to uppercase
        transition: 'color 0.3s ease-in-out', // Add transition effect for hover
    },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* Logo on the left */}
            <img src={logo} alt="Logo" className={classes.logo} />
            <div className={classes.appBarContainer}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        {/* Navigation on the right */}
                        <div className={classes.navigation}>
                            {/* List items */}
                            <a href="#" className={classes.navItem}>Home</a>
                            <a href="#" className={classes.navItem}>List a Pet</a>
                            <a href="#" className={classes.navItem}>Rehome</a>
                            <a href="#" className={classes.navItem}>Login/SignUp</a>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
}

export default Navbar;
