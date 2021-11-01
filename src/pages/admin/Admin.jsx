import React, { useState } from 'react';
import styles from './Admin.module.css'
import { Button, Container } from "react-bootstrap";
import CreateUpdateDevice from "../../components/modals/createUpdateDevice/CreateUpdateDevice";
import CreateTypeBrand from '../../components/modals/CreateTypeBrand';
import { createType } from '../../http/typeAPI';
import { createBrand } from '../../http/brandAPI';
import { createDevice } from '../../http/deviceAPI'


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

            <CreateTypeBrand show={typeVisible} onHide={() => setTypeVisible(false)}
                createTypeBrand={createType} textTypeBrand={'type'} />
            <CreateTypeBrand show={brandVisible} onHide={() => setBrandVisible(false)}
                createTypeBrand={createBrand} textTypeBrand={'brand'} />
            <CreateUpdateDevice
                show={deviceVisible}
                onHide={() => setDeviceVisible(false)}
                device={{ name: '', price: '', rating: '', img: '', info: [] }}
                title={'Создать устройство'}
                cb={createDevice}
            />
        </Container>
    );
};

export default Admin;