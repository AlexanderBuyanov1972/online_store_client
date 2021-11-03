import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from '../../..';
import { fetchBrands } from '../../../http/brandAPI';
import { fetchTypes } from '../../../http/typeAPI';
import { validTypeBrand } from '../../../utils/validations'
import Validation from '../../validation/Validation'
import styles from './CreateUpdateTypeBrand.module.css'

const CreateUpdateTypeBrand = ({ show, onHide, cb, textTitle, textButton }) => {
    const { deviceStore } = useContext(Context)

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [typeBrand, setTypeBrand] = useState('')


    const [validName, setValidName] = useState({ flag: false, message: "" })
    const [flagButtonAdd, setFlagButtonAdd] = useState(false)
    const [flagUpdate, setFlagUpdate] = useState(false)

    useEffect(() => {
        if (textTitle === 'Обновить тип')
            fetchTypes().then(data => deviceStore.setTypes(data.filter(i => i.id !== 1)))
        if (textTitle === 'Обновить бренд')
            fetchBrands().then(data => deviceStore.setBrands(data.filter(i => i.id !== 1)))
    }, [flagUpdate])

    useEffect(() => {
        setFlagButtonAdd(validName.flag)
    }, [validName])


    const onChangeName = (str) => {
        setName(str)
        validTypeBrand(str).then(data => setValidName(data))
    }


    const addTypeBrand = () => {
        if (textTitle === 'Добавить тип' || textTitle === 'Добавить бренд') {
            cb({ name: name.trim() }).then(data => close())
        }
        if (textTitle === 'Обновить тип' || textTitle === 'Обновить бренд') {
            cb(id, { name: name.trim() }).then(data => {
                setFlagUpdate(true)
                close()
            })
        }
    }
    const close = () => {
        setId('')
        setName('')
        setTypeBrand({})
        setValidName({})
        setFlagUpdate(false)
        onHide()
    }

    const onChange = (item) => {
        setId(item.id)
        setName(item.name)
        setTypeBrand(item)
    }
  
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    {textTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {textTitle === 'Обновить тип' &&
                        <Dropdown className='mt-2 mb-2' >
                            <Dropdown.Toggle>{typeBrand.name || 'Выбери тип'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {deviceStore.types.map(i =>
                                    <Dropdown.Item key={i.id} onClick={() => onChange(i)}
                                    >{i.name}</Dropdown.Item>)}z
                            </Dropdown.Menu>
                        </Dropdown>}
                    {textTitle === 'Обновить бренд' &&
                        <Dropdown className='mt-2 mb-2'>
                            <Dropdown.Toggle>{typeBrand.name || 'Выбери брэнд'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {deviceStore.brands.map(i =>
                                    <Dropdown.Item
                                        key={i.id}
                                        onClick={() => onChange(i)}
                                    >{i.name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>}
                    <hr />
                    <Form.Control
                        placeholder={'Введите наименование'}
                        value={name}
                        onChange={(e) => onChangeName(e.target.value)}
                    />
                </Form>
                <Validation validField={validName} field={name} message={''} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={close}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={addTypeBrand} disabled={!flagButtonAdd}>{textButton}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUpdateTypeBrand;