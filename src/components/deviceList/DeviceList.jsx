import React, { useContext } from 'react';
import styles from './DeviceList.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import DeviceItem from "../deviceItem/DeviceItem";

const DeviceList = observer(() => {
    const { deviceStore } = useContext(Context)
    return (
        <div className={styles.list}>
            {deviceStore.devices.map(device => <DeviceItem key={device.id} device={device} />)}
        </div>
    );
});

export default DeviceList;