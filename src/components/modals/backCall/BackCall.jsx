import React, { useEffect, useState } from 'react'
import styles from './BackCall.module.css'
import { Button, Modal, FormControl } from "react-bootstrap";
import { validFieldName, validFieldPhoneNumber, validFieldText } from '../../../utils/validations';
import Validation from '../../validation/Validation'


const BackCall = ({ show, onHide }) => {
    const objectValidStart = { flag: false, message: '' }
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [text, setText] = useState('')

    const [validName, setValidName] = useState(objectValidStart)
    const [validPhoneNumber, setValidPhoneNumber] = useState(objectValidStart)
    const [validText, setValidText] = useState(objectValidStart)

    const [flagButtonSubmit, setFlagButtonSubmit] = useState(false)

    const onChangeName = (value) => {
        setName(value)
        validFieldName(value).then(data =>
            setValidName(data)
        )
    }

    const onChangePhoneNumber = (value) => {
        setPhoneNumber(value)
        validFieldPhoneNumber(value).then(data =>
            setValidPhoneNumber(data)
        )
    }

    const onChangeText = (value) => {
        setText(value)
        validFieldText(value).then(data =>
            setValidText(data)
        )
    }

    useEffect(() => {
        setFlagButtonSubmit(validName.flag && validPhoneNumber.flag && validText.flag)
    }, [validName, validPhoneNumber, validText])

    const submit = () => {
        alert(JSON.stringify({ name, phoneNumber, text }))
        clean()
        onHide()
    }

    const clean = () => {
        setName('')
        setPhoneNumber('')
        setText('')
        setValidName(objectValidStart)
        setValidPhoneNumber(objectValidStart)
        setValidText(objectValidStart)
        setFlagButtonSubmit(false)

    }

    const close = () => {
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className={styles.title}>
                <Modal.Title >Мы перезвоним вам сами</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    className={styles.control}
                    placeholder="Ваше имя"
                    type='text'
                    value={name}
                    onChange={(event) => onChangeName(event.target.value.trim())}
                />
                <Validation valid={validName} valid={name} message={'Имя с заглавной буквы не более 25 символов.'} />
                <FormControl
                    className={styles.control}
                    placeholder="Телефон"
                    value={phoneNumber}
                    onChange={(event) => onChangePhoneNumber(event.target.value.trim())}
                />
                <Validation valid={validPhoneNumber} value={phoneNumber}
                    message={'Номер телефона только в формате +38 0XX XXXXXXX или 0XX XXXXXXX без пробелов.'} />
                <FormControl
                    className={styles.control}
                    placeholder="Текст сообщения"
                    as="textarea"
                    value={text}
                    onChange={(event) => onChangeText(event.target.value)}
                />
                <Validation valid={validText} value={text} message={'Длина текста не более 300 символов.'} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Закрыть</Button>
                <Button variant="warning" onClick={clean}>Очистить</Button>
                <Button variant="primary" onClick={submit} disabled={!flagButtonSubmit}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BackCall