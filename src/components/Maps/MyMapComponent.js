import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import axios from 'axios';
import L from 'leaflet';

const customIcon = new Icon({
    iconUrl: '/icons8-select-24.png',
    iconSize: [20, 20],
});

const HERE_API_KEY = '';

function MyMap({ updatePosition }) {
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef(null);

    const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;

        console.log({ lat }, { lng });

        try {
            const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&apiKey=${HERE_API_KEY}`);
            const address = response.data.items[0].title;

            const newMarker = { lat, lng, address };

            // Update the markers state to clear previous markers
            setMarkers([newMarker]);
            updatePosition(newMarker, address);

            console.log({ lat }, { lng }, address);

        } catch (error) {
            console.error('Error getting address:', error);
        }
    };

    useEffect(() => {

        const map = mapRef.current;

        if (map) {
            // Clear all previous markers from the map
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            markers.forEach((marker) => {
                const { lat, lng, address } = marker;

                // Create a Leaflet marker and add it to the map
                var popupContent=`<div><p style="font-size: 10px; text-aligin: center">Lat: ${lat}, Lng: ${lng}, <br/>Address: ${address}<p></div>`;
                const newMarker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                newMarker.bindPopup(popupContent);
                newMarker.getPopup().setContent(popupContent);
                console.log('New marker added');
            });
        }
    }, [mapRef, markers]);

    return (
        <section className='map-component'>
            <div className='map'>
                <MapContainer center={[44.77120315538596, 17.19022289822722]} zoom={13} scrollWheelZoom={true}
                    whenReady={(map) => {
                        (mapRef.current = map.target)
                        console.log("izvrsiiiiiiiiiiiiiiiiiii" + mapRef.current)
                    }
                    }>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <CustomMapClickHandler onClick={handleMapClick} />
                </MapContainer>
            </div>
        </section>
    );
}

function CustomMapClickHandler({ onClick }) {
    useMapEvent('click', (e) => {
        onClick(e);
    });

    return null;
}

export default MyMap;
