import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles({
    aboutContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    card: {
        marginBottom: '20px',
    },
    heading: {
        fontSize: '32px',
        marginBottom: '20px',
        color: '#3f51b5', // Dark blue
    },
    paragraph: {
        fontSize: '18px',
        lineHeight: '1.6',
        marginBottom: '10px',
    },
    actionButton: {
        marginTop: '20px',
    },
});

const About = () => {
    const classes = useStyles();

    return (
        <div>
            <Navbar />
            <div className={classes.aboutContainer}>
                <h1 className={classes.heading}>About Us</h1>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card} style={{ backgroundColor: '#e0f7fa' }}> {/* Light blue */}
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Kind To Everyone</Typography>
                                <Typography variant="body1" paragraph>
                                    We believe that every pet deserves to be safe, loved, and respected.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    People who are great candidates for adoption shouldn't be put off by complicated processes or one-size-fits-all rules.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    People who need to rehome their pets should be empowered to do so without being judged.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card} style={{ backgroundColor: '#f3e5f5' }}> {/* Light purple */}
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Advocate Adoption</Typography>
                                <Typography variant="body1" paragraph>
                                    Adoption reduces the demand for puppy farming, industrial-scale breeding, illegal pet imports, and other forms of exploitation and abuse.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    We’re proud supporters of #AdoptDontShop.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={classes.card} style={{ backgroundColor: '#fff9c4' }}> {/* Light yellow */}
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Responsible Rehoming</Typography>
                                <Typography variant="body1" paragraph>
                                    We’re champions of rehoming. But not at any cost.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    We believe in finding the right match between adopters and pets, not taking risks or rushing.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    We always prioritize pet welfare. And we offer a safer, more ethical, and professional alternative to online marketplaces like Preloved, Pets4Homes, Facebook, and Gumtree.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" className={classes.actionButton}>
                    Learn More
                </Button>
            </div>

        </div>

    );
}

export default About;
