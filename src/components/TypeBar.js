import React, {useContext} from 'react';
import {Context} from "../index";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const TypeBar = observer(() => {
    const {deviceStore} = useContext(Context)
    return (
        <ListGroup>
            {deviceStore.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === deviceStore.selectedType.id}
                    key={type.id}
                    onClick={() => {
                        deviceStore.setSelectedType(type)
                        deviceStore.setPageCurrent(1)
                    }}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;