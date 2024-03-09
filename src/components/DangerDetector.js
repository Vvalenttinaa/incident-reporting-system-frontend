import { useEffect, useState } from "react";
import IncidentService from "../services/IncidentService";
import { Card } from "antd";

const DangerDetector = () => {
    const [incidents, setIncidents] = useState(null);
    const numDays = 3;
    const numIncidents = 2;

    useEffect(() => {
        async function fetchData() {
            try {
                const incidentsResponse = await IncidentService.getAll();
                setIncidents(incidentsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const checkDangerousPlace = (place, type) => {
        if (!incidents) return false;

        const currentTime = new Date().getTime();
        const numDaysInMillis = numDays * 24 * 60 * 60 * 1000;

        const filteredIncidents = incidents.filter((incident) => {
            const incidentTime = new Date(incident.createdAt).getTime();
            if(incident.addressPlace === place && incident.typeName === type && currentTime - incidentTime <= numDaysInMillis){
                console.log(place + " " + type);
            }
            return (
                incident.addressPlace === place &&
                incident.typeName === type &&
                currentTime - incidentTime <= numDaysInMillis
            );
        });
        return filteredIncidents.length >= numIncidents;
    };

    const dangerousPlaces = [];
    if (incidents) {
        incidents.forEach((incident) => {
            const combination = `${incident.typeName}-${incident.addressPlace}`;
            if (
                checkDangerousPlace(incident.addressPlace, incident.typeName) &&
                !dangerousPlaces.includes(combination)
            ) {
                dangerousPlaces.push(combination);
            }
        });
    }

    return (
        <div>
            {dangerousPlaces.map((combination, index) => {
                const [typeName, addressPlace] = combination.split('-');
                return (
                    <Card style={{ fontSize: '26px'}}>
                    <div key={index}>
                    <span>
                            <span style={{ color: 'Blue' }}>{addressPlace}</span>: There are {numIncidents} incidents,{' '}
                            <span style={{ color: 'red' }}>{typeName}</span>, in the last {numDays} days!
                    </span>
                    </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default DangerDetector;
