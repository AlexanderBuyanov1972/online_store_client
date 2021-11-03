import React, {useContext} from 'react'
import { Context } from '../..';
import { beautifulViewPrice } from '../../utils/helpFunctions';
import styles from './FavoriteDeviceItem.module.css'
import { Button } from "react-bootstrap";
import {removeOneFavoriteDevice} from '../../http/favoriteDeviceAPI'

const FavoriteDeviceItem = ({ favoriteDevice }) => {
    
    const { userStore} = useContext(Context)

    const removeFavoriteDevice = () => {
        removeOneFavoriteDevice(userStore.user.id, favoriteDevice.id)
            .then(data => { }).catch(err => alert(err.message))
    }
    const checkout = () => {
        alert('заказ оформлен')
    }

    return (
        <div className={styles.main} >
            <div>
                <p>Наименование: {favoriteDevice.name}</p>
                <p>Цена : {beautifulViewPrice(favoriteDevice.price)}</p>
                <hr />
            </div>
            <div>
                <Button bg="danger" onClick={removeFavoriteDevice}>Удалить</Button>
                <Button bg="success" onClick={checkout}>Купить</Button>
            </div>
        </div>

    );
};

export default FavoriteDeviceItem