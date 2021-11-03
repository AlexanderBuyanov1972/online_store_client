import React, { useContext } from 'react'
import { Context } from '../..';
import styles from './FavoriteDeviceList.module.css'
import FavoriteDeviceItem from '../favoriteDeviceItem/FavoriteDeviceItem'
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';

const FavoriteDeviceList = observer(() => {
    const { deviceStore } = useContext(Context)
    return (
        <Row className="d-flex">
            {deviceStore.favoriteDevices.map(item =>
                <FavoriteDeviceItem key={item.id} favoriteDevice={item} />)}
        </Row>
    )
});

export default FavoriteDeviceList