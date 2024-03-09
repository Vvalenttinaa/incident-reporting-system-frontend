import { useState, useEffect } from "react";
import IncidentSubtypeService from "../../services/IncidentSubtypeService";
import { Menu, Button, Dropdown } from "antd";
import { DownOutlined } from '@ant-design/icons';

const FilterBySubtype = (props) => {
  const [chosenSubtype, setChosenSubtype] = useState(null);
  const [subtypes, setSubtypes] = useState([]);

  useEffect(() => {
    if (props.typeId !== null) {
      IncidentSubtypeService.findByTypeId(props.typeId)
        .then(res => {
          console.log("useeff in subtype filter" + res.data.id);
          setSubtypes(res.data); // Set the fetched data in the state
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else if (chosenSubtype === "All" && props.typeId === null) {
      setSubtypes([]);
    }
  }, [chosenSubtype, props.typeId]);

  const handleMenuClick = (e) => {
    setChosenSubtype(e.key);
  };

  useEffect(() => {
    if (chosenSubtype !== null && chosenSubtype !== "All") {
      const selectedSubtype = subtypes.find(type => type.id === parseInt(chosenSubtype));
      props.updateSubtype(selectedSubtype ? selectedSubtype.name : null);
      console.log(selectedSubtype?.name);
    }
  }, [chosenSubtype, subtypes, props.updateSubtype]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">All</Menu.Item>
      {subtypes.map((subtype) => (
        <Menu.Item key={subtype.id}>{subtype.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {chosenSubtype !== null && Array.isArray(subtypes) && subtypes.length > 0
          ? (
              subtypes.find(subtype => subtype && subtype.id === parseInt(chosenSubtype))?.name || 'Select Subtype'
            )
          : chosenSubtype === "All" ? "All" : 'Select Subtype'
        }
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterBySubtype;
