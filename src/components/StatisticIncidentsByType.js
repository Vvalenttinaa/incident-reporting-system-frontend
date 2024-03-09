import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import IncidentTypeService from '../services/IncidentTypeService';

function StatisticIncidentsByType() {
  const [types, setTypes] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const typesResponse = await IncidentTypeService.getAll();
        setTypes(typesResponse.data);
        fetchIncidentsForTypes(typesResponse.data);
      } catch (error) {
        console.error('Error fetching types data:', error);
      }
    }

    fetchData();
  }, []);

  const fetchIncidentsForTypes = async typesData => {
    try {
      const seriesData = await Promise.all(
        typesData.map(async type => {
          try {
            const incidentsData = await IncidentTypeService.getAllIncidentsByType(type.id);
            if (incidentsData.data && incidentsData.data.incidents) {
              const incidentCount = incidentsData.data.incidents.length;
              return {
                name: type.name,
                data: incidentCount, 
              };
            } else {
              return {
                name: type.name,
                data: 0, 
              };
            }
          } catch (error) {
            console.error('Error fetching incidents for type:', type.name, error);
            return {
              name: type.name,
              data: 0, 
            };
          }
        })
      );

      setChartSeries(seriesData.map(series => ({ name: series.name, data: [series.data] })));
    } catch (error) {
      console.error('Error fetching incidents data:', error);
    }
  };

  const options = {
    xaxis: {
      categories: ['Incident Counts By Type'], 
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '50%' }}>
      <Chart options={options} series={chartSeries} type="bar" width="700" />
    </div>
  </div>
  );
}

export default StatisticIncidentsByType;
