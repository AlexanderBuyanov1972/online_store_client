import React, { useContext, useEffect, useState } from 'react';
import styles from './Auth.module.css'
import { Alert, Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../routes/routesConsts";
import { login, registration } from "../../http/authAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { validation } from '../../utils/validations'
import Validation from '../../components/validation/Validation';
import { useValidInput } from '../../hooks/useValidInput';
import { useValidConfirmPassword } from '../../hooks/useValidConfirmPassword';

const Auth = observer(() => {
    const { userStore } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isPathLogin = location.pathname === LOGIN_ROUTE

    const [message, setMessage] = useState('')
    const [hiddenAlert, setHiddenAlert] = useState(true)

    const email = useValidInput('', validation.validFieldEmail)
    const password = useValidInput('', validation.validFieldPassword)
    const confirmPassword = useValidConfirmPassword('', validation.validFieldConfirmPassword, password.value)

    const [flagButtonSubmit, setFlagButtonSubmit] = useState(true)

    useEffect(() => {
        if (isPathLogin) {
            setFlagButtonSubmit(email.valid.flag && password.valid.flag)
        } else {
            setFlagButtonSubmit(email.valid.flag && password.valid.flag && confirmPassword.valid.flag)
        }
    }, [email, password, confirmPassword])


    const submit = async () => {
        let data
        try {
            if (isPathLogin) {
                data = await login(email.value, password.value)
            } else {
                data = await registration(email.value, password.value)
            }
            if (!data.message) {
                userStore.setUser(data)
                userStore.setIsAuth(true)
                if (data.role === 'ADMIN')
                    userStore.setIsAdmin(true)
                history.push(SHOP_ROUTE)
            } else {
                setHiddenAlert(false)
                setMessage(data.message)
                return
            }
        } catch (e) {
            setMessage(e.message)
        }
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
                    <Form.Control className={styles.control} type="text" placeholder="Введите ваш e-mail ..."
                        value={email.value} onChange={email.onChange} />
                    <Validation valid={email.valid} value={email.value} message={''} />
                    <Form.Control className={styles.control} type="text" placeholder="Введите ваш пароль ..."
                        value={password.value} onChange={password.onChange} />
                    <Validation valid={password.valid} value={password.value}
                        message={'Пароль может содержать цифры, английские буквы верхнего и нижнего регистров, точку.'} />
                    <Form.Control className={styles.control} placeholder="Подтвердите ваш пароль ..." type="text"
                        value={confirmPassword.value} onChange={confirmPassword.onChange}
                        hidden={isPathLogin} />
                    <Validation valid={confirmPassword.valid} value={confirmPassword.value} message={''} />

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
                            <Button
                                onClick={submit} disabled={!flagButtonSubmit} className='mt-3' variant={"outline-success"}>
                                {isPathLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;