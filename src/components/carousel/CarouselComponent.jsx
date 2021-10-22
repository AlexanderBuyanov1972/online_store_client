import React, { useContext, useEffect, useState } from 'react';
import { Carousel, CarouselItem, Image } from "react-bootstrap";
import { Context } from '../../index';
import styles from "./CarouselComponent.module.css"
import { fetchGroupPhoto } from '../../http/photoAPI.js';
import ChangePhoto from '../modals/photo/ChangePhoto'
import notphoto from '../../assets/notfound.jpg'
import { Spinner } from "react-bootstrap";

const CarouselComponent = ({ carouselId }) => {
    const [images, setImages] = useState([])
    const [visible, setVisible] = useState(false)
    const [photoId, setPhotoId] = useState(0)
    const { userStore } = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchGroupPhoto(carouselId)
            .then(data => setImages(data))
            .catch(e => alert(e.message))
            .finally(()=> setLoading(false))
    }, [visible])

    const getPhoto = (id) => {
        if (userStore.isAdmin) {
            setVisible(true)
            setPhotoId(id)
        }
    }
    if (loading){
        return <Spinner animation={"grow"} />
    }

    return (
        <div>
            < Carousel className={styles.carousel}>
                {!images || images.length === 0 ?
                    <Image className={styles.photo}
                        alt="Not Found"
                        src={notphoto}
                        onClick={() => getPhoto()} />
                    :
                    images.map(photo =>
                        <CarouselItem>
                            <Image key={photo.id}
                                className={styles.photo}
                                src={process.env.REACT_APP_API_URL + 'photos/' + photo.img}
                                alt="Not Found"
                                onClick={() => getPhoto(photo.id)} />
                        </CarouselItem>
                    )}
            </Carousel >
            <ChangePhoto
                show={visible}
                onHide={() => setVisible(false)}
                carouselId={carouselId}
                id={photoId} />
        </div>

    )
}

export default CarouselComponent