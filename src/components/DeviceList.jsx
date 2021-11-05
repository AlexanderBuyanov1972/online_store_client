import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { deviceStore } = useContext(Context)
    return (
        <div >
            {deviceStore.devices.map(device => <DeviceItem key={device.id} device={device} />)}
        </div>
    );
});

export default DeviceList;