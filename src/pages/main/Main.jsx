import React from 'react';
import CarouselComponent from '../../components/carousel/CarouselComponent.jsx'
import styles from "./Main.module.css"
import {array} from '../../utils/carousel'

const Main = () => {
    return (
        <div className={styles.main}>
            {array.map(item =>
                <div className={styles.item}>
                    <CarouselComponent title={item} />
                </div>
            )}
        </div>
    );
};

export default Main;