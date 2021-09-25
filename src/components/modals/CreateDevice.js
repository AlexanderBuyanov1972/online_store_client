import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";

const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])
    const addInfo = () => {
        setInfo([...info, {title: "", description: "", number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter( i=> i.number !== number))
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
                        <Dropdown.Toggle>Выбери тип</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>Выбери брэнд</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control className='mt-3' placeholder='Введите название устройства'/>
                    <Form.Control type="number" className='mt-3' placeholder='Введите стоимость устройства'/>
                    <Form.Control type="file" className='mt-3'/>
                    <hr/>
                    <Button variant={'outline-dark'} onClick={addInfo}>Добавить новое свойство</Button>
                    {
                        info.map(i =>
                            <Row key={i.number} className='mt-3'>
                                <Col md={4}>
                                    <Form.Control placeholder='Введите название свойства'/>
                                </Col>
                                <Col md={4}>
                                    <Form.Control placeholder='Введите описание свойства'/>
                                </Col>
                                <Col md={4}>
                                    <Button variant={'outline-danger'} onClick={()=> removeInfo(i.number)}>
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
                <Button variant={'outline-success'} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;