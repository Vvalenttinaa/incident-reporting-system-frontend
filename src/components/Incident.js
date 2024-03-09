import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DragAndDropImage from './DragAndDrop/DragAndDropImage';
import IncidentTypeService from '../services/IncidentTypeService';
import IncidentSubtypeService from '../services/IncidentSubtypeService';
import IncidentService from '../services/IncidentService';
import axios from 'axios';

const { Option } = Select;

const Incident = ({ position, address }) => {
    const [type, setType] = useState("Select type");
    const [typeId, setTypeId] = useState(null);
    const [subtypeId, setSubtypeId] = useState(null);
    const [typeName, setTypeName] = useState(null);
    const [pictureId, setPictureId] = useState(null);
    const [subtype, setSubtype] = useState("Select subtype");
    const [description, setDescription] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [picture, setPicture] = useState(null);
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const [types, setTypes] = useState([]);
    const [subtypes, setSubtypes] = useState([]);

    useEffect(() => {
        IncidentTypeService.getAll()
            .then(res => {
                console.log(res);
                setTypes(res.data); 
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const updatePicture = (value) => {
        setPicture(value);
    }

    const handleTypeChange = (value) => {
        setType(value);
        setTypeId(value);

        console.log("value is" + value);
        const selectedType = types.find(type => type.id === value);
        console.log(`Selected item type: ${selectedType.name}`);
        setTypeName(selectedType.name);

        IncidentSubtypeService.findByTypeId(value)
            .then(res => {
                console.log(res);
                setSubtypes(res.data); 
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleSubtypeChange = (value) => {
        console.log(`Selected item: ${value}`);
        setSubtype(value);
    };

    const handleInputDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleButtonClickedAdd = () => {
        let imageId = null;
      
        if (picture !== null) {
          const formData = new FormData();
          formData.append('image', picture);
      
          console.log('Starting image upload...');
      
          // Make a POST request to upload the image
          axios.post('http://localhost:8080/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log('File uploaded successfully:', response.data);
            imageId = response.data.id; // Update imageId after successful upload
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            imageId = null; // Reset imageId if upload fails
          });
        }
      
        if (subtype === "Select subtype") {
          setSubtype(null);
        }
      
        const incidentData = {
          description: description,
          type: typeId,
          subtype: subtype,
          addressName: address,
          longitude: position.lng,
          latitude: position.lat,
          imageId: imageId, // Use the obtained imageId or null
        };
      
        // Post incident data
        IncidentService.addIncident(incidentData)
          .then(() => {
            setIsModalVisible(true);
          })
          .catch(error => console.error('Error adding incident:', error));
      };
      
      

    const handleClose = () => {
       // window.location.reload();
       setDescription("");
       setType("Select type")
       setSubtype("Select subtype");
       setPicture(null);
       setIsModalVisible(false);

    }

    return (
        <div>
            <Select
                style={{ width: "100%" }}
                placeholder="Select type"
                onChange={handleTypeChange}
                value={type}
            >
                {types.map((type) => (
                    <Option key={type.id} value={type.id}>
                        {type.name}
                    </Option>
                ))}
            </Select>

            <Select
                style={{ width: "100%" }}
                placeholder="Select subtype"
                onChange={handleSubtypeChange}
                value={subtype}
            >
                {subtypes.map((subtype) => (
                    <Option key={subtype.id} value={subtype.id}>
                        {subtype.name}
                    </Option>
                ))}
            </Select>

            <Input placeholder="Description" style={{ width: "100%" }} onChange={handleInputDescription} />
            <DragAndDropImage updatePicture={updatePicture} />
            <Button className='buttonAddIncident' onClick={handleButtonClickedAdd}>Add Incident</Button>
            <Modal
                title="FINISHED ADDING INCIDENT"
                visible={isModalVisible}
                onOk={handleClose}
                onCancel={handleClose}
            ></Modal>
        </div>
    );
};

export default Incident;
