import React, { useContext, useState } from 'react'
import { beautifulViewPrice } from '../../utils/helpFunctions'
import { ButtonGroup, Button } from 'react-bootstrap'
import { Context } from "../../index"
import styles from './BasketDeviceItem.module.css'
import { createBasketDevice, removeGroupBasketDevice, removeOneBasketDevice } from '../../http/basketDeviceAPI'


const BasketDeviceItem = ({ basketDevice }) => {
    const [count, setCount] = useState(basketDevice.count)
    const [flagGroup, setFlagGroup] = useState(false)
    const { userStore, deviceStore } = useContext(Context)

    const plusCount = () => {
        createBasketDevice(userStore.user.id, basketDevice.device.id)
            .then(data => {
                setCount(count + 1)
                deviceStore.setTotalPrice(deviceStore.totalPrice + basketDevice.device.price)
            })
            .catch(err => console.log(err.message))
    }

    const minusCount = () => {
        if (count > 0) {
            removeOneBasketDevice(userStore.user.id, basketDevice.device.id)
                .then(data => {
                    setCount(count - 1)
                    deviceStore.setTotalPrice(deviceStore.totalPrice - basketDevice.device.price)
                })
                .catch(err => console.log(err.message))
        }
    }

    const deleteBasketDeviceGroup = () => {
        removeGroupBasketDevice(userStore.user.id, basketDevice.device.id)
            .then(data => {
                setFlagGroup(true)
                deviceStore.setTotalPrice(deviceStore.totalPrice - count * basketDevice.device.price)
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className={styles.main} hidden={flagGroup}>
            <div>
                <p>Наименование: {basketDevice.device.name}</p>
                <p>Количество: {basketDevice.count}</p>
                <p>Цена за 1 шт. : {beautifulViewPrice(basketDevice.device.price)}</p>
                <p>Цена за {count} шт. : {beautifulViewPrice
                    (basketDevice.device.price * count)}</p>
                <hr />
            </div>
            <div>
                <ButtonGroup>
                    <Button variant="light" onClick={plusCount}>+</Button>
                    <Button variant="light">{count}</Button>
                    <Button variant="light" onClick={minusCount}>-</Button>
                </ButtonGroup>
                <Button bg="danger" onClick={deleteBasketDeviceGroup}>Удалить</Button>
            </div>
        </div>

    );
};

export default BasketDeviceItem