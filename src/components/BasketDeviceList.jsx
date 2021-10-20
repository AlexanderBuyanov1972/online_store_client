import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import BasketDeviceItem from "./basketDeviceItem/BasketDeviceItem";

const BasketDeviceList = observer(() => {
    const { deviceStore } = useContext(Context)
    return (
        <Row className="d-flex">
            {deviceStore.basketDevices.map(item =>
                <BasketDeviceItem key={item.id} basketDevice={item} />)}
        </Row>
    )
});

export default BasketDeviceList