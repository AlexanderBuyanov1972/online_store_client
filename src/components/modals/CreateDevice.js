import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice} from "../../http/deviceAPI";
import {fetchTypes} from "../../http/typeAPI";
import {fetchBrands} from "../../http/brandAPI";
import {observer} from "mobx-react-lite";
import object from "../../utils/formForType";

const CreateDevice = observer(({show, onHide}) => {
    const {deviceStore} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data))
        fetchBrands().then(data => deviceStore.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: "", description: "", id: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.id !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(item => item.id === number ? {...item, [key]: value} : item))
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', deviceStore.selectedBrand.id)
        formData.append('typeId', deviceStore.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data =>
            onHide()
        )
    }

    const setFormForType = (name) => {
        const array = object[name.trim()]
        const newInfo = []
        for (let i = 0; i < array.length; i++) {
            newInfo.push({title: array[i], description: '', id: Date.now() + i})
        }
        console.log(newInfo)
        setInfo(newInfo)
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
                    Добавить новое устройство
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
                                    onClick={() => {
                                        deviceStore.setSelectedType(type)
                                        setFormForType(type.name);
                                    }}
                                >{type.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{deviceStore.selectedBrand.name || 'Выбери брэнд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => deviceStore.setSelectedBrand(brand)}
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
                    <hr/>
                    <Button variant={'outline-dark'} onClick={addInfo}>Добавить новое свойство</Button>
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
                                    <Button disabled={i.title !== ''} variant={'outline-danger'}
                                            onClick={() => removeInfo(i.id)}>
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
});

export default CreateDevice;