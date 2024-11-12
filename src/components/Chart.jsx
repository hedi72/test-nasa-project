// src/components/Chart.js

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import PropTypes from 'prop-types';

function Chart({ data }) {
  const chartData = data.map((neo) => ({
    name: neo.name,
    minDiameter: neo.estimated_diameter.kilometers.estimated_diameter_min,
    maxDiameter: neo.estimated_diameter.kilometers.estimated_diameter_max,
  }));

  console.log('====================================');
  console.log('chartData:', chartData);
  console.log('====================================');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" label={{ value: 'Diameter (km)', position: 'insideBottom', offset: -5 }} />
        <YAxis dataKey="name" type="category" width={150} label={{ value: 'NEO Name', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="minDiameter" fill="#4285F4" name="Min Estimated Diameter (km)" />
        <Bar dataKey="maxDiameter" fill="#EA4335" name="Max Estimated Diameter (km)" />
      </BarChart>
    </ResponsiveContainer>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      estimated_diameter: PropTypes.shape({
        kilometers: PropTypes.shape({
          estimated_diameter_min: PropTypes.number.isRequired,
          estimated_diameter_max: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Chart;
