import React, {useContext} from 'react';
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const BrandBar = observer(() => {
    const {deviceStore} = useContext(Context)
    return (
        <Row>
            <div className="d-flex flex-wrap">
                {deviceStore.brands.map(brand =>
                    <Card
                        style={{cursor: 'pointer'}}
                        key={brand.id}
                        className="p-3"
                        onClick={() => {
                            deviceStore.setSelectedBrand(brand)
                            deviceStore.setPageCurrent(1)
                        }}
                        border={brand.id === deviceStore.selectedBrand.id ? 'danger' : 'light'}
                    >
                        {brand.name}
                    </Card>
                )}
            </div>
        </Row>
    );
});

export default BrandBar;