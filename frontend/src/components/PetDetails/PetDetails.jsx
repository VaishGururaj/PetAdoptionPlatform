import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PetDetails = () => {
    const { id } = useParams(); // Access the ID of the selected pet from the URL parameter
    const [pet, setPet] = useState(null); // State to store the pet details

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                // Fetch the details of the pet with the given ID from your data source or API
                const response = await fetch(`http://localhost:4000/pets/${id}`);
                if (response.ok) {
                    const petData = await response.json();
                    setPet(petData);
                } else {
                    console.error('Error fetching pet details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPetDetails();
    }, [id]); // Execute the effect whenever the ID parameter changes

    return (
        <div>
            <h2>Pet Details</h2>
            {pet ? (
                <div>
                    <p>Name: {pet.name}</p>
                    <p>Species: {pet.species}</p>
                    <p>Breed: {pet.breed}</p>
                    <p>Description: {pet.description}</p>
                    <p>Adoption Fee: ${pet.adoption_fee}</p>
                    <p>Age: {pet.age}</p>
                    {/* Display additional pet details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PetDetails;
