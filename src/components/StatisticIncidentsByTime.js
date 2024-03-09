import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import IncidentService from '../services/IncidentService';

function StatisticIncidentByTime() {
  const [incidentData, setIncidentData] = useState([]);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const incidentsResponse = await IncidentService.getAll();
        setIncidentData(incidentsResponse.data);
      } catch (error) {
        console.error('Error fetching incident data:', error);
      }
    }

    fetchIncidents();
  }, []);

  const prepareChartData = () => {
    // Process incident data to extract createdAt timestamps
    const timestamps = incidentData.map(incident => new Date(incident.createdAt).toDateString());

    // Count the number of incidents for each unique date
    const incidentCountByDate = {};
    timestamps.forEach(date => {
      incidentCountByDate[date] = (incidentCountByDate[date] || 0) + 1;
    });

    return Object.entries(incidentCountByDate).map(([date, count]) => ({
      x: date,
      y: count,
    }));
  };

  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      type: 'category',
      categories: prepareChartData().map(dataPoint => dataPoint.x),
      title: {
        text: 'Date', // x-axis title
      },
    },
    yaxis: {
      title: {
        text: 'Incident Count', // y-axis title
      },
    },
  };

  const series = [
    {
      name: 'Incidents',
      data: prepareChartData().map(dataPoint => dataPoint.y), // Count of incidents for each date
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <Chart options={options} series={series} type="bar" width="700" />
      </div>
    </div>
  );
}

export default StatisticIncidentByTime;
