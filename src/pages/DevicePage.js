import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import star from "../assets/star_rating.png"
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { Context } from "../index";
import UpdateDevice from "../components/modals/UpdateDevice";
import { fetchOneType } from "../http/typeAPI";
import { fetchOneBrand } from "../http/brandAPI";

const DevicePage = () => {
    const { id } = useParams()
    const [visible, setVisible] = useState(false)
    const { userStore } = useContext(Context)
    const [device, setDevice] = useState({ id: 0, name: '', img: '', rating: 0, info: [] })
    const [rating, setRating] = useState(0)
    const [flagRating, setFlagRating] = useState(false)

    const [type, setType] = useState({})
    const [brand, setBrand] = useState({})
    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data)
            setRating(data.rating)
            fetchOneType(data.typeId).then(data => setType(data))
            fetchOneBrand(data.brandId).then(data => setBrand(data))
        })

    }, [])

    const clickRating = () => {
        if (flagRating) {
            setFlagRating(false)
            setRating(rating - 1)
        } else {
            setFlagRating(true)
            setRating(rating + 1)
        }
    }
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2 className='text-center'>{device.name}</h2>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                background: `url(${star}) no-repeat center center`,
                                width: 240, height: 240, backgroundSize: 'cover', fontSize: 64
                            }}
                            onClick={() => clickRating()}
                        >
                            <div style={{
                                fontSize: 50,
                                color: flagRating? 'red': 'black'
                            }}>
                                {rating}
                            </div>

                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}>
                        <h3>{device.price} grn.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <div></div>
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id}
                        style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title} : {info.description}
                    </Row>)}
            </Row>
            <Row>

                <Button hidden={!userStore.isAdmin} variant={'outline-dark'} className='mt-4 p-2'
                    onClick={() => setVisible(true)}>Обновить
                    устройство</Button>

            </Row>
            <hr />
            <UpdateDevice device={device}
                typeOld={type}
                brandOld={brand}
                show={visible} onHide={() => setVisible(false)} />
        </Container>
    );
};

export default DevicePage;