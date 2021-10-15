import React, {useContext, useState} from 'react';
import styles from './Auth.module.css'
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {login, registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer(() => {
    const {userStore} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            userStore.setUser(data)
            userStore.setIsAuth(true)
            if(data.role === 'ADMIN'){
                userStore.setIsAdmin(true)
            }
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className={styles.container}
            style={{height: window.innerHeight - 54}}
        >
            <Card style={styles.card} className='p-5'>
                <h2 className={styles.h2}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className={styles.form}>
                    <Form.Control
                        className={styles.control}
                        placeholder="Введите ваш e-mail ..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className={styles.control}
                        placeholder="Введите ваш пароль ..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <Row className={styles.row}>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div> :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <div>
                            <Button
                                variant={"outline-success"}
                                onClick={click}
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