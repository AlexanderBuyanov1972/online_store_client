import React, { useContext, useEffect, useState } from 'react';
import styles from './DevicePage.module.css';
import star from "../../assets/star_rating.png"
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../../http/deviceAPI";
import { Context } from "../../index";
import UpdateDevice from "../../components/modals/UpdateDevice";
import { fetchOneType } from "../../http/typeAPI";
import { fetchOneBrand } from "../../http/brandAPI";
import { Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createBasketDevice } from '../../http/basketDeviceAPI';
import { BASKET_ROUTE } from '../../utils/consts';
import { useHistory } from "react-router-dom";
import { beautifulViewPrice } from '../../utils/helpFunctions'



const DevicePage = observer(() => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const { userStore } = useContext(Context)
    const { deviceStore } = useContext(Context)
    const [visible, setVisible] = useState(false)
    const [device, setDevice] = useState({ name: '', price: '', info: [] })
    const [rating, setRating] = useState(0)
    const [flagRating, setFlagRating] = useState(false)
    const history = useHistory()

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            deviceStore.setSelectedDevice(data)
            fetchOneType(data.typeId).then(data => deviceStore.setSelectedType(data))
            fetchOneBrand(data.brandId).then(data => deviceStore.setSelectedBrand(data))
            setDevice(data)
            setRating(data.rating)
        }).finally(() => setLoading(false))

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

    const addDeviceToBasket = () => {
        createBasketDevice(userStore.user.id, id)
        .then(data => history.push(BASKET_ROUTE))
        .catch(err => console.log(err.message))
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <Container className={styles.container}>
            <Row>
                <Col md={4}>
                    <Image className={styles.col1_img} src={process.env.REACT_APP_API_URL + device.img} />
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
                                color: flagRating ? 'red' : 'black'
                            }}>
                                {rating}
                            </div>
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className={styles.col3_card}>
                        <h3>{beautifulViewPrice(device.price)}</h3>
                        <Button
                            variant={"outline-dark"} onClick={addDeviceToBasket}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={styles.row2}>
                <div></div>
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id}
                        style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title} : {info.description}
                    </Row>)}
            </Row>
            <Row>

                <Button hidden={!userStore.isAdmin} variant={'outline-dark'} className={styles.row3_button}
                    onClick={() => setVisible(true)}>Обновить
                    устройство</Button>

            </Row>
            <hr />
            <UpdateDevice show={visible} onHide={() => setVisible(false)} />
        </Container>
    );
});

export default DevicePage;