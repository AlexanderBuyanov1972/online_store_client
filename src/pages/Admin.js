import React, {useContext, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import {Context} from "../index";

const Admin = () => {
const {deviceStore} = useContext(Context)

    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setTypeVisible(true)}>Добавить
                тип</Button>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setTypeVisible(true)}>Обновить
                тип</Button>
            <hr/>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setBrandVisible(true)}>Добавить
                брэнд</Button>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setBrandVisible(true)}>Обновить
                брэнд</Button>
            <hr/>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setDeviceVisible(true)}>Добавить
                устройство</Button>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setDeviceVisible(true)}>Обновить
                устройство</Button>
            <hr/>
            <CreateType selectedType={} show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand selectedBrand={} show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;