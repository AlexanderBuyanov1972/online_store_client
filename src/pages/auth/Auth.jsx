import React, { useContext, useEffect, useState } from 'react';
import styles from './Auth.module.css'
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { login, registration } from "../../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { validFieldEmail, validFieldPassword, validFieldConfirmPassword } from '../../utils/validations'
import Validation from '../../components/validation/Validation';

const Auth = observer(() => {
    const { userStore } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [validEmail, setValidEmail] = useState({ flag: false, message: '' })
    const [validPassword, setValidPassword] = useState({ flag: false, message: '' })
    const [validConfirmPassword, setValidConfirmPassword] = useState({ flag: false, message: '' })
    const [validFlagButtonSubmit, setValidFlagButtonSubmit] = useState(true)

    useEffect(() => {
        setValidEmail(validFieldEmail(email))
        setValidPassword(validFieldPassword(password))
        setValidConfirmPassword(validFieldConfirmPassword(password, confirmPassword))
        setValidFlagButtonSubmit(validEmail.flag && validPassword.flag)
    }, [email, password, confirmPassword])


    const submit = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            userStore.setUser(data)
            userStore.setIsAuth(true)
            if (data.role === 'ADMIN') {
                userStore.setIsAdmin(true)
            }
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const onChangeEmail = async (value) => {
        setEmail(value.trim())
    }

    const onChangePassword = async (value) => {
        setPassword(value.trim())
    }

    const onChangeConfirmPassword = async (value) => {
        setConfirmPassword(value.trim())
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column"
                >
                    <Form.Control
                        className={styles.control}
                        placeholder="Введите ваш e-mail ..."
                        value={email}
                        onChange={event => onChangeEmail(event.target.value)}
                        type="text"
                    />
                    <Validation validField={validEmail} field={email} message={''} />
                    <Form.Control
                        className={styles.control}
                        placeholder="Введите ваш пароль ..."
                        value={password}
                        onChange={event => onChangePassword(event.target.value)}
                        type="text"
                    />
                    <Validation validField={validPassword} field={password}
                        message={'Пароль может содержать цифры, английские буквы верхнего и нижнего регистров, точку.'} />
                    <Form.Control
                        className={styles.control}
                        placeholder="Подтвердите ваш пароль ..."
                        value={confirmPassword}
                        onChange={event => onChangeConfirmPassword(event.target.value)}
                        type="text"
                        hidden={isLogin}
                    />
                    <Validation validField={validConfirmPassword} field={confirmPassword} message={''} />
                    <Row className="d-flex justify-content-end mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div> :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <div>
                            <Button onClick={submit}
                                disabled={isLogin ?
                                    !(validFlagButtonSubmit)
                                    :
                                    !(validFlagButtonSubmit && validConfirmPassword.flag)}
                                className='mt-3'
                                variant={"outline-success"}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'} </Button>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;