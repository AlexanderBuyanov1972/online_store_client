import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Context } from '../..'
import styles from './Ordering.module.css'
import {fetchAllBasketDevice} from '../../http/basketDeviceAPI'

const Ordering = () => {
    const { userStore } = useContext(Context)
    const [basketDevices, setBasketDevices] = useState('')
    const [firmOption, setFirmOption] = useState('')
    const [deliveryOption, setDeliveryOption] = useState('')
    const [visibleDelivery, setVisibleDelivery] = useState(false)
    const firmOptions = [
        { id: '1', name: 'Забрать у нас в офисе' },
        { id: '2', name: 'Meest' },
        { id: '3', name: 'Новая почта' },
        { id: '4', name: 'Delivery' },
        { id: '5', name: 'Укрпочта' },
    ]
    const deliveryOptions = [
        { id: '1', name: 'Самовывоз из отделения' },
        { id: '2', name: 'Почтомат' },
        { id: '3', name: 'Доставка курьером' },
    ]

    useEffect(()=>{
        fetchAllBasketDevice(userStore.user.id).then(data => setBasketDevices(data))
    }, [])

    const onChangeFirmOptions = (value) => {
        setFirmOption(value)
        setVisibleDelivery(true)
    }

    const onChangeDeliveryOptions = (value) => {
        setDeliveryOption(value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.col + " " + styles.h}>
                <h3 className={styles.text}>Оформление заказа</h3>
            </div>
            <div className={styles.col + " " + styles.a}>
                <div>Личные данные</div>
                <div>Информация о заказе</div>
                <div>Ваш заказ</div>
            </div>
            <div className={styles.col + " " + styles.b1}>
                <Form.Label>Варианты доставки</Form.Label>
                <Form.Select className="me-sm-2" onChange={(event) => onChangeFirmOptions(event.target.value)}>
                    {firmOptions.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>

                {setVisibleDelivery &&
                    <div>
                        <Form.Label>Варианты доставки</Form.Label>
                        <Form.Select className="me-sm-2" onChange={(event) => onChangeDeliveryOptions(event.target.value)}>
                            {deliveryOptions.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                            }
                        </Form.Select>
                    </div>
                }
            </div>
            <div className={styles.col + " " + styles.b2}></div>
            <div className={styles.col + " " + styles.b3}></div>
            <div className={styles.col + " " + styles.c}></div>
        </div>
    )
}

export default Ordering