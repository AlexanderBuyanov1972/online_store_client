import React, { useContext } from 'react';
import styles from './BrandBar.module.css'
import { Context } from "../../index";
import { Card } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const BrandBar = observer(() => {
    const { deviceStore } = useContext(Context)
    const selectBrand = (brand) => {
        brand.id === 1 ?
            deviceStore.setSelectedBrand({ name: 'All brands' })
            :
            deviceStore.setSelectedBrand(brand)

        deviceStore.setPageCurrent(1)
    }
    return (
        // <div className="d-flex flex-wrap">
        <div className={styles.item}>
            {deviceStore.brands.map(brand =>
                <Card
                    style={{ cursor: 'pointer' }}
                    key={brand.id}
                    className={styles.card}
                    onClick={() => selectBrand(brand)}
                    border={brand.id === deviceStore.selectedBrand.id
                        || brand.name === deviceStore.selectedBrand.name ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </div>
    );
});

export default BrandBar;