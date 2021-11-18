import React, { useContext, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { Context } from "../../index";
import CreateUpdateDevice from "../modals/createUpdateDevice/CreateUpdateDevice";
import styles from './ButtonUpdateDeviceAdmin.module.css'

const ButtonUpdateDeviceAdmin = ({ device, title, cb }) => {
    const { userStore } = useContext(Context)
    const [visible, setVisible] = useState(false)

    return (
        <div>
            <Row>
                <Button hidden={!userStore.isAdmin}
                    variant={'outline-dark'}
                    className={styles.button}
                    onClick={() => setVisible(true)}>Обновить устройство</Button>
            </Row>
            <CreateUpdateDevice
                show={visible}
                onHide={() => setVisible(false)}
                device={device}
                title={title}
                cb={cb} />
        </div>
    )
}
export default ButtonUpdateDeviceAdmin