import React from 'react';
import styles from './ObjectList.module.css'
import { observer } from "mobx-react-lite";
import { getClassForList } from '../../utils/helpFunctions';

const ObjectList = observer(({ objectsJSX, list }) => {
    return (
        <div className={getClassForList(list, styles)}>
            {objectsJSX.map(element => <div key={element.id}>{element}</div>)}
        </div>
    );
});

export default ObjectList;