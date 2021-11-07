import React from 'react';
import styles from './DeviceItem.module.css'
import { Card, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import star from "../../assets/star_rating.png"

const DeviceItem = ({ device }) => {
    const history = useHistory()

    const goToDeviceRoute = (value) => {
        history.push(DEVICE_ROUTE + '/' + value.id)
    }

    return (
        <Card onClick={() => goToDeviceRoute(device)}>
            <div className={styles.container}>
            <Image src={process.env.REACT_APP_API_URL + device.img} className={styles.img} />
            <div className='text-black-50 mt-2 d-flex justify-content-between align-items-center'>
                <div className="d-flex align-items-center p-2">
                    <div>{device.rating}</div>
                    <Image width={18} height={18} src={star} />
                </div>
            </div>
            <div className={styles.name}>
                {device.name}
            </div>
            <div className={styles.price}>
                Цена: {device.price} UAH
            </div>
            </div>
        </Card>
    );
};

export default DeviceItem;