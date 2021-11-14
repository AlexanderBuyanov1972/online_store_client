import React, { useContext, useState } from 'react'
import { Context } from '../../..';
import { beautifulViewPrice } from '../../../utils/helpFunctions';
import styles from './WishDeviceItem.module.css'
import { Button, Image } from "react-bootstrap";
import { removeOneFavoriteDevice } from '../../../http/favoriteDeviceAPI'
import { useHistory } from 'react-router-dom';
import { BASKET_ROUTE } from '../../../routes/routesConsts';
import { createBasketDevice } from '../../../http/basketDeviceAPI';

const WishDeviceItem = ({ object }) => {
    const { userStore } = useContext(Context)
    const [visible, setVisible] = useState(false)
    const history = useHistory()

    const removeWishDevice = () => {
        removeOneFavoriteDevice(userStore.user.id, object.id)
            .then(() => setVisible(true))
            .catch(err => alert(err.message))

    }
    const addDeviceToBasket = () => {
        createBasketDevice(userStore.user.id, object.id)
            .then(data => {
                removeOneFavoriteDevice(userStore.user.id, object.id).then(data => history.push(BASKET_ROUTE))
            })
            .catch(err => alert(err.message))
    }

    return (
        <div className={styles.container} hidden={visible} >
            <div className={styles.col + " " + styles.a}>
                <Image src={process.env.REACT_APP_API_URL + object.img} alt='Not Found' rounded className={styles.img} />
            </div>
            <div className={styles.col + " " + styles.b}>
                <p>Наименование: {object.name}</p>
                <p>Цена : {beautifulViewPrice(object.price)}</p>
            </div>
            <div className={styles.col + " " + styles.c}>
                <div className={styles.ca}>
                    <Button className={styles.button} variant="outline-success" onClick={addDeviceToBasket}>Добавить в корзину</Button>
                </div>
                <div className={styles.cb}></div>
                <div className={styles.cc}>
                    <Button className={styles.button} variant="outline-danger" onClick={removeWishDevice}>Удалить</Button>
                </div>
            </div>
        </div>

    );
};

export default WishDeviceItem