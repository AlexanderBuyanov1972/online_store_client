import React, { useContext, useEffect, useState } from 'react';
import styles from './CreateUpdateDevice.module.css'
import { Button, Col, Form, Modal, Row, Dropdown } from "react-bootstrap";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import { getFormForType } from "../../../utils/formForType";
import { fetchTypes } from "../../../http/typeAPI";
import { fetchBrands } from "../../../http/brandAPI";
import {
    validFieldNameDevice,
    validFieldPrice,
    validFieldRating,
    validFieldFile,
    validIdTypeBrand,
    validFieldProperties
} from '../../../utils/validations'
import Validation from '../../validation/Validation'
import { Spinner } from "react-bootstrap";

const CreateUpdateDevice = observer(({ show, onHide, device, title, typeIn, brandIn, cb }) => {
    const { deviceStore } = useContext(Context)
    const [loading, setLoading] = useState(true)

    const [type, setType] = useState(typeIn)
    const [brand, setBrand] = useState(brandIn)

    const [name, setName] = useState(device.name)
    const [price, setPrice] = useState(device.price)
    const [rating, setRating] = useState(device.rating)
    const [file, setFile] = useState(device.img)
    const [info, setInfo] = useState(device.info)

    const [validBrand, setValidBrand] = useState({ flag: false, message: '' })
    const [validType, setValidType] = useState({ flag: false, message: '' })
    const [validName, setValidName] = useState({ flag: false, message: '' })
    const [validPrice, setValidPrice] = useState({ flag: false, message: '' })
    const [validRating, setValidRating] = useState({ flag: false, message: '' })
    const [validFile, setValidFile] = useState({ flag: false, message: '' })

    const [vaildInfoTitle, setValidInfoTitle] = useState([])
    const [vaildInfoDescription, setValidInfoDescription] = useState([])

    const [flagSubmitButton, setFlagSubmitButton] = useState(false)
    // ---------------------useEffect()----------------------------------
    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data.filter(i => i.id !== 1)))
        fetchBrands().then(data => deviceStore.setBrands(data.filter(i => i.id !== 1)))
        fillInArrayValids(info)
    }, [])

    const fillInArrayValids = async (value) => {
        if (value && value.length > 0) {
            const arrayTitle = []
            const arrayDescription = []
            for (let i = 0; i < value.length; i++) {
                arrayTitle.push({ id: value.id, flag: false, message: '' })
                arrayDescription.push({ id: value.id, flag: false, message: '' })
            }
            setValidInfoTitle(arrayTitle)
            setValidInfoDescription(arrayDescription)
        }
        setValidInfoTitle([])
        setValidInfoDescription([])
    }

    useEffect(() => {
        setFlagSubmitButton(
            validType.flag
            && validBrand.flag
            && validName.flag
            && validPrice.flag
            && validRating.flag
            && validFile.flag
        )
    }, [validType,
        validBrand,
        validName,
        validPrice,
        validRating,
        validFile,

    ])



    // ---------------------onChange()------------------------------------
    const onChangeType = (value) => {
        setType(value)
        validIdTypeBrand(value).then(data => setValidType(data))

        //-------------------------------------
        getFormForType(value)
            .then(data => console.log('data ---> ',data))
            // .then(()=> setInfo([...data]))
            .finally(() => console.log('info ---> ',info))
    }

    const onChangeBrand = (value) => {
        setBrand(value)
        validIdTypeBrand(value).then(data => setValidBrand(data))
    }

    const onChangeName = (value) => {
        setName(value)
        validFieldNameDevice(value).then(data => setValidName(data))
    }

    const onChangePrice = (value) => {
        setPrice(value)
        validFieldPrice(value).then(data => setValidPrice(data))
    }
    const onChangeRating = (value) => {
        setRating(value)
        validFieldRating(value).then(data => setValidRating(data))
    }
    const onChangeFile = (value) => {
        setFile(value)
        validFieldFile(value).then(data => setValidFile(data))
    }
    //--------------------- functions info ---------------------------------------------------------
    const addInfo = () => {
        setInfo([...info, { title: "", description: "", id: Date.now() }])
    }

    const removeInfo = (number) => {
        if (info.length <= 1)
            return getFormForType(type).then(data => setInfo(data))
        return setInfo([...info.filter(i => i.id !== number)])
    }

    const changeInfo = (key, value, number, index) => {
        setInfo(info.map(item => item.id === number ? { ...item, [key]: value } : item))
    }


    // const functionFlagValidInfo = (array) => {
    //     let flag = false
    //     for (let i = 0; i < array.length; i++) {
    //         flag *= array[i].flag
    //     }
    //     return flag
    // }
    // --------------------- functions buttons ---------------------------
    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('rating', `${rating}`)
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))

        if (title === 'Создать устройство') {
            console.log('formData--->', formData)
            // cb(formData).then(data => onHide())
        }

        if (title === 'Обновить устройство') {
            console.log('formData--->', formData)
            // cb(device.id, formData).then(data => {
            //     onHide()
            //     window.location.reload();
            // })
        }
    }

    const closeModal = () => {
        setInfo(device.info)
        onHide()
    }
    const cleanModal = () => {
        setType({})
        setBrand({})
        setName('')
        setPrice('')
        setRating('')
        setFile('')
        setInfo([])
        setValidBrand({ flag: false, message: '' })
        setValidType({ flag: false, message: '' })
        setValidName({ flag: false, message: '' })
        setValidPrice({ flag: false, message: '' })
        setValidRating({ flag: false, message: '' })
        setValidFile({ flag: false, message: '' })
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{type.name || 'Выбери тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.types.map(type =>
                                <Dropdown.Item key={type.id} onClick={() => onChangeType(type)}
                                >{type.name}</Dropdown.Item>)}z
                        </Dropdown.Menu>
                    </Dropdown>
                    < Validation validField={validType} field={type} message={''} />
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{brand.name || 'Выбери брэнд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => onChangeBrand(brand)}
                                >{brand.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    < Validation validField={validBrand} field={brand} message={''} />
                    <hr />
                    <Form.Control
                        className={styles.control}
                        placeholder='Введите название устройства'
                        value={name}
                        onChange={event => onChangeName(event.target.value)}

                    />
                    < Validation validField={validName} field={name} message={''} />
                    <hr />
                    <Form.Control
                        className={styles.control}
                        placeholder='Введите стоимость устройства'
                        value={price}
                        onChange={event => onChangePrice(event.target.value)}

                    />
                    < Validation validField={validPrice} field={price} message={''} />
                    <hr />
                    <Form.Control
                        className={styles.control}
                        placeholder='Введите рейтинг устройства'
                        value={rating}
                        onChange={event => onChangeRating(event.target.value)}
                    />
                    < Validation validField={validRating} field={rating} message={''} />
                    <hr />
                    <Form.Control
                        type="file"
                        className={styles.control}
                        onChange={(event) => onChangeFile(event.target.files[0])}
                        placeholder={device.img}
                    />
                    < Validation validField={validFile} field={file} message={''} />
                    <hr />
                    <Button variant={'outline-dark'} onClick={() => addInfo()
                    }>Добавить новое свойство</Button>
                    <hr />
                    {
                        info.map((i) =>
                            <Row key={i.id} className={styles.control}>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder='Введите название свойства'
                                        value={i.title}
                                        onChange={(event) =>
                                            changeInfo('title', event.target.value, i.id)}
                                    />
                                    <Validation validField={vaildInfoTitle.find(item => item.id === i.id)} field={i.title} message={''} />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder='Введите описание свойства'
                                        value={i.description}
                                        onChange={(event) =>
                                            changeInfo('description', event.target.value, i.id)}
                                    />
                                    <Validation validField={vaildInfoDescription.find(item => item.id === i.id)} field={i.description} message={''} />
                                </Col>
                                <Col md={4}>
                                    <Button variant={'outline-danger'} onClick={() =>
                                        removeInfo(i.id)}>Удалить свойство</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={closeModal}>Закрыть</Button>
                <Button variant={'outline-info'} onClick={cleanModal}>Очистить</Button>
                <Button variant={'outline-success'} onClick={addDevice} disabled={!flagSubmitButton}>Ок</Button>
            </Modal.Footer>
        </Modal>
    );
})


export default CreateUpdateDevice;