import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchTypes} from "../http/typeAPI";
import {fetchBrands} from "../http/brandAPI";
import {fetchDevices} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {deviceStore} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data)).finally()
        fetchBrands().then(data => deviceStore.setBrands(data)).finally()
        fetchDevices(null, null, 1, 3).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(deviceStore.selectedType.id, deviceStore.selectedBrand.id,
            deviceStore.pageCurrent, 2).then(data => {
            deviceStore.setDevices(data.rows)
            deviceStore.setTotalCount(data.count)
        })
    }, [deviceStore.pageCurrent, deviceStore.selectedType, deviceStore.selectedBrand])
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;