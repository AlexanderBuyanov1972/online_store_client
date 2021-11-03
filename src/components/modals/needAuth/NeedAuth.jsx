import { Button, Modal } from "react-bootstrap";
import React from 'react'
import { useHistory } from "react-router";
import { REGISTRATION_ROUTE } from '../../../utils/consts'
import styles from './NeedAuth.module.css'

const NeedAuth = ({ show, onHide }) => {
    const history = useHistory()

    const close = () => {
        onHide()
    }

    const goToAuth = () => {
        onHide()
        history.push(REGISTRATION_ROUTE)
    }
    return (
        <Modal show={show} onHide={onHide} size="lg" centered >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Внимание</Modal.Title>
            </Modal.Header>
            <hr />
            <Modal.Body>
                Чтобы добавить товар в корзину нужно авторизироваться.
            </Modal.Body>
            <hr />
            <Modal.Footer>
                <Button variant={'outline-secondary'}
                    onClick={close}>Закрыть окно</Button>
                <Button variant={'outline-danger'}
                    onClick={goToAuth}>Авторизироваться</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NeedAuth