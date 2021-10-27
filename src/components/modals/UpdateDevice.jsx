import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Dropdown } from "react-bootstrap";
import { Context } from "../../index";
import { updateDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { getFormForType } from "../../utils/formForType";
import { fetchTypes } from "../../http/typeAPI";
import { fetchBrands } from "../../http/brandAPI";

const UpdateDevice = observer(({ show, onHide }) => {
    const { deviceStore } = useContext(Context)
    const device = deviceStore.selectedDevice
    const type = deviceStore.selectedType
    const brand = deviceStore.selectedBrand
    const [name, setName] = useState(device.name)
    const [price, setPrice] = useState(device.price)
    const [rating, setRating] = useState(device.rating)
    const [file, setFile] = useState(device.img)
    const [info, setInfo] = useState(device.info)

    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data.filter(i => i.id !== 1)))
        fetchBrands().then(data => deviceStore.setBrands(data.filter(i => i.id !== 1)))
    }, [])

    const selectType = (value) => {
        deviceStore.setSelectedType(value)
        setInfo(getFormForType(value, info));
    }

    const selectBrand = (value) => {
        deviceStore.setSelectedBrand(value)
    }

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", id: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(getFormForType(type, [...info.filter(i => i.id !== number)]))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(item => item.id === number ? { ...item, [key]: value } : item))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('rating', `${rating}`)
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))
        updateDevice(device.id, formData).then(data => {
            onHide()
            window.location.reload();
        })
    }

    const closeModal = () => {
        setInfo(device.info)
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить выбранное устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{deviceStore.selectedType.name || 'Выбери тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => selectType(type)}
                                >{type.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{deviceStore.selectedBrand.name || 'Выбери брэнд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => selectBrand(brand)}
                                >{brand.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устройства'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <Form.Control

                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        value={price}
                        onChange={event => setPrice(Number(event.target.value))}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите рейтинг устройства'
                        value={rating}
                        onChange={event => setRating(Number(event.target.value))}
                    />
                    <Form.Control
                        type="file"
                        className='mt-3'
                        onChange={selectFile}
                        placeholder={device.img}
                    />
                    <hr />
                    <Button variant={'outline-dark'} onClick={() => addInfo()
                    }>Добавить новое свойство</Button>
                    <hr />
                    {
                        info.map(i =>
                            <Row key={i.id} className='mt-3'>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder='Введите название свойства'
                                        value={i.title}
                                        onChange={(event) =>
                                            changeInfo('title', event.target.value, i.id)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder='Введите описание свойства'
                                        value={i.description}
                                        onChange={(event) =>
                                            changeInfo('description', event.target.value, i.id)}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button variant={'outline-danger'} onClick={() => {
                                        removeInfo(i.id)
                                    }}>
                                        Удалить свойство
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={closeModal}
                >Закрывать</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})


export default UpdateDevice;