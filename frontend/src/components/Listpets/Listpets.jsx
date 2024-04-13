import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {InputLabel} from "@mui/material";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    card: {
        width: 300,
        margin: 20,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        transition: '0.3s',
        borderRadius: '8px',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
        },
    },
    media: {
        height: 140,
    },
    formControl: {
        margin: 20,
        minWidth: 120,
        justifyContent: "center"
    },
});

const ListPets = () => {
    const classes = useStyles();
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [pets] = useState([
        { id: 1, name: 'Buddy', species: 'Dog', age: 3, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Whiskers', species: 'Cat', age: 2, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Max', species: 'Dog', age: 4, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Fluffy', species: 'Cat', age: 1, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Charlie', species: 'Dog', age: 2, image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Mittens', species: 'Cat', age: 3, image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Rocky', species: 'Dog', age: 5, image: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Whiskey', species: 'Cat', age: 2, image: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Luna', species: 'Dog', age: 1, image: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Shadow', species: 'Cat', age: 4, image: 'https://via.placeholder.com/150' },
        // Add more dummy pet data as needed
    ]);

    const handleSpeciesChange = (event) => {
        setSelectedSpecies(event.target.value);
    };

    const filteredPets = selectedSpecies
        ? pets.filter(pet => pet.species === selectedSpecies)
        : pets;

    return (
        <div>
            <InputLabel id="species-label">Select animal type</InputLabel>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="species-label"
                    id="species-select"
                    value={selectedSpecies}
                    onChange={handleSpeciesChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Select species' }}
                >
                    <MenuItem value="">All species</MenuItem>
                    <MenuItem value="Dog">Dog</MenuItem>
                    <MenuItem value="Cat">Cat</MenuItem>
                    {/* Add more species as needed */}
                </Select>
            </FormControl>
            <div className={classes.root}>
                {filteredPets.map(pet => (
                    <Link key={pet.id} to={`/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pet.image}
                                    alt={pet.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {pet.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Species: {pet.species}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Age: {pet.age}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ListPets;
