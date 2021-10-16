import React, { useContext } from 'react';
import { Context } from "../index";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useHistory, useLocation } from "react-router-dom";

const NavBar = observer(() => {
    const { userStore } = useContext(Context)
    const { deviceStore } = useContext(Context)

    const location = useLocation()
    const isShop = location.pathname === SHOP_ROUTE
    const isMain = location.pathname === MAIN_ROUTE
    const history = useHistory()

    const logOut = () => {
        userStore.setUser({})
        userStore.setIsAuth(false)
        userStore.setIsAdmin(false)
        localStorage.removeItem('token')
        history.push(MAIN_ROUTE)
    }

    const resetTypeBrand = () => {
        deviceStore.setSelectedType({})
        deviceStore.setSelectedBrand({})
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Nav className="ml-auto" style={{ color: "white" }}>
                    <NavLink className="m-1"
                        style={{ color: 'white', textDecoration: 'none' }}
                        to={MAIN_ROUTE} onClick={resetTypeBrand}
                    > {isMain ? '' : 'На главную'}

                    </NavLink>
                    <NavLink className="m-1"
                        style={{ color: 'white', textDecoration: 'none' }}
                        to={SHOP_ROUTE} onClick={resetTypeBrand}
                    > {isShop ? '' : 'В магазин'}

                    </NavLink>
                </Nav>
                <Nav className="ml-auto" style={{ color: "white" }}>
                    {userStore.isAdmin &&
                        <Button variant={'outline-light'} onClick={() => {
                            resetTypeBrand()
                            history.push(ADMIN_ROUTE)
                        }}
                            className="m-1">АдминПанель</Button>}

                    {userStore.isAuth &&
                        <Button variant={'outline-light'} onClick={() => logOut()}
                            className="m-1">Выйти</Button>}
                    {!userStore.isAuth &&
                        <Button variant={'outline-light'} className="m-1"
                            onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>}
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;