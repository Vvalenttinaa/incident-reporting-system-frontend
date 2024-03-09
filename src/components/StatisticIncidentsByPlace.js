import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import AddressService from '../services/AddressService';
import IncidentService from '../services/IncidentService';

function StatisticIncidentsByPlace() {
  const [places, setPlaces] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const placesResponse = await AddressService.getAll();
        setPlaces(placesResponse.data.place);

        const incidentsResponse = await IncidentService.getAll();
        const incidents = incidentsResponse.data;

        // Group incidents by place and count occurrences
        const incidentsByPlace = {};
        incidents.forEach(incident => {
          const place = incident.addressPlace;
          incidentsByPlace[place] = (incidentsByPlace[place] || 0) + 1;
        });

        // Convert data into format suitable for chart series
        const chartSeriesData = Object.entries(incidentsByPlace).map(([place, count]) => ({
          name: place,
          data: [count],
        }));

        setChartData(chartSeriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const options = {
    xaxis: {
      categories: ['Incident Counts By Place'], 
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <Chart options={options} series={chartData} type="bar" width="700" />
      </div>
    </div>
  );
}
// bar
// line
// area
// radar
// histogram
// scatter
// heatmap

export default StatisticIncidentsByPlace;
