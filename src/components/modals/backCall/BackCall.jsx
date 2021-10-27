import React, { useEffect, useState } from 'react'
import styles from './BackCall.module.css'
import { Button, Modal, FormControl } from "react-bootstrap";
import { validFieldName, validFieldPhoneNumber, validFieldText } from '../../../utils/validations';
import Validation from '../../validation/Validation'


const BackCall = ({ show, onHide }) => {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [text, setText] = useState('')

    const [validName, setValidName] = useState({ flag: false, message: '' })
    const [validPhoneNumber, setValidPhoneNumber] = useState({ flag: false, message: '' })
    const [validText, setValidText] = useState({ flag: false, message: '' })

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
        setFlagButtonSubmit(false)
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
                <Validation validField={validName} field={name} message={'Имя с заглавной буквы не более 25 символов.'} />
                <FormControl
                    className={styles.control}
                    placeholder="Телефон"
                    value={phoneNumber}
                    onChange={(event) => onChangePhoneNumber(event.target.value.trim())}
                />
                <Validation validField={validPhoneNumber} field={phoneNumber}
                    message={'Номер телефона только в формате +38 0XX XXXXXXX или 0XX XXXXXXX без пробелов.'} />
                <FormControl
                    className={styles.control}
                    placeholder="Текст сообщения"
                    as="textarea"
                    value={text}
                    onChange={(event) => onChangeText(event.target.value)}
                />
                <Validation validField={validText} field={text} message={'Длина текста не более 300 символов.'} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Закрыть</Button>
                <Button variant="warning" onClick={clean}>Очистить</Button>
                <Button disabled={!flagButtonSubmit} variant="primary" onClick={submit}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BackCall