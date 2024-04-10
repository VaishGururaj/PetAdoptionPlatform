import React from 'react';
import { useParams } from 'react-router-dom';

const PetDetails = () => {
    const { id } = useParams(); // Access the ID of the selected pet from the URL parameter

    // Fetch the details of the pet with the given ID from your data source or API

    return (
        <div>
            <h2>Pet Details</h2>
            <p>Display details of pet with ID: {id}</p>
            {/* Display detailed information about the selected pet */}
        </div>
    );
}

export default PetDetails;
