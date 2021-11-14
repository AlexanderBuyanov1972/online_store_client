import React, { useContext, useState } from 'react'
import { beautifulViewPrice } from '../../../utils/helpFunctions'
import { ButtonGroup, Button, Image } from 'react-bootstrap'
import { Context } from "../../../index"
import styles from './BasketDeviceItem.module.css'
import { createBasketDevice, removeGroupBasketDevice, removeOneBasketDevice } from '../../../http/basketDeviceAPI'


const BasketDeviceItem = ({ object }) => {
    const [count, setCount] = useState(object.count)
    const [visible, setVisible] = useState(false)
    const { userStore, deviceStore } = useContext(Context)

    const plusCount = () => {
        createBasketDevice(userStore.user.id, object.device.id)
            .then(data => {
                setCount(count + 1)
                deviceStore.setTotalPrice(deviceStore.totalPrice + object.device.price)
            })
            .catch(err => console.log(err.message))
    }

    const minusCount = () => {
        if (count > 0) {
            removeOneBasketDevice(userStore.user.id, object.device.id)
                .then(data => {
                    setCount(count - 1)
                    deviceStore.setTotalPrice(deviceStore.totalPrice - object.device.price)
                })
                .catch(err => console.log(err.message))
        }
    }

    const deleteBasketDeviceGroup = () => {
        removeGroupBasketDevice(userStore.user.id, object.device.id)
            .then(data => {
                setVisible(true)
                deviceStore.setTotalPrice(deviceStore.totalPrice - count * object.device.price)
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className={styles.container} hidden={visible} >
            <div className={styles.col + " " + styles.a}>
                <Image src={process.env.REACT_APP_API_URL + object.device.img} alt='Not Found' rounded className={styles.img} />
            </div>
            <div className={styles.col + " " + styles.b}>
                <p>Наименование: {object.device.name}</p>
                <p>Количество: {object.count}     Цена: {beautifulViewPrice(object.device.price)}</p>
                <p>Цена за {count} шт. : {beautifulViewPrice(object.device.price * count)}</p>
            </div>
            <div className={styles.col + " " + styles.c}>
                <div className={styles.ca}>
                    <ButtonGroup>
                        <Button className={styles.button} variant="light" onClick={plusCount}>+</Button>
                        <Button className={styles.button} variant="light">{count}</Button>
                        <Button className={styles.button} variant="light" onClick={minusCount}>-</Button>
                    </ButtonGroup>
                </div>
                <div className={styles.cb}></div>
                <div className={styles.cc}>
                    <Button className={styles.button} variant="outline-danger" onClick={deleteBasketDeviceGroup}>Удалить</Button>
                </div>
            </div>
        </div>
    )
}

export default BasketDeviceItem