import React, { useContext, useEffect } from 'react'
import styles from './HeaderTop.module.css'
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap'
import { STOKE_ROUTE, SHIPPING_AND_PAYMENT_ROUTE, ABOUT_STORE_ROUTE, CABINET_ROUTE } from '../../../routes/routesConsts'
import { useHistory } from 'react-router'
import { Context } from '../../..'



const HeaderTop = () => {
  const { userStore } = useContext(Context)
  const history = useHistory()
  return (
    <div className={styles.container}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <NavLink onClick={() => history.push(STOKE_ROUTE)}>Акции</NavLink>
            <NavLink onClick={() => history.push(ABOUT_STORE_ROUTE)}>О Магазине</NavLink>
            <NavLink onClick={() => history.push(SHIPPING_AND_PAYMENT_ROUTE)}>Доставка и Оплата</NavLink>
            {userStore.isAuth && !userStore.isAdmin &&
              <NavLink onClick={() => history.push(CABINET_ROUTE)}>Личный кабинет</NavLink>
            }
          </Nav>
        </Container>
      </Navbar>
    </div>

  )
}

export default HeaderTop