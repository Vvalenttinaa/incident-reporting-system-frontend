import React from "react";
import { Table, Modal } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";

const IncidentsTable = ({ data }) => {

    const [imageData, setImageData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState(null);

    useEffect(() => {
      preloadImages();
    }, [data]);
  
    const preloadImages = async () => {
      const updatedImageData = {};
      for (const item of data) {
        if (item.pictureId) {
          const imageUrl = await getImage(item.pictureId);
          updatedImageData[item.pictureId] = imageUrl;
        }
      }
      setImageData(updatedImageData);
    };
  
    const getImage = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/image/${id}`, {
          responseType: "arraybuffer",
        });
  
        // Convert ArrayBuffer to base64
        const base64String = arrayBufferToBase64(response.data);
        return `data:image/png;base64,${base64String}`;
      } catch (error) {
        console.error('Error fetching image:', error);
        return null;
      }
    };
  
    // Function to convert ArrayBuffer to base64
    const arrayBufferToBase64 = (buffer) => {
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    const handleImageClick = (imageUrl) => {
        setModalImageSrc(imageUrl);
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };


    const columns = [
        {
            title: "Address",
            dataIndex: "addressName",
            key: "address",
        },
        {
            title: "Type",
            dataIndex: "typeName",
            key: "type",
        },
        {
            title: "Subtype",
            dataIndex: "subtypeName",
            key: "subtype",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
       /* {
            title: "LONGITUDE",
            dataIndex: "addressLongitude",
            key: "longitude",
        },
        {
            title: "LATITUDE",
            dataIndex: "addressLatitude",
            key: "latitude",
        },
        */
        {
            title: "Created at",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => (
                new Date(createdAt).toLocaleString()
            )
        },
        {
            title: "Image",
            dataIndex: "pictureId",
            key: "imageUrl",
            render: (pictureId) => {
              const imageUrl = imageData[pictureId];
              return (
                imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Image"
                    style={{ maxWidth: "100px", cursor: "pointer" }}
                    onClick={() => handleImageClick(imageUrl)}
                  />
                )
              );
            },
          },
    ];
    /*
        const data = [
            { id: 1, address: "123 Main St", type: "incident1", subtype: "podtip1", description: "fioajfioajfoiafioJFJFLKAJJLKGJL", imageUrl: "", longitude: 78.0, latitude: 12.80 },
            { id: 2, address: "456 Elm St", type: "incident2", subtype: "podtip22", description: "Another incident description", imageUrl: "", longitude: 78.0, latitude: 12.80 },
            { id: 3, address: "789 Oak St", type: "incident3", subtype: "podtip333", description: "Yet another incident description", imageUrl: "", longitude: 78.0, latitude: 12.80 },
        ];
        */

    return (
        <div>
            <Table dataSource={data} columns={columns} />
            <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={800}
      >
        <img src={modalImageSrc} alt="Image" style={{ width: "100%" }} />
      </Modal>
        </div>
    );
};

export default IncidentsTable;
