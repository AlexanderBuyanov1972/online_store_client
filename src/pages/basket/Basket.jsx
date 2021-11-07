import React, { useContext, useEffect, useState } from 'react';
import styles from './Basket.module.css'
import BasketDeviceList from '../../components/basketDeviceList/BasketDeviceList'
import { fetchAllBasketDevice } from '../../http/basketDeviceAPI';
import { Context } from "../../index";
import { Container, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Spinner } from "react-bootstrap";
import {beautifulViewPrice} from '../../utils/helpFunctions'




const Basket = observer(() => {
    const { deviceStore, userStore } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const totalPrice = deviceStore.totalPrice

    useEffect(() => {
        fetchAllBasketDevice(userStore.user.id)
            .then(data => {
                deviceStore.setBasketDevices(data)
                deviceStore.setTotalPrice(getTotalPrice(data))
            })
            .finally(() => setLoading(false))
    }, [])

    const getTotalPrice = (arrayObjects) => {
        let result = 0
        for (let i = 0; i < arrayObjects.length; i++) {
            result = result + arrayObjects[i].device.price * arrayObjects[i].count
        }
        return result
    }

    const makeOrder = () => {
        alert('Заказ оформлен')
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }
    return (
        <Container>
            <BasketDeviceList />
            <div className='d-flex justify-content-between'>
                <div>Итоговая цена</div>
                <div style={{color:'red', fontSize: 25}}>{beautifulViewPrice(totalPrice)}</div>
            </div>
            <Button variant="success" onClick={makeOrder}>Оформить заказ</Button>
        </Container>
    );
});

export default Basket;