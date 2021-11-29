import React, { useEffect, useState } from 'react'
import styles from './BackCall.module.css'
import { Button, Modal, FormControl } from "react-bootstrap";
import { validation } from '../../../utils/validations';
import Validation from '../../validation/Validation'
import { useValidInput } from '../../../hooks/useValidInput';


const BackCall = ({ show, onHide }) => {
    const name = useValidInput('', validation.validFieldName)
    const phoneNumber = useValidInput('', validation.validFieldPhoneNumber)
    const text = useValidInput('', validation.validFieldText)
    const [flagButtonSubmit, setFlagButtonSubmit] = useState(false)

    useEffect(() => {
        setFlagButtonSubmit(name.valid.flag && phoneNumber.valid.flag && text.valid.flag)
    }, [name, phoneNumber, text])

    const submit = () => {
        alert(JSON.stringify({ name: name.value, phoneNumber: phoneNumber.value, text: text.value }))
        //close()
    }

    const clean = () => {
        name.onSetInput('')
        phoneNumber.onSetInput('')
        text.onSetInput('')
    }

    const close = () => {
        clean()
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className={styles.title}>
                <Modal.Title >Мы перезвоним вам сами</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl className={styles.control} placeholder="Ваше имя" type='text'
                    value={name.value}
                    onChange={name.onChange}
                />
                <Validation valid={name.valid} value={name.value} message={'Имя с заглавной буквы не более 25 символов.'} />
                <FormControl className={styles.control} placeholder="Телефон" type='text'
                    value={phoneNumber.value}
                    onChange={phoneNumber.onChange}
                />
                <Validation valid={phoneNumber.valid} value={phoneNumber.value}
                    message={'Номер телефона только в формате +38 0XX XXXXXXX или 0XX XXXXXXX без пробелов.'} />
                <FormControl className={styles.control} placeholder="Текст сообщения" as="textarea"
                    value={text.value}
                    onChange={text.onChange}
                />
                <Validation valid={text.valid} value={text.value} message={'Длина текста не более 300 символов.'} />
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