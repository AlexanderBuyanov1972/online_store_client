import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {userStore} = useContext(Context)
    const history = useHistory()
    const logOut = () => {
        userStore.setUser({})
        userStore.setIsAuth(false)
    }
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}> Купи Девайс!!! </NavLink>
                {userStore.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={'outline-light'} onClick={() => history.push(ADMIN_ROUTE)}
                                className="m-1">АдминПанель</Button>
                        <Button variant={'outline-light'} onClick={() => logOut()}
                                className="m-1">Выйти</Button>
                    </Nav> :

                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={'outline-light'} className="m-1"
                                onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;