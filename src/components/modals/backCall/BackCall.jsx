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

    useEffect(() => {
        validFieldName(name).then(data => {
            setValidName(data)
            if (!data.flag)
                setFlagButtonSubmit(false)
        })
        validFieldPhoneNumber(phoneNumber).then(data => {
            setValidPhoneNumber(data)
            if (!data.flag)
                setFlagButtonSubmit(false)
        })
        validFieldText(text).then(data => {
            setValidText(data)
            if (!data.flag)
                setFlagButtonSubmit(false)
        })
        if (validName.flag && validPhoneNumber.flag && validText.flag)
            setFlagButtonSubmit(true)
    }, [name, phoneNumber, text])

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
                    onChange={(event) => setName(event.target.value)}
                />
                <Validation validField={validName} field={name} message={'Имя с заглавной буквы не более 25 символов.'} />
                <FormControl
                    className={styles.control}
                    placeholder="Телефон"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <Validation validField={validPhoneNumber} field={phoneNumber}
                    message={'Номер телефона только в формате +38 0XX XXXXXXX или 0XX XXXXXXX без пробелов.'} />
                <FormControl
                    className={styles.control}
                    placeholder="Текст сообщения"
                    as="textarea"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
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