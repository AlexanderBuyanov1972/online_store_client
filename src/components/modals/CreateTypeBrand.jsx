import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { validTypeBrand } from '../../utils/validations'
import Validation from '../validation/Validation'

const CreateTypeBrand = ({ show, onHide, createTypeBrand, textTypeBrand }) => {
    const [value, setValue] = useState('')
    const [validValue, setValidValue] = useState({ flag: false, message: true })
    const [flagButtonAdd, setFlagButtonAdd] = useState(false)

    useEffect(() => {
        setFlagButtonAdd(validValue.flag)
    }, [validValue])


    const onChangeValue = (str) => {
        setValue(str)
        validTypeBrand(str).then(data =>
            setValidValue(data)
        )
    }


    const addTypeBrand = () => {
        createTypeBrand({ name: value.trim() }).then(data => {
            setValue('')
            onHide()
        })
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
                    Добавить новый {textTypeBrand}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={`Введите название ${textTypeBrand}`}
                        value={value}
                        onChange={(e) => onChangeValue(e.target.value)}
                    />
                </Form>
                <Validation validField={validValue} field={value} message={''}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрывать</Button>
                <Button variant={'outline-success'} onClick={addTypeBrand} disabled={!flagButtonAdd}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTypeBrand;