import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { Context } from '../../..';
import { registration } from '../../../http/authAPI';
import { validation } from '../../../utils/validations';
import Validation from '../../validation/Validation';
import styles from './CreateAdmin.module.css'

const CreateAdmin = ({ show, onHide }) => {
    const objectValidStart = { flag: false, message: '' }
    const { userStore } = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [validEmail, setValidEmail] = useState({ flag: false, message: '' })
    const [validPassword, setValidPassword] = useState({ flag: false, message: '' })
    const [validConfirmPassword, setValidConfirmPassword] = useState({ flag: false, message: '' })

    const [flagButtonSubmit, setFlagButtonSubmit] = useState(true)

    useEffect(() => {
        setFlagButtonSubmit(validEmail.flag && validPassword.flag && validConfirmPassword.flag)

    }, [validEmail, validPassword, validConfirmPassword])

    const submit = async () => {
        const role = 'ADMIN'
        try {
            const data = await registration(email, password, role)
            userStore.setUser(data)
            userStore.setIsAuth(true)
            if (data.role === role)
                userStore.setIsAdmin(true)
            close()
        } catch (err) {
            alert(err.message)
        }
    }

    const onChangeEmail = async (value) => {
        setEmail(value)
        validation.validFieldEmail(value).then(data =>
            setValidEmail(data)
        )
    }

    const onChangePassword = async (value) => {
        setPassword(value)
        validation.validFieldPassword(value).then(data =>
            setValidPassword(data)
        )
    }

    const onChangeConfirmPassword = async (value) => {
        setConfirmPassword(value)
        validation.validFieldConfirmPassword(password, value).then(data =>
            setValidConfirmPassword(data)
        )
    }
    const clean = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setValidEmail(objectValidStart)
        setValidPassword(objectValidStart)
        setValidConfirmPassword(objectValidStart)
        setFlagButtonSubmit(false)

    }
    const close = () => {
        onHide()
    }
    return (
        <div className={styles.container}>
            <Modal show={show} onHide={onHide}>
                <Modal.Header className={styles.title}>
                    <Modal.Title >?????????????????????? ????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        className={styles.control}
                        placeholder="?????????????? e-mail ..."
                        value={email}
                        onChange={event => onChangeEmail(event.target.value.trim())}
                        type="text"
                    />
                    <Validation valid={validEmail} value={email} message={''} />
                    <Form.Control
                        className={styles.control}
                        placeholder="?????????????? ???????????? ..."
                        value={password}
                        onChange={event => onChangePassword(event.target.value.trim())}
                        type="text"
                    />
                    <Validation valid={validPassword} value={password}
                        message={'???????????? ?????????? ?????????????????? ??????????, ???????????????????? ?????????? ???????????????? ?? ?????????????? ??????????????????, ??????????.'} />
                    <Form.Control
                        className={styles.control}
                        placeholder="?????????????????????? ???????????? ..."
                        value={confirmPassword}
                        onChange={event => onChangeConfirmPassword(event.target.value.trim())}
                        type="text"
                    />
                    <Validation valid={validConfirmPassword} value={confirmPassword} message={''} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>??????????????</Button>
                    <Button variant="warning" onClick={clean}>????????????????</Button>
                    <Button variant="outline-success" onClick={submit} disabled={!flagButtonSubmit}>??????????????????????</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreateAdmin;