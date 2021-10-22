import React, { useContext, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { Context } from "../../index";
import UpdateDevice from "../modals/UpdateDevice";
import styles from './ButtonUpdateDeviceAdmin.module.css'

const ButtonUpdateDeviceAdmin = () => {
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
            <UpdateDevice show={visible} onHide={() => setVisible(false)} />
        </div>
    )
}
export default ButtonUpdateDeviceAdmin