import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import IncidentTypeService from '../../services/IncidentTypeService';


const FilterByType = (props) => {
  const [chosenType, setChosenType] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    IncidentTypeService.getAll().then(res => {
      console.log(res)
      setTypes(res.data); // Set the fetched data in the state
    })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleMenuClick = (e) => {
    setChosenType(e.key);
  };

  useEffect(() => {
    if (chosenType !== null) {
      if(chosenType == "0")
      {
        props.updateType("All");
        props.updateTypeId(0);
      }
      else
      {
      const selectedType = types.find(type => type.id === parseInt(chosenType));
      props.updateType(selectedType ? selectedType.name : null);
      props.updateTypeId(selectedType? selectedType.id:  null);
      console.log(selectedType.name);
      console.log(selectedType.id);
      }
    }
  }, [chosenType, props.updateType, props.updateTypeId]);

  const menu = (
    <Menu onClick={handleMenuClick}>
     <Menu.Item key="0">All</Menu.Item>
      {types.map((type) => (
        <Menu.Item key={type.id}>{type.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        { chosenType && chosenType !== "0" ? types.find(type => type.id === parseInt(chosenType)).name : 'Select Type'} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterByType;
