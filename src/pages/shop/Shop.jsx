import React, { useContext, useEffect, useState } from 'react';
import styles from './Shop.module.css';
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../../components/TypeBar";
import BrandBar from "../../components/BrandBar";
import DeviceList from "../../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { fetchTypes } from "../../http/typeAPI";
import { fetchBrands } from "../../http/brandAPI";
import { fetchDevices } from "../../http/deviceAPI";
import Pages from "../../components/Pages";
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
        <Container>
            <Row className={styles.row}>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;