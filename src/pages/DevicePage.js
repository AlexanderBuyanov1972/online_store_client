import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from "../assets/star_rating.png"

const DevicePage = () => {
    const device = {
        id: 1,
        name: "Iphone 12 Pro",
        price: 15000,
        rating: 5,
        img: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_7610_2.webp'
    }
    const description = [
        {title: 'Оперативная память', description: '5 Гб'},
        {title: 'Камера', description: '12 Mpx'},
        {title: 'Процессор', description: 'Pentium 3'},
        {title: 'Количество ядер', description: '2'},
        {title: 'Аккумулятор', description: '4000'},
        ]
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2 className='text-center'>{device.name}</h2>
                        <div className="d-flex justify-content-center align-items-center"
                             style={{
                                 background: `url(${star}) no-repeat center center`,
                                 width: 240, height: 240, backgroundSize: 'cover', fontSize: 64
                             }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className="d-flex flex-column align-items-center justify-content-around"
                    style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
                        <h3>{device.price} grn.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {description.map((info, index) =>
                    <Row key={info.id}
                         style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title} : {info.description}
                    </Row>)}
            </Row>
        </Container>
    );
};

export default DevicePage;