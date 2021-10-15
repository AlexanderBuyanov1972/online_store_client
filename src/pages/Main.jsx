import React from 'react';
import zakazfromhome from "../assets/zakazfromhome.jpg";
import { Card, Carousel } from "react-bootstrap";
import arrayImages from "../utils/arrayPhotosForCarousel";

const Main = () => {

    return (
        // <Card className="d-flex flex-column align-items-center justify-content-around mt-3">
        //     <Card.Body>
        //         <Card.Img width={1000} height={600} src={zakazfromhome} />
        //     </Card.Body>
        // </Card>

        < Carousel className='mt-5'>
            {
                arrayImages.map(
                    item =>
                        <Carousel.Item>
                            <img
                                key={item.id}
                                className="d-block w-100"
                                src={item.img}
                                alt={item.alt}
                                style={{ width: 1000, height: 500 }}
                            />
                        </Carousel.Item>
                )
            }
        </Carousel >
    );
};

export default Main;