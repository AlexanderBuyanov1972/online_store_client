import React, { useContext, useEffect, useState } from 'react';
import styles from './CreateUpdateDevice.module.css'
import { Button, Col, Form, Modal, Row, Dropdown } from "react-bootstrap";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import { getStartFormInfoByType } from "../../../utils/getStartFormInfoByType";
import { fetchOneType, fetchTypes } from "../../../http/typeAPI";
import { fetchBrands, fetchOneBrand } from "../../../http/brandAPI";
import { validation } from '../../../utils/validations'
import Validation from '../../validation/Validation'

const CreateUpdateDevice = observer(({ show, onHide, device, title, cb }) => {
    const { deviceStore } = useContext(Context)

    const [type, setType] = useState({ id: '', name: '' })
    const [brand, setBrand] = useState({ id: '', name: '' })

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

    useEffect(() => {
        fetchTypes().then(data => deviceStore.setTypes(data.filter(i => i.id !== 1)))
        fetchBrands().then(data => deviceStore.setBrands(data.filter(i => i.id !== 1)))
        if (device.typeId)
            fetchOneType(device.typeId).then(data => {
                setType(data)
                validation.validIdTypeBrand(data).then(data => setValidType(data))
            })
        if (device.brandId)
            fetchOneBrand(device.brandId).then(data => {
                setBrand(data)
                validation.validIdTypeBrand(data).then(data => setValidBrand(data))
            })
        if (device.name)
        validation.validFieldNameDevice(device.name).then(data => setValidName(data))
        if (device.price)
        validation.validFieldPrice(device.price).then(data => setValidPrice(data))
        if (device.rating)
        validation.validFieldRating(device.rating).then(data => setValidRating(data))
        if (device.img)
        validation.validFieldFile(device.img).then(data => setValidFile(data))
        fillInArrayValids(device.info)
    }, [])

    const fillInArrayValids = async (array) => {
        if (array && array.length > 0) {
            const arrayTitle = []
            const arrayDescription = []
            for (let i = 0; i < array.length; i++) {
                if (array[i].title === '') {
                    arrayTitle.push({ id: array[i].id, flag: false, message: '' })
                } else {
                    arrayTitle.push({ id: array[i].id, flag: true, message: 'Ok' })
                }
                if (array[i].description === '') {
                    arrayDescription.push({ id: array[i].id, flag: false, message: '' })
                } else {
                    arrayDescription.push({ id: array[i].id, flag: true, message: 'Ok' })
                }
            }
            setValidInfoTitle([...arrayTitle])
            setValidInfoDescription([...arrayDescription])
        } else {
            setValidInfoTitle([])
            setValidInfoDescription([])
        }
    }

    useEffect(() => {
        setFlagSubmitButton(
            validType.flag && validBrand.flag && validName.flag && validPrice.flag && validRating.flag
            && validFile.flag && functionFlagValidInfo(validInfoTitle) && functionFlagValidInfo(validInfoDescription)
        )
    }, [validType, validBrand, validName, validPrice, validRating, validFile, validInfoTitle, validInfoDescription])


    const onChangeType = (value) => {
        setType(value)
        validation.validIdTypeBrand(value).then(data => setValidType(data))
        const data = getStartFormInfoByType(value)
        setInfo(data)
        fillInArrayValids(data)
    }

    const onChangeBrand = (value) => {
        setBrand(value)
        validation.validIdTypeBrand(value).then(data => setValidBrand(data))
    }

    const onChangeName = (value) => {
        setName(value)
        validation.validFieldNameDevice(value).then(data => setValidName(data))
    }

    const onChangePrice = (value) => {
        setPrice(value)
        validation.validFieldPrice(value).then(data => setValidPrice(data))
    }
    const onChangeRating = (value) => {
        setRating(value)
        validation.validFieldRating(value).then(data => setValidRating(data))
    }
    const onChangeFile = (value) => {
        setFile(value)
        validation.validFieldFile(value).then(data => setValidFile(data))
    }

    const addInfo = () => {
        const numberId = Date.now()
        setInfo([...info, { title: "", description: "", id: numberId }])
        const object = { id: numberId, flag: false, message: '' }
        setValidInfoTitle([...validInfoTitle, object])
        setValidInfoDescription([...validInfoDescription, object])
    }

    const removeInfo = (numberId) => {
        if (info.length === 1) {
            const newInfo = getStartFormInfoByType(type)
            setInfo([...newInfo])
            fillInArrayValids(newInfo)
        } else {
            setInfo([...info.filter(i => i.id !== numberId)])
            setValidInfoTitle([...validInfoTitle.filter(i => i.id !== numberId)])
            setValidInfoDescription([...validInfoDescription.filter(i => i.id !== numberId)])
        }
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(item => item.id === number ? { ...item, [key]: value } : item))
        validation.validFieldProperties(value).then(data => {
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

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('rating', `${rating}`)
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))

        if (title === '?????????????? ????????????????????')
            cb(formData).then(data => onHide())

        if (title === '???????????????? ????????????????????') {
            cb(device.id, formData).then(data => {
                deviceStore.setFlagReload(true)
                closeModal()
                //window.location.reload();
            })
        }
    }

    const closeModal = () => {
        deviceStore.setFlagReload(false)
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
                        <Dropdown.Toggle>{type.name || '???????????? ??????'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.types.map(type =>
                                <Dropdown.Item key={type.id} onClick={() => onChangeType(type)}
                                >{type.name}</Dropdown.Item>)}z
                        </Dropdown.Menu>
                    </Dropdown>
                    < Validation validField={validType} field={type} message={''} />
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{brand.name || '???????????? ??????????'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => onChangeBrand(brand)}
                                >{brand.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    < Validation valid={validBrand} value={brand} message={''} />
                    <hr />
                    <Form.Control
                        className={styles.control}
                        placeholder='?????????????? ???????????????? ????????????????????'
                        value={name}
                        onChange={event => onChangeName(event.target.value)}

                    />
                    < Validation valid={validName} value={name} message={''} />
                    <hr />
                    <Form.Control
                        className={styles.control}
                        placeholder='?????????????? ?????????????????? ????????????????????'
                        value={price}
                        onChange={event => onChangePrice(event.target.value)}

                    />
                    < Validation valid={validPrice} value={price} message={''} />
                    <hr />
                    <Form.Control
                        className={styles.control}
                        placeholder='?????????????? ?????????????? ????????????????????'
                        value={rating}
                        onChange={event => onChangeRating(event.target.value)}
                    />
                    < Validation valid={validRating} value={rating} message={''} />
                    <hr />
                    <Form.Control
                        type="file"
                        className={styles.control}
                        onChange={event => onChangeFile(event.target.files[0])}
                        placeholder={device.img}
                    />
                    < Validation valid={validFile} value={file} message={''} />
                    <hr />
                    <Button variant={'outline-dark'} onClick={() => addInfo()
                    }>???????????????? ?????????? ????????????????</Button>
                    <hr />
                    {
                        info.map((i) =>
                            <Row key={i.id} className={styles.control}>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder='?????????????? ???????????????? ????????????????'
                                        value={i.title}
                                        onChange={event =>
                                            changeInfo('title', event.target.value, i.id)}
                                    />
                                    <div>
                                        <Validation valid={getValidFieldTitle(i.id)} value={i.title} message={''} />
                                    </div>


                                </Col>

                                <Col md={4}>
                                    <Form.Control
                                        placeholder='?????????????? ???????????????? ????????????????'
                                        value={i.description}
                                        onChange={event =>
                                            changeInfo('description', event.target.value, i.id)}
                                    />
                                    <div>
                                        <Validation valid={getValidFieldDescription(i.id)} value={i.description} message={''} />
                                    </div>
                                </Col>

                                <Col md={4}>
                                    <Button variant={'outline-danger'} onClick={() =>
                                        removeInfo(i.id)}>?????????????? ????????????????</Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={closeModal}>??????????????</Button>
                <Button variant={'outline-info'} onClick={cleanModal} hidden={title === '???????????????? ????????????????????'}>????????????????</Button>
                <Button variant={'outline-success'} onClick={addDevice} disabled={!flagSubmitButton}>????</Button>
            </Modal.Footer>
        </Modal>
    );
})


export default CreateUpdateDevice;