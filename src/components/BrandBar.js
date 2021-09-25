import React, {useContext} from 'react';
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row>
            <div className="mt-1 d-flex">
                {device.brands.map(brand =>
                        <Card
                            style={{cursor: 'pointer'}}
                            key={brand.id}
                            className="p-3"
                            onClick={() => device.setSelectedBrand(brand)}
                            border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                        >
                            {brand.name}
                        </Card>
                    )}
            </div>
        </Row>
    );
});

export default BrandBar;