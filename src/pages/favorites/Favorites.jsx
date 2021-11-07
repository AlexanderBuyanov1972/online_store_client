import React, { useContext, useEffect, useState } from 'react'
import styles from './Favorites.module.css'
import { Context } from "../../index";
import { Container, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Spinner } from "react-bootstrap";
import { fetchAllFavoriteDevice } from '../../http/favoriteDeviceAPI';
import FavoriteDeviceList from '../../components/favoriteDeviceList/FavoriteDeviceList';

const Favorites = observer(() => {
    const { deviceStore, userStore } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAllFavoriteDevice(userStore.user.id)
            .then(data => deviceStore.setFavoriteDevices(data))
            .finally(() => setLoading(false))
    }, [])

    const makeOrder = () => {
        alert('Заказ оформлен')
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }
    return (
        <Container>
            <FavoriteDeviceList />
        </Container>
    );
});

export default Favorites
