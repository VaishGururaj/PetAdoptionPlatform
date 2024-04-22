import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const Visualization = () => {
    const [petData, setPetData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/visual/adoption-status')
            .then(response => response.json())
            .then(data => setPetData(data))
            .catch(error => console.error('Error fetching pet data:', error));
    }, []);

    const labels = petData.map(item => item._id);
    const totalValues = petData.map(item => item.total);
    const adoptedValues = petData.map(item => item.adopted);
    const notAdoptedValues = petData.map(item => item.notAdopted);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: totalValues
            },
            {
                label: 'Adopted',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: adoptedValues
            },
            {
                label: 'Not Adopted',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: notAdoptedValues
            }
        ]
    };

    return (
        <div>
            <h2>Pet Adoption Status Visualization</h2>
            <Bar data={data} />
        </div>
    );
};

export default Visualization;
