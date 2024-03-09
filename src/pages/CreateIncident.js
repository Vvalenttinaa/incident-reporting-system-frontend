import MyMapComponent from '../components/Maps/MyMapComponent';
import Incident from '../components/Incident'
import { useState } from 'react';


function CreateIncident()  {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState(null);

    const updatePosition = (data, address) => {
        setPosition(data);
        setAddress(address);
    };

    return (
        <div>
           
            <MyMapComponent updatePosition={updatePosition} />
            <Incident position={position} address={address}></Incident>

        </div>
    );
}

export default CreateIncident;