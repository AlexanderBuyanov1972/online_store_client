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
        <div className={styles.container}>
            <ListGroup>
                {deviceStore.types.map(type =>
                    <ListGroup.Item
                        style={{ cursor: 'pointer' }}
                        className={type.id === deviceStore.selectedType.id
                            || type.name === deviceStore.selectedType.name ? styles.listitemactive : styles.listitem}
                        key={type.id}
                        onClick={() => selectType(type)}
                    >
                        {type.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    );
});

export default TypeBar;