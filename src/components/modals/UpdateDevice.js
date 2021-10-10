import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import { updateDevice } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import object from "../../utils/formForType";

const UpdateDevice = observer(({ show, onHide, device, typeOld, brandOld }) => {
    const { deviceStore } = useContext(Context)
    const [name, setName] = useState('')
    const [type, setType] = useState({})
    const [brand, setBrand] = useState({})
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    // useEffect(()=> {
    //     setFormForType(type)
    // }, [info])

    const initialData = () => {
        setName(device.name)
        setType(typeOld)
        setBrand(brandOld)
        setPrice(device.price)
        setFile(device.img)
        setInfo([...device.info])
        setFormForType(typeOld)
    }

    const setFormForType = (type) => {
        if (type) {
            const array = object[type.name.trim()]
            const newInfo = []
            for (let i = 0; i < array.length; i++) {
                newInfo.push({ title: array[i], description: '', id: Date.now() + i })
            }
            setInfo(newInfo)
        }
    }

    const addInfo = () => {
        setInfo([...info, { title: "", description: "", id: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.id !== number))
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
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))
        updateDevice(device.id, formData).then(data =>
            onHide()
        )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить выбранное устройство
                </Modal.Title>
                <Button variant={'outline-dark'} onClick={initialData}>Загрузить исходные данные</Button>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{type.name || 'Выбери тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => {
                                        setType(type)
                                        setFormForType(type)
                                    }}
                                >{type.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{brand.name || 'Выбери брэнд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => setBrand(brand)}
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
                        type="number"
                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        value={price}
                        onChange={event => setPrice(Number(event.target.value))}
                    />
                    <Form.Control
                        type="file"
                        className='mt-3'
                        onChange={selectFile}
                    />
                    <hr />
                    <Button variant={'outline-dark'} onClick={addInfo}>Добавить новое свойство</Button>
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
                                    <Button variant={'outline-danger'} onClick={() => removeInfo(i.id)}>
                                        Удалить свойство
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрывать</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})


export default UpdateDevice;