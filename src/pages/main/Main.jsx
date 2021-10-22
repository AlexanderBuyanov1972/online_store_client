import React from 'react';
import CarouselComponent from '../../components/carousel/CarouselComponent.jsx'
import styles from "./Main.module.css"

const array = ['carousel1', 'carousel2', 'carousel3']

const Main = () => {
    return (
        <div className={styles.main}>
            {array.map(i =>
                <div className={styles.item}>
                    <CarouselComponent carouselId={i} />
                </div>
            )}
        </div>
    );
};

export default Main;