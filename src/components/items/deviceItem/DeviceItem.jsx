import React from 'react'
import styles from './DeviceItem.module.css'
import { Card, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../../../routes/routesConsts";
import star from "../../../assets/star_rating.png"
import { beautifulViewPrice } from '../../../utils/helpFunctions';

const DeviceItem = ({ object }) => {
    const history = useHistory()

    const goToDeviceRoute = (value) => {
        history.push(DEVICE_ROUTE + '/' + value.id)
    }

    return (
        <Card onClick={() => goToDeviceRoute(object)}>
            <div className={styles.container}>
            <Image src={process.env.REACT_APP_API_URL + object.img} className={styles.img} />
            <div className='text-black-50 mt-2 d-flex justify-content-between align-items-center'>
                <div className="d-flex align-items-center p-2">
                    <div>{object.rating}</div>
                    <Image width={18} height={18} src={star} />
                </div>
            </div>
            <div className={styles.name}>
                {object.name}
            </div>
            <div className={styles.price}>
                Цена: {beautifulViewPrice(object.price)}
            </div>
            </div>
        </Card>
    );
};

export default DeviceItem;