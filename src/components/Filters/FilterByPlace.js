import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AddressService from '../../services/AddressService';

const FilterByPlace = ({ updatePlace }) => {
  const [chosenPlace, setChosenPlace] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    AddressService.getAll()
      .then(res => {
        setPlaces(res.data); // Set the fetched data in the state
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleMenuClick = (e) => {
    setChosenPlace(e.key);
  };

  useEffect(() => {
    if(chosenPlace == "0")
    {
      updatePlace("All");
    }
    else if (chosenPlace !== null && updatePlace) {
      const selectedPlace = places.find(place => place.id === parseInt(chosenPlace));
      updatePlace(selectedPlace ? selectedPlace.place : null);
      console.log("selected place is " + selectedPlace.place);
    }
  }, [chosenPlace, updatePlace]);
  

  const uniquePlaces = places.filter((place, index, self) =>
  index === self.findIndex((p) => p.place === place.place)
);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">All</Menu.Item>
      {uniquePlaces.map((place) => (
        <Menu.Item key={place.id}>{place.place}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {chosenPlace ? (places.find(place => place.id === parseInt(chosenPlace))?.place || 'Select Place') : 'Select Place'} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterByPlace;
