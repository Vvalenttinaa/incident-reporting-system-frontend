import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const FilterByTime = ({ updateTimeFilter }) => {
  const [chosenTime, setChosenTime] = useState(null);

  const handleMenuClick = (e) => {
    setChosenTime(e.key);
  };

  const times = [
    { id: '1', name: 'Last 24h' },
    { id: '2', name: 'Last 7 days' },
    { id: '3', name: 'Last 31 days' },
  ];

  useEffect(() => {
    if (chosenTime !== null && updateTimeFilter && typeof updateTimeFilter === 'function') {
      updateTimeFilter(chosenTime);
    }
  }, [chosenTime, updateTimeFilter]);

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('updateTime:', chosenTime);
  
    // Your effect code here
  }, [ updateTimeFilter]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      {times.map((time) => (
        <Menu.Item key={time.id} >
          {time.name}
        </Menu.Item>
      ))}
      <Menu.Item key="4">All</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        {chosenTime
          ? times.find((time) => time.id === chosenTime)?.name || 'Select Time'
          : 'Select Time'}{' '}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterByTime;
