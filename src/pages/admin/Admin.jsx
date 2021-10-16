import React, { useState } from 'react';
import styles from './Admin.module.css'
import { Button, Container } from "react-bootstrap";
import CreateType from "../../components/modals/CreateType";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateDevice from "../../components/modals/CreateDevice";


const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setTypeVisible(true)}>Добавить
                тип</Button>
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setTypeVisible(true)}>Обновить
                тип</Button>
            <hr />
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setBrandVisible(true)}>Добавить
                брэнд</Button>
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setBrandVisible(true)}>Обновить
                брэнд</Button>
            <hr />
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setDeviceVisible(true)}>Добавить
                устройство</Button>
            <hr />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;