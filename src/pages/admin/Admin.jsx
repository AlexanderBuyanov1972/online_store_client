import React, { useState } from 'react';
import styles from './Admin.module.css'
import { Button, Container } from "react-bootstrap";
import CreateUpdateDevice from "../../components/modals/createUpdateDevice/CreateUpdateDevice";
import CreateUpdateTypeBrand from '../../components/modals/createUpdateTypeBrand/CreateUpdateTypeBrand';
import { createType, updateType } from '../../http/typeAPI';
import { createBrand, updateBrand } from '../../http/brandAPI';
import { createDevice } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite';


const Admin = observer(() => {
    const [brandVisibleCreate, setBrandVisibleCreate] = useState(false)
    const [brandVisibleUpdate, setBrandVisibleUpdate] = useState(false)
    const [typeVisibleCreate, setTypeVisibleCreate] = useState(false)
    const [typeVisibleUpdate, setTypeVisibleUpdate] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setTypeVisibleCreate(true)}>Добавить
                тип</Button>
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setTypeVisibleUpdate(true)}>Обновить
                тип</Button>
            <hr />
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setBrandVisibleCreate(true)}>Добавить
                брэнд</Button>
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setBrandVisibleUpdate(true)}>Обновить
                брэнд</Button>
            <hr />
            <Button variant={'outline-dark'} className={styles.button} onClick={() => setDeviceVisible(true)}>Добавить
                устройство</Button>
            <hr />

            <CreateUpdateTypeBrand show={typeVisibleCreate} onHide={() => setTypeVisibleCreate(false)}
                cb={createType} textTitle={'Добавить тип'} textButton={'Добавить'} />
            <CreateUpdateTypeBrand show={typeVisibleUpdate} onHide={() => setTypeVisibleUpdate(false)}
                cb={updateType} textTitle={'Обновить тип'} textButton={'Обновить'} />
            <CreateUpdateTypeBrand show={brandVisibleCreate} onHide={() => setBrandVisibleCreate(false)}
                cb={createBrand} textTitle={'Добавить бренд'} textButton={'Добавить'} />
            <CreateUpdateTypeBrand show={brandVisibleUpdate} onHide={() => setBrandVisibleUpdate(false)}
                cb={updateBrand} textTitle={'Обновить бренд'} textButton={'Обновить'} />
            <CreateUpdateDevice
                show={deviceVisible}
                onHide={() => setDeviceVisible(false)}
                device={{ name: '', price: '', rating: '', img: '', info: [] }}
                title={'Создать устройство'}
                cb={createDevice}
            />
        </Container>
    );
});

export default Admin;