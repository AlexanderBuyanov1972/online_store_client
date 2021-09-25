import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";

const DevicePage = () => {
    const device = {
        id: 1,
        name: "Iphone 12 Pro",
        price: 15000,
        rating: 5,
        img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
    }
    return (
        <Container className="mt-3">
            <Col md={4}>
                <Image width={300} height={300} src={device.img}/>
            </Col>
            <Col md={4}>
                <Row>
                    <h2>{device.name}</h2>
                    <div className="d-flex justify-content-center align-items-center">
                        {device.rating}
                    </div>
                </Row>
            </Col>
            <Col md={4}>

            </Col>
        </Container>
    );
};

export default DevicePage;