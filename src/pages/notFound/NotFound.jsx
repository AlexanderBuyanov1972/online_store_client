import React from 'react';
import styles from './NotFound.module.css';
import notfound from "../../assets/notfound.jpg"
import { Card } from "react-bootstrap";

const NotFound = () => {
    return (
        <Card className={styles.card}>
            <Card.Body>
                <Card.Img className={styles.img} src={notfound} />
            </Card.Body>
        </Card>
    );
};

export default NotFound;