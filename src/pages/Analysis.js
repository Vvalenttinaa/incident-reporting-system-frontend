import StatisticIncidentsByPlace from "../components/StatisticIncidentsByPlace";
import StatisticIncidentsByType from "../components/StatisticIncidentsByType";
import StatisticIncidentByTime from "../components/StatisticIncidentsByTime";

import React, { useState } from 'react';
import { Button } from "antd";


function Analysis() {
  const [selectedStatistic, setSelectedStatistic] = useState('IncidentsByType');

  const handleButtonClick = (statistic) => {
    setSelectedStatistic(statistic);
  };

  return (
    <>
      <div>
        <Button onClick={() => handleButtonClick('IncidentsByType')}>
          Show Incidents by Type
        </Button>
        <Button onClick={() => handleButtonClick('IncidentsByPlace')}>
          Show Incidents by Place
        </Button>
        <Button onClick={() => handleButtonClick('IncidentByTime')}>
          Show Incident by Time
        </Button>
      </div>
      <h1></h1>

      {selectedStatistic === 'IncidentsByType' && <StatisticIncidentsByType />}
      {selectedStatistic === 'IncidentsByPlace' && <StatisticIncidentsByPlace />}
      {selectedStatistic === 'IncidentByTime' && <StatisticIncidentByTime />}
    </>
  );
}

export default Analysis;
