import { Button,Modal } from "react-bootstrap";
import React from 'react'

const NeedAuth = ({show, onHide}) => {
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
                    onClick={onHide}>Закрыть окно</Button>
                <Button variant={'outline-danger'}
                    onClick={()=> alert('Авторизироваться!!!')}>Авторизироваться</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NeedAuth