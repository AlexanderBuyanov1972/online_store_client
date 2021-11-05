import React from 'react';
import { Card, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import star from "../assets/star_rating.png"

const DeviceItem = ({ device }) => {
    const history = useHistory()

    const goToDeviceRoute = (value) => {
        history.push(DEVICE_ROUTE + '/' + value.id)
    }

    return (

        <Card style={{ width: 150, cursor: 'pointer' }} border={"light"} className='mt-3' onClick={() => goToDeviceRoute(device)}>
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
            <div className='text-black-50 mt-2 d-flex justify-content-between align-items-center'>
                <div className="d-flex align-items-center">
                    <div>{device.rating}</div>
                    <Image width={18} height={18} src={star} />
                </div>
            </div>
            <div>
                {device.name}
            </div>
        </Card>

    );
};

export default DeviceItem;