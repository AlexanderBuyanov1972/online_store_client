import { Button, Form, Modal } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { createPhoto, updatePhoto, deletePhoto, deleteGroupPhoto } from '../../../http/photoAPI';

const ChangePhoto = observer(({ show, onHide, carouselId, id }) => {
    const [file, setFile] = useState(null)

    const selectFile = (event) => {
        setFile(event.target.files[0])
    }

    const closeModal = () => {
        setFile(null)
        onHide(false)
    }

    const createImage = () => {
        const formData = new FormData()
        formData.append('group', carouselId)
        formData.append('img', file)
        createPhoto(formData)
            .then(data => {
                closeModal()
            })
            .catch(e => alert(e.message))
    }

    const updateImage = () => {
        const formData = new FormData()
        formData.append('group', carouselId)
        formData.append('img', file)
        updatePhoto(id, formData)
            .then(data => {
                closeModal()
            })
            .catch(e => alert(e.message))
    }

    const deleteImage = () => {
        deletePhoto(id)
            .then(() => {
                closeModal()
            })
            .catch(e => alert(e.message))
    }

    const deleteImageGroup = () => {
        deleteGroupPhoto(carouselId)
            .then(() => {
                closeModal()
            })
            .catch(e => alert(e.message))
    }


    return (
        <Modal show={show} onHide={onHide} size="lg" centered >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить фото
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className='mt-3'
                        value={carouselId}
                    />
                    <Form.Control
                        type="file"
                        className='mt-3'
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <hr />
            <Modal.Footer>
                <Button variant={'outline-secondary'} onClick={closeModal}>Закрыть окно</Button>
                <Button variant={'outline-danger'} onClick={deleteImageGroup}>Удалить все фото</Button>
                <Button variant={'outline-danger'} onClick={deleteImage}>Удалить фото</Button>
                <Button variant={'outline-success'} onClick={updateImage} disabled={file === null}>Обновить фото</Button>
                <Button variant={'outline-success'} onClick={createImage} disabled={file === null}>Создать фото</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangePhoto