import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const VisualizationBar = () => {
    const [petData, setPetData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/visual/adopted-gender')
            .then(response => response.json())
            .then(data => setPetData(data))
            .catch(error => console.error('Error fetching pet data:', error));
    }, []);

    // Extracting data for cats and dogs
    const catData = petData.filter(item => item._id.species === 'cat');
    const dogData = petData.filter(item => item._id.species === 'dog');

    // Stacked Bar Chart for Cats by Gender
    const catMaleAdopted = catData.find(item => item._id.gender === 'male')?.adopted || 0;
    const catMaleNotAdopted = catData.find(item => item._id.gender === 'male')?.notAdopted || 0;
    const catFemaleAdopted = catData.find(item => item._id.gender === 'female')?.adopted || 0;
    const catFemaleNotAdopted = catData.find(item => item._id.gender === 'female')?.notAdopted || 0;

    // Stacked Bar Chart for Dogs by Gender
    const dogMaleAdopted = dogData.find(item => item._id.gender === 'male')?.adopted || 0;
    const dogMaleNotAdopted = dogData.find(item => item._id.gender === 'male')?.notAdopted || 0;
    const dogFemaleAdopted = dogData.find(item => item._id.gender === 'female')?.adopted || 0;
    const dogFemaleNotAdopted = dogData.find(item => item._id.gender === 'female')?.notAdopted || 0;

    const catStackedBarData = [
        { gender: 'Male', Adopted: catMaleAdopted, 'Not Adopted': catMaleNotAdopted },
        { gender: 'Female', Adopted: catFemaleAdopted, 'Not Adopted': catFemaleNotAdopted },
    ];

    const dogStackedBarData = [
        { gender: 'Male', Adopted: dogMaleAdopted, 'Not Adopted': dogMaleNotAdopted },
        { gender: 'Female', Adopted: dogFemaleAdopted, 'Not Adopted': dogFemaleNotAdopted },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
            <div>
                <h2>Adoption Status for Cats by Gender</h2>
                <BarChart
                    dataset={catStackedBarData}
                    xAxis={[{ scaleType: 'band', dataKey: 'gender' }]}
                    series={[
                        { dataKey: 'Adopted', label: 'Adopted' },
                        { dataKey: 'Not Adopted', label: 'Not Adopted' },
                    ]}
                    width={600}
                    height={350}
                />
            </div>
            <div>
                <h2>Adoption Status for Dogs by Gender</h2>
                <BarChart
                    dataset={dogStackedBarData}
                    xAxis={[{ scaleType: 'band', dataKey: 'gender' }]}
                    series={[
                        { dataKey: 'Adopted', label: 'Adopted' },
                        { dataKey: 'Not Adopted', label: 'Not Adopted' },
                    ]}
                    width={600}
                    height={350}
                />
            </div>
        </div>
    );
};

export default VisualizationBar;
