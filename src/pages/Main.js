import React from 'react';
import zakazfromhome from "../assets/zakazfromhome.jpg"
import { Card } from "react-bootstrap";

const Main = () => {
    return (
        <Card className="d-flex flex-column align-items-center justify-content-around mt-3">
            <Card.Body>
                <Card.Img width={1000} height={600} src={zakazfromhome} />
            </Card.Body>
        </Card>
    );
};

export default Main; 