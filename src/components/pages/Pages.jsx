import React, { useContext } from 'react';
import styles from './Pages.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const { deviceStore } = useContext(Context)
    const pageCount = Math.ceil(deviceStore.totalCount / deviceStore.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <div className={styles.container}>
            <Pagination>
                {pages.map(page => <Pagination.Item
                    key={page}
                    active={deviceStore.pageCurrent === page}
                    onClick={() => {
                        deviceStore.setPageCurrent(page)
                    }}
                >
                    {page}
                </Pagination.Item>)}
            </Pagination>
        </div>

    );
});

export default Pages;