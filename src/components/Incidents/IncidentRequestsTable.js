import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import IncidentService from "../../services/IncidentService";
import MapRejected from "../Maps/MapRejected";

const IncidentRequestsTable = () => {
    const [isModalApprovingVisible, setIsModalApprovingVisible] = useState(false);
    const [isModalRejectingVisible, setIsModalRejectingVisible] = useState(false);
    const [isModalDeletingVisible, setIsModalDeletingVisible] = useState(false);
    const [isModalRejectedReqVisible, setIsModalRejectedReqVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [dataNotApproved, setDataNotApproved] = useState([]);
    const [dataRejected, setDataRejected] = useState([]);


    useEffect(() => {
        IncidentService.getAllNotApproved()
            .then((res) => {
                console.log(res);
                setDataNotApproved(res.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
        IncidentService.getAllRejected()
            .then((res) => {
                console.log(res);
                setDataRejected(res.data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

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
        {
            title: "Longitude",
            dataIndex: "addressLongitude",
            key: "longitude",
        },
        {
            title: "Latitude",
            dataIndex: "addressLatitude",
            key: "latitude",
        },
        {
            title: "Created at",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => (
                new Date(createdAt).toLocaleString()
            )
        },
        {
            title: "Approvement",
            key: "approve",
            render: (text, record) => {
                if (record.isApproved) {
                    return "Approved";
                } else {
                    return (
                        <>
                            <Button onClick={() => handleApproveClick(record)}>Approve</Button>
                            <Button onClick={() => handleRejectClick(record)}>Reject</Button>
                        </>
                    );
                }
            },
        },
    ];

    const columns1 = [
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
        {
            title: "Longitude",
            dataIndex: "addressLongitude",
            key: "longitude",
        },
        {
            title: "Latitude",
            dataIndex: "addressLatitude",
            key: "latitude",
        },
        {
            title: "Created at",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => (
                new Date(createdAt).toLocaleString()
            )
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, record) => {
                if (record.isDeleted) {
                    return "Deleted";
                } else {
                    return (
                        <Button onClick={() => handleDeleteClick(record)}>Delete</Button>
                    );
                }
            },
        },
        {
            title: "Approve",
            key: "approve",
            render: (text, record) => {
                if (record.isApproved) {
                    return "Approved";
                } else {
                    return (
                        <Button onClick={() => handleApproveClick1(record)}>Approve</Button>
                    );
                }
            },
        }
    ];

    const handleApproveClick = (record) => {
        setSelectedRowData(record);
        setIsModalApprovingVisible(true);
        console.log("approwing item with id" + record.id);
        IncidentService.approveIncident(record.id)
            .then(() => {
                setDataNotApproved(dataNotApproved.filter(item => item.id !== record.id));
            });
    };
    const handleApproveClick1 = (record) => {
        setSelectedRowData(record);
        setIsModalApprovingVisible(true);
        console.log("approwing item with id" + record.id);
        IncidentService.approveIncident(record.id)
            .then(() => {
                setDataRejected(dataRejected.filter(item => item.id !== record.id));
            });
    };

    const handleRejectClick = (record) => {
        console.log("rejecting " + record.id);
        setSelectedRowData(record);
        setIsModalRejectingVisible(true);
        IncidentService.rejectIncident(record.id)
            .then(() => {
                setDataNotApproved(dataNotApproved.filter(item => item.id !== record.id));
                
                const updatedDataRejected = [...dataRejected, record];

                // Update the state with the new data
                setDataRejected(updatedDataRejected);
            });
        }

    const handleDeleteClick = (record) => {
        setSelectedRowData(record);
        setIsModalDeletingVisible(true);
        // Handle delete action here
        console.log(`Deleting item with ID: ${record.id}`);
        IncidentService.deleteIncident(record.id)
            .then(() => {
                setDataRejected(dataRejected.filter(item => item.id !== record.id));
            });
    };

    const handleModalApprovingOk = () => {
        console.log(`Approving item with ID: ${selectedRowData.id}`);
        setIsModalApprovingVisible(false);
    };

    const handleModalRejectedReqOk = () => {
        setIsModalRejectedReqVisible(false);
    };

    const handleModalRejectedReqCancel = () => {
        setIsModalRejectedReqVisible(false);
    };
    const handleModalRejectingOk = () => {
        setIsModalRejectingVisible(false);
    };

    const handleModalRejectingCancel = () => {
        setIsModalRejectingVisible(false);
    };

    return (
        <>
            <section style={{ position: "relative", width: "100%", height: "100px" }}>
                <Button
                    style={{ position: "absolute", top: 0, right: 0 }}
                    type="primary"
                    onClick={() => setIsModalRejectedReqVisible(true)}
                >
                    VIEW REJECTED REQUESTS
                </Button>
            </section>
            <div>
                <Table dataSource={dataNotApproved} columns={columns} />

                <Modal
                    title="Approving incident:"
                    visible={isModalApprovingVisible}
                    onOk={handleModalApprovingOk}
                    onCancel={() => setIsModalApprovingVisible(false)}
                >
                    {selectedRowData && (
                        <ul>
                            <li>Address: {selectedRowData.addressName}</li>
                            <li>Type: {selectedRowData.typeName}</li>
                        </ul>
                    )}
                </Modal>
                <Modal
                    title="Rejecting incident:"
                    visible={isModalRejectingVisible}
                    onOk={handleModalRejectingOk}
                    onCancel={() => setIsModalRejectingVisible(false)}
                >
                    {selectedRowData && (
                        <ul>
                            <li>Address: {selectedRowData.addressName}</li>
                            <li>Type: {selectedRowData.typeName}</li>
                        </ul>
                    )}
                </Modal>

                <Modal
                    title="Rejected incidents"
                    visible={isModalRejectedReqVisible}
                    onOk={handleModalRejectedReqOk}
                    onCancel={handleModalRejectedReqCancel}
                    width="70%"
                >
                    <Table
                        dataSource={dataRejected}
                        columns={columns1}
                    />
                    <MapRejected data={dataRejected}/>
                     <Modal
                    title="Deleting incident:"
                    visible={isModalDeletingVisible}
                    onOk={() => setIsModalDeletingVisible(false)}
                    onCancel={() => setIsModalDeletingVisible(false)}
                >
                    {selectedRowData && (
                        <ul>
                            <li>Address: {selectedRowData.addressName}</li>
                            <li>Type: {selectedRowData.typeName}</li>
                        </ul>
                    )}
                </Modal>
                </Modal>
            </div>
        </>
    );
};

export default IncidentRequestsTable;
