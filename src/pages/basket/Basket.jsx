import React, { useContext, useEffect, useState } from 'react';
import styles from './Basket.module.css'
import { fetchAllBasketDevice } from '../../http/basketDeviceAPI';
import { Context } from "../../index";
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Spinner } from "react-bootstrap";
import { beautifulViewPrice } from '../../utils/helpFunctions'
import { useHistory } from "react-router-dom";
import { ORDERING_ROUTE } from '../../routes/routesConsts';
import BasketDeviceItem from '../../components/items/basketDeviceItem/BasketDeviceItem';
import ObjectList from '../../components/objectList/ObjectList';

const Basket = observer(() => {
    const { userStore, deviceStore } = useContext(Context)
    const totalPrice = deviceStore.totalPrice

    const [loading, setLoading] = useState(true)
    const [basketDevices, setBasketDevices] = useState([])
    const [, setTotalPrice] = useState(0)

    const history = useHistory()

    useEffect(() => {
        fetchAllBasketDevice(userStore.user.id)
            .then(data => {
                setBasketDevices(data.result)
                deviceStore.setTotalPrice(data.totalPrice)
            })
            .finally(() => setLoading(false))
    }, [])


    const makeOrder = () => {
        history.push(ORDERING_ROUTE)
    }

    const objectsJSX = []
    for (let i = 0; i < basketDevices.length; i++) {
        objectsJSX.push(<BasketDeviceItem object={basketDevices[i]} />)
    }

    if (loading) {
        return <Spinner animation={"white"} />
    }
    return (
        <div className={styles.container}>
            <div className={styles.col + " " + styles.a}>
                <ObjectList objectsJSX={objectsJSX} list={'basketList'} />
            </div>
            <div className={styles.col + " " + styles.b}>
                <div className={styles.text}>Итоговая цена</div>
                <div style={{ color: 'red', fontSize: 25 }}>{beautifulViewPrice(totalPrice)}</div>
            </div>
            <div className={styles.col + " " + styles.c}>
                <Button className={styles.button} variant="outline-success" onClick={makeOrder} size="lg">Оформить заказ</Button>
            </div>
        </div>
    );
});

export default Basket;