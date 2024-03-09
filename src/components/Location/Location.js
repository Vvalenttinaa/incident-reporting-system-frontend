import { useState } from "react";

const Location = (props) => {

    return(
        <>
        <div>Lagnitude: {props.lagnitude}</div>
        <div>Longitude: {props.longitude}</div>
        <div>Address: {props.address}</div>
        </>
    );

};


export default Location;