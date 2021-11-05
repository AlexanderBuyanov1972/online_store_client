import React, { useContext, useEffect, useState } from 'react';
import styles from './Shop.module.css';
import { Container } from "react-bootstrap";
import TypeBar from "../../components/typeBar/TypeBar";
import BrandBar from "../../components/brandBar/BrandBar";
import DeviceList from "../../components/deviceList/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchTypes } from "../../http/typeAPI";
import { fetchBrands } from "../../http/brandAPI";
import { fetchDevices } from "../../http/deviceAPI";
import Pages from "../../components/pages/Pages";
import { Spinner } from "react-bootstrap";

const Shop = observer(() => {
    const { deviceStore } = useContext(Context)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data))
        fetchBrands().then(data => deviceStore.setBrands(data))
        fetchDevices(null, null, 1, deviceStore.limit).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        }).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        fetchDevices(deviceStore.selectedType.id, deviceStore.selectedBrand.id,
            deviceStore.pageCurrent, deviceStore.limit).then(data => {
                deviceStore.setDevices(data.rows)
                deviceStore.setTotalCount(data.count)
            })
    }, [deviceStore.pageCurrent, deviceStore.selectedType, deviceStore.selectedBrand])


    if (loading) {
        return <Spinner animation={"grow"} />
    }
    return (
        <Container className={styles.container}>
            <div className={styles.box1}><BrandBar /></div>
            <div className={styles.box2}><TypeBar /></div>
            <div className={styles.box3}><DeviceList /></div>
            <div className={styles.box4}><Pages /></div>
        </Container>
    );
});

export default Shop;