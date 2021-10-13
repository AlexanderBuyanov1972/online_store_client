import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {deviceStore} = useContext(Context)
    const pageCount = Math.ceil(deviceStore.totalCount / deviceStore.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <Pagination className="mt-5">
            {pages.map(page => <Pagination.Item
                key={page}
                active={deviceStore.pageCurrent === page}
                onClick = { () => { deviceStore.setPageCurrent(page)

                }}
            >
                {page}
            </Pagination.Item>)}
        </Pagination>
    );
});

export default Pages;