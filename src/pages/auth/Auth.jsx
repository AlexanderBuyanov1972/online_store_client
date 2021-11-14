import React, { useContext, useEffect, useState } from 'react';
import styles from './Auth.module.css'
import { Alert, Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../routes/routesConsts";
import { login, registration } from "../../http/authAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { validFieldEmail, validFieldPassword, validFieldConfirmPassword } from '../../utils/validations'
import Validation from '../../components/validation/Validation';

const Auth = observer(() => {
    const { userStore } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isPathLogin = location.pathname === LOGIN_ROUTE

    const [message, setMessage] = useState('')
    const [hiddenAlert, setHiddenAlert] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [validEmail, setValidEmail] = useState({ flag: false, message: '' })
    const [validPassword, setValidPassword] = useState({ flag: false, message: '' })
    const [validConfirmPassword, setValidConfirmPassword] = useState({ flag: false, message: '' })

    const [flagButtonSubmit, setFlagButtonSubmit] = useState(true)

    useEffect(() => {
        if (isPathLogin) {
            setFlagButtonSubmit(validEmail.flag && validPassword.flag)
        } else {
            setFlagButtonSubmit(validEmail.flag && validPassword.flag && validConfirmPassword.flag)
        }
    }, [validEmail, validPassword, validConfirmPassword])


    const submit = async () => {
        let data
        try {
            if (isPathLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            if (!data.message) {
                userStore.setUser(data)
                userStore.setIsAuth(true)
                if (data.role === 'ADMIN')
                    userStore.setIsAdmin(true)
                history.push(SHOP_ROUTE)
                window.location.reload()
            } else {
                setHiddenAlert(false)
                setMessage(data.message)
                return
            }
        } catch (e) {
            setMessage(e.message)
        }
    }

    const onChangeEmail = async (value) => {
        setEmail(value)
        validFieldEmail(value).then(data =>
            setValidEmail(data)
        )
    }

    const onChangePassword = async (value) => {
        if (value === '')
            setHiddenAlert(true)
        setPassword(value)
        validFieldPassword(value).then(data =>
            setValidPassword(data)
        )
    }

    const onChangeConfirmPassword = async (value) => {
        setConfirmPassword(value)
        validFieldConfirmPassword(password, value).then(data =>
            setValidConfirmPassword(data)
        )
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>{isPathLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column"
                >
                    <Form.Control
                        className={styles.control}
                        placeholder="Введите ваш e-mail ..."
                        value={email}
                        onChange={event => onChangeEmail(event.target.value.trim())}
                        type="text"
                    />
                    <Validation validField={validEmail} field={email} message={''} />
                    <Form.Control
                        className={styles.control}
                        placeholder="Введите ваш пароль ..."
                        value={password}
                        onChange={event => onChangePassword(event.target.value.trim())}
                        type="text"
                    />
                    <Validation validField={validPassword} field={password}
                        message={'Пароль может содержать цифры, английские буквы верхнего и нижнего регистров, точку.'} />
                    <Form.Control
                        className={styles.control}
                        placeholder="Подтвердите ваш пароль ..."
                        value={confirmPassword}
                        onChange={event => onChangeConfirmPassword(event.target.value.trim())}
                        type="text"
                        hidden={isPathLogin}
                    />
                    <Validation validField={validConfirmPassword} field={confirmPassword} message={''} />

                    <Alert variant='danger' hidden={hiddenAlert}>{message}</Alert>

                    <Row className="d-flex justify-content-end mt-3 pl-3 pr-3">
                        {isPathLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div> :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <div>
                            <Button onClick={submit}
                                disabled={!flagButtonSubmit}
                                className='mt-3'
                                variant={"outline-success"}
                            >
                                {isPathLogin ? 'Войти' : 'Регистрация'} </Button>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;