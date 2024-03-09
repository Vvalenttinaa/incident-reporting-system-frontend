import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FilterByTime from '../Filters/FilterByTime';
import FilterByType from '../Filters/FilterByType';
import FilterByPlace from '../Filters/FilterByPlace';
import FilterBySubtype from'../Filters/FilterBySubtype';
import IncidentsTable from '../Incidents/IncidentsTable';
import IncidentService from '../../services/IncidentService';

export function MapView() {
  const [type, setType] = useState(null);
  const [typeId, setTypeId] = useState(null);
  const [subtype, setSubtype] = useState(null);
  const [timeFilter, setTimeFilter] = useState(null);
  const [place, setPlace] = useState(null);
  const [data, setData] = useState([]);
  const position = [44.77120315538596, 17.19022289822722];

  useEffect(() => {
    IncidentService.getAllApproved().then(res => {
      console.log(res);
      setData(res.data);
    })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const updateType = (selectedType) => {
    setType(selectedType);
  };

  const updateTypeId = (selectedTypeId) => {
    setTypeId(selectedTypeId);
    console.log("u props id " + selectedTypeId);
  
  };

  const updateSubtype = (selectedSubtype) => {
    setSubtype(selectedSubtype);
  };

  const updatePlace = (selectedPlace) => {
    setPlace(selectedPlace);
  };

  const updateTimeFilter = (selectedTimeFilter) => {
    setTimeFilter(selectedTimeFilter);
  };

  const customIcon = new Icon({
    iconUrl: '/icons8-select-24.png',
    iconSize: [20, 20],
  });

  const filteredMarkers = data.filter((marker) => {
    const now = Date.now();
    let timeLimit;
  
    if (timeFilter === '1') {
      timeLimit = now - 24 * 60 * 60 * 1000;
    } else if (timeFilter === '2') {
      timeLimit = now - 7 * 24 * 60 * 60 * 1000;
    } else if (timeFilter === '3') {
      timeLimit = now - 31 * 24 * 60 * 60 * 1000;
    } else {
      timeLimit = 0;
    }
  
    const createdAtTimestamp = Date.parse(marker.createdAt);
  
    return (
      (!type || type === 'All' || marker.typeName === type) &&
      (!subtype || subtype === 'All' || marker.subtypeName === subtype) &&
      (!place || place === 'All' || marker.addressPlace === place) &&
      (!timeFilter || timeFilter === 'All' || createdAtTimestamp >= timeLimit)
    );
  });
  

  return (
    <>
      <section style={{ textAlign: 'left' }}>
        <FilterByPlace updatePlace={updatePlace} />
        <FilterByTime updateTimeFilter={updateTimeFilter} />
        <FilterByType updateType={updateType} updateTypeId={updateTypeId} />
        <FilterBySubtype updateSubtype={updateSubtype} typeId={typeId}/>
      </section>
      <section className='map-component'>
        <div className='map'>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredMarkers.map((marker) => (
              <Marker
                key={marker.id}
                position={[marker?.addressLatitude, marker?.addressLongitude]}
                icon={customIcon}
              >
                <Popup className='custom-popup'>
                  Type: {marker?.typeName}
                  <br />
                  Subtype: {marker?.subtypeName}
                  <br />
                  Address: {marker?.addressName}
                  <br />
                  Lng: {marker?.addressLongitude}
                  <br />
                  Lat: {marker?.addressLatitude}
                  <br />
                  Created at: {new Date(marker.createdAt).toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
      <h1></h1>
      <h1></h1>
      <IncidentsTable data={filteredMarkers} />
    </>
  );
}
export default MapView;
