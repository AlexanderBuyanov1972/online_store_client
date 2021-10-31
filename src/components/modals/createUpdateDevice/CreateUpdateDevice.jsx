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

const CreateUpdateDevice = observer(({ show, onHide, device, title, typeIn, brandIn, cb }) => {
    const { deviceStore } = useContext(Context)

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

    const [validInfoTitle, setValidInfoTitle] = useState([])
    const [validInfoDescription, setValidInfoDescription] = useState([])

    const [flagSubmitButton, setFlagSubmitButton] = useState(false)
    // ---------------------useEffect()----------------------------------
    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data.filter(i => i.id !== 1)))
        fetchBrands().then(data => deviceStore.setBrands(data.filter(i => i.id !== 1)))
        fillInArrayValids(info)
    }, [])

    const fillInArrayValids = async (array) => {
        if (array.length > 0) {
            const arrayTitle = []
            const arrayDescription = []
            for (let i = 0; i < array.length; i++) {
                arrayTitle.push({ id: array[i].id, flag: true, message: 'Ok' })
                arrayDescription.push({ id: array[i].id, flag: false, message: '' })
            }
            setValidInfoTitle(arrayTitle)
            setValidInfoDescription(arrayDescription)
        } else {
            setValidInfoTitle([])
            setValidInfoDescription([])
        }
    }

    useEffect(() => {
        setFlagSubmitButton(
            validType.flag
            && validBrand.flag
            && validName.flag
            && validPrice.flag
            && validRating.flag
            && validFile.flag
            && functionFlagValidInfo(validInfoTitle)
            && functionFlagValidInfo(validInfoDescription)
        )
    }, [validType,
        validBrand,
        validName,
        validPrice,
        validRating,
        validFile,
        validInfoTitle,
        validInfoDescription
    ])

    // ---------------------onChange()------------------------------------
    const onChangeType = (value) => {
        setType(value)
        validIdTypeBrand(value).then(data => setValidType(data))
        const data = getFormForType(value)
        setInfo(data)
        fillInArrayValids(data)
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
        const numberId = Date.now()
        setInfo([...info, { title: "", description: "", id: numberId }])
        const object = { id: numberId, flag: false, message: '' }
        setValidInfoTitle([...validInfoTitle, object])
        setValidInfoDescription([...validInfoDescription, object])
    }

    const removeInfo = (numberId) => {
        if (info.length <= 1) {
            fillInArrayValids(getFormForType(type))
        } else {
            setInfo([...info.filter(i => i.id !== numberId)])
            setValidInfoTitle([...validInfoTitle.filter(i => i.id !== numberId)])
            setValidInfoDescription([...validInfoDescription.filter(i => i.id !== numberId)])
        }
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(item => item.id === number ? { ...item, [key]: value } : item))
        validFieldProperties(value).then(data => {
            let newData = { id: number, flag: data.flag, message: data.message }
            if (key === 'title') {
                setValidInfoTitle([...validInfoTitle.filter(i => i.id !== number), newData])
            } else {
                setValidInfoDescription([...validInfoDescription.filter(i => i.id !== number), newData])
            }
        })
    }

    const functionFlagValidInfo = (arrayValid) => {
        for (let i = 0; i < arrayValid.length; i++) {
            if (arrayValid[i].flag === false)
                return false
        }
        return true
    }

    const getValidFieldTitle = (numberId) => {
        return validInfoTitle.find(i => i.id === numberId)
    }
    const getValidFieldDescription = (numberId) => {
        return validInfoDescription.find(i => i.id === numberId)
    }
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
            cb(formData).then(data => onHide())
        }

        if (title === 'Обновить устройство') {
            cb(device.id, formData).then(data => {
                onHide()
                window.location.reload();
            })
        }
    }

    const closeModal = () => {
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
                        onChange={event => onChangeFile(event.target.files[0])}
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
                                        onChange={event =>
                                            changeInfo('title', event.target.value, i.id)}
                                    />
                                    <div>
                                        <Validation validField={getValidFieldTitle(i.id)} field={i.title} message={''} />
                                    </div>


                                </Col>

                                <Col md={4}>
                                    <Form.Control
                                        placeholder='Введите описание свойства'
                                        value={i.description}
                                        onChange={event =>
                                            changeInfo('description', event.target.value, i.id)}
                                    />
                                    <div>
                                        <Validation validField={getValidFieldDescription(i.id)} field={i.description} message={''} />
                                    </div>
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