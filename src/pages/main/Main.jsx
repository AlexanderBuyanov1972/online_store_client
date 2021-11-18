import React from 'react';
import CarouselComponent from '../../components/carousel/CarouselComponent.jsx'
import styles from "./Main.module.css"
import {array} from '../../utils/helpArrays'

const Main = () => {
    return (
        <div className={styles.main}>
            {array.map(item =>
                <div key={item.id} className={styles.item}>
                    <CarouselComponent title={item.title} />
                </div>
            )}
        </div>
    );
};

export default Main;