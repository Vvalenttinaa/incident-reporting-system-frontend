import React, { useState } from "react";
import { Card, Button, Modal } from "antd";

const IncidentsCards = ({ data, setData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const showModal = (data) => {
    setSelectedData(data);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // Set 'isApproved' to true for the selected data
    const updatedData = data.map((item) => {
      if (item.id === selectedData.id) {
        return { ...item, isApproved: true };
      }
      return item;
    });
  
    // Update the data
    setData(updatedData);
  
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {data.map((item) => (
        <Card
          key={item.id}
          style={{ width: 300, margin: 16 }}
          cover={<img alt="Incident" src={item.imageUrl} />}
        >
          <h3>{item.type}</h3>
          <p>{item.subtype}</p>
          <p>{item.description}</p>
          {item.isApproved ? (
            <p>Approved</p>
          ) : (
            <Button onClick={() => showModal(item)}>Approve</Button>
          )}
        </Card>
      ))}
      <Modal
        title="Approving incident"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {selectedData && (
          <div>
            <p>TYPE: {selectedData.type}</p>
            <p>SUBTYPE: {selectedData.subtype}</p>
            <p>DESCRIPTION: {selectedData.description}</p>
            {/* Add other properties here */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IncidentsCards;
