import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import IncidentService from '../../services/IncidentService';

export function MapRejected({data}) {
  const position = [44.77120315538596, 17.19022289822722];
  /*const [data, setData] = useState([]);

  useEffect(() => {
    IncidentService.getAllRejected().then(res => {
      console.log(res);
      setData(res.data);
    })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  */

  useEffect(() => {
    console.log(data);
  })

  const customIcon = new Icon({
    iconUrl: '/icons8-select-24.png',
    iconSize: [20, 20],
  });


  return (
    <>
      <section style={{ textAlign: 'left' }}>
      </section>
      <section className='map-component'>
        <div className='map'>
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map((marker) => (
              <Marker
                key={marker.id}
                position={[marker?.addressLatitude, marker?.addressLongitude]}
                icon={customIcon}
              >
                <Popup className='custom-popup'>
                  Type: {marker?.typeName}
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
    </>
  );
}
export default MapRejected;
