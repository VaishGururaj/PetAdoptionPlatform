import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {axisClasses} from '@mui/x-charts';
import {Typography} from '@mui/material';
import Navbar from '../Navbar/Navbar';
import VisualizationBar from "./VisualizationBar";

const chartSetting = {
    yAxis: [
        {
            label: 'Number of Pets',
        },
    ],
    width: 600,
    height: 400,
    margin: { top: 40, bottom: 80, left: 60, right: 40 }, // Adjusted margin for better visibility
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};

export default function Visualization() {
    const [petData, setPetData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/visual/adoption-status')
            .then(response => response.json())
            .then(data => setPetData(data))
            .catch(error => console.error('Error fetching pet data:', error));
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', padding: '20px', backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <Typography variant="h5" align="center" gutterBottom>Pet Adoption Status</Typography>
            <BarChart
                dataset={petData}
                xAxis={[{ scaleType: 'band', dataKey: '_id' }]}
                series={[
                    { dataKey: 'total', label: 'Total' },
                    { dataKey: 'adopted', label: 'Adopted' },
                    { dataKey: 'notAdopted', label: 'Not Adopted' },
                ]}
                {...chartSetting}
            />
            <VisualizationBar />
        </div>
    );
}
