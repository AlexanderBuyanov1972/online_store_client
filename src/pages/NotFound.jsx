import React from 'react';
import notfound from "../assets/notfound.jpg"
import { Card } from "react-bootstrap";

const NotFound = () => {
    return (
        <Card className="d-flex flex-column align-items-center justify-content-around mt-3">
            <Card.Body>
                <Card.Img width={1000} height={600} src={notfound} />
            </Card.Body>
        </Card>
    );
};

export default NotFound;