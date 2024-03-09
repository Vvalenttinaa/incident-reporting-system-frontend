import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
  iconUrl: '/icons8-select-24.png',
  iconSize: [20, 20],
  // iconAnchor: [1, 1],
  // popupAnchor: [-0, -76]
})

function MapWithClickHandling() {
  const [clickPosition, setClickPosition] = useState(null);

  const handleMapClick = (e) => {
    // Extract the lat and lng from the click event
    console.log('myMethod is called');
    const { lat, lng } = e.latlng;
    
    // Update the state with the click position
    setClickPosition({ lat, lng });
    
  };

  const customIcon = new Icon({
    iconUrl: '/icons8-select-24.png',
    iconSize: [20, 20],
    // iconAnchor: [1, 1],
    // popupAnchor: [-0, -76]
  })

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      onClick={handleMapClick}
      setClickPosition={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {clickPosition && (
        <Marker position={clickPosition}>
            icon={customIcon}
          <Popup>
            Clicked at: <br />
            Latitude: {clickPosition.lat} <br />
            Longitude: {clickPosition.lng}
          </Popup>
        </Marker>
      )}
              

    </MapContainer>
  );
}

export default MapWithClickHandling;
