import React from 'react';
import { Carousel } from "react-bootstrap";
import arrayImages from "../../utils/arrayPhotosForCarousel";
import styles from "./Main.module.css"


const Main = () => {

    return (
        < Carousel className={styles.main}>
            {
                arrayImages.map(
                    item =>
                        <Carousel.Item>
                            <img
                                key={item.id}
                                className={styles.item}
                                src={item.img}
                                alt={item.alt}
                            />
                        </Carousel.Item>
                )
            }
        </Carousel >
    );
};

export default Main;