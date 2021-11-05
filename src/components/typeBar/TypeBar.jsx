import React, { useContext } from 'react';
import styles from './TypeBar.module.css'
import { Context } from "../../index";
import { ListGroup } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const TypeBar = observer(() => {
    const { deviceStore } = useContext(Context)
    const selectType = (type) => {
        type.id === 1 ?
            deviceStore.setSelectedType({ name: 'Все типы' })
            :
            deviceStore.setSelectedType(type)
        deviceStore.setPageCurrent(1)
    }
    return (
        <ListGroup>
            {deviceStore.types.map(type =>
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    className="p-3"
                    active={type.id === deviceStore.selectedType.id
                        || type.name === deviceStore.selectedType.name}
                    key={type.id}
                    onClick={() => selectType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;