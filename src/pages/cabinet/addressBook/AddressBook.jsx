import React, { useContext, useEffect, useState } from 'react'
import styles from './AddressBook.module.css'
import { Button, Form, ListGroup } from 'react-bootstrap'
import Validation from '../../../components/validation/Validation'
import { updateUser } from '../../../http/userAPI'
import {
    validFieldName,
    validFieldPhoneNumber,
    validFieldCityStreet,
    validFieldHouse,
    validFieldApatment,
    validFieldIndex,

} from '../../../utils/validations'
import { Context } from '../../..'
import { createAddress, deleteAddress, getAllAddresses, updateAddress } from '../../../http/addressAPI'

const AddressBook = () => {
    const { userStore } = useContext(Context)
    const [reloader, setReloader] = useState(false)

    const [address, setAddress] = useState([{
        id: '',
        nameRecipient: '',
        familyRecipient: '',
        phoneNumberRecipient: '',
        index: '',
        city: '',
        street: '',
        house: '',
        apatment: ','
    }])
    const [nameRecipient, setNameRecipient] = useState('')
    const [familyRecipient, setFamilyRecipient] = useState('')
    const [phoneNumberRecipient, setPhoneNumberRecipient] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [house, setHouse] = useState('')
    const [apatment, setApatment] = useState('')
    const [index, setIndex] = useState('')

    const [validNameRecipient, setValidNameRecipient] = useState({ flag: false, message: '' })
    const [validFamilyRecipient, setValidFamilyRecipient] = useState({ flag: false, message: '' })
    const [validPhoneNumberRecipient, setValidPhoneNumberRecipient] = useState({ flag: false, message: '' })
    const [validCity, setValidCity] = useState({ flag: false, message: '' })
    const [validStreet, setValidStreet] = useState({ flag: false, message: '' })
    const [validHouse, setValidHouse] = useState({ flag: false, message: '' })
    const [validApatment, setValidApatment] = useState({ flag: false, message: '' })
    const [validIndex, setValidIndex] = useState({ flag: false, message: '' })

    const [flagButton, setFlagButtom] = useState(false)

    useEffect(() => {
        const id = userStore.user.id
        getAllAddresses(id).then(data => {
            setAddress(data.rows)
        })
    }, [reloader])

    useEffect(() => {
        setFlagButtom(
            validNameRecipient.flag
            && validFamilyRecipient.flag
            && validPhoneNumberRecipient.flag
            && validCity.flag
            && validStreet.flag
            && validHouse
            && validApatment
            && validIndex
        )
    }, [
        validNameRecipient,
        validFamilyRecipient,
        validPhoneNumberRecipient,
        validCity,
        validStreet,
        validHouse,
        validApatment,
        validIndex
    ])

    const onChangeName = (value) => {
        setNameRecipient(value)
        validFieldName(value).then(data =>
            setValidNameRecipient(data))
    }
    const onChangeFamily = (value) => {
        setFamilyRecipient(value)
        validFieldName(value).then(data =>
            setValidFamilyRecipient(data))
    }
    const onChangePhoneNumber = (value) => {
        setPhoneNumberRecipient(value)
        validFieldPhoneNumber(value).then(data =>
            setValidPhoneNumberRecipient(data))
    }

    const onChangeCity = (value) => {
        setCity(value)
        validFieldCityStreet(value).then(data =>
            setValidCity(data))
    }
    const onChangeStreet = (value) => {
        setStreet(value)
        validFieldCityStreet(value).then(data =>
            setValidStreet(data))
    }
    const onChangeHouse = (value) => {
        setHouse(value)
        validFieldHouse(value).then(data =>
            setValidHouse(data))
    }
    const onChangeApatment = (value) => {
        setApatment(value)
        validFieldApatment(value).then(data =>
            setValidApatment(data))
    }
    const onChangeIndex = (value) => {
        setIndex(value)
        validFieldIndex(value).then(data =>
            setValidIndex(data))
    }


    const save = () => {
        const formData = new FormData()
        formData.append('nameRecipient', nameRecipient)
        formData.append('familyRecipient', familyRecipient)
        formData.append('phoneNumberRecipient', phoneNumberRecipient)
        formData.append('city', city)
        formData.append('street', street)
        formData.append('house', house)
        formData.append('apatment', apatment)
        formData.append('index', index)
        formData.append('userId', userStore.user.id)
        createAddress(formData).then(data => {
            setReloader(!reloader)
            cleanItem()
        })
    }

    const deleteItem = (id) => {
        deleteAddress(id).then(data => setReloader(!reloader))
    }

    // updateAddress(id).then(data => setReloader(!reloader))

    const selectItem = (item) => {
        setValues(item)
        setValidationValues({ flag: true, message: 'Ok' })
    }
    const cleanItem = () => {
        cleanValues()
        setValidationValues({ flag: false, message: '' })
    }

    const setValues = (item) => {
        setNameRecipient(item.nameRecipient)
        setFamilyRecipient(item.familyRecipient)
        setPhoneNumberRecipient(item.phoneNumberRecipient)
        setCity(item.city)
        setStreet(item.street)
        setHouse(item.house)
        setApatment(item.apatment)
        setIndex(item.index)
    }
    const cleanValues = () => {
        setNameRecipient('')
        setFamilyRecipient('')
        setPhoneNumberRecipient('')
        setCity('')
        setStreet('')
        setHouse('')
        setApatment('')
        setIndex('')
    }

    const setValidationValues = (object) => {
        setValidNameRecipient(object)
        setValidFamilyRecipient(object)
        setValidPhoneNumberRecipient(object)
        setValidCity(object)
        setValidStreet(object)
        setValidHouse(object)
        setValidApatment(object)
        setValidIndex(object)
    }



    return (
        <div className={styles.container}>


            <ListGroup as="ol" numbered className={styles.col + ' ' + styles.a1}>
                {address.map(item =>
                    <ListGroup.Item as="li">
                        <div>
                            <p>{item.nameRecipient + " " + item.familyRecipient}</p>
                            <p>{`телефон: ${item.phoneNumberRecipient}`}</p>
                            <p>{`индекс: ${item.index} город: ${item.city}`}</p>
                            <p>{`ул: ${item.street} д: ${item.house} кв: ${item.apatment}`}</p>
                        </div>
                        <div>
                            <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>Удалить</Button>
                            <Button variant="outline-warning" onClick={() => selectItem(item)}>Редактировать</Button>
                        </div>
                    </ListGroup.Item>)}
            </ListGroup>
            <div className={styles.col + ' ' + styles.b1}>
                <h5>Добавление нового адреса</h5>
            </div>
            <div className={styles.col + ' ' + styles.b2}>
                <Form.Control
                    placeholder="Имя Получателя"
                    value={nameRecipient}
                    onChange={event => onChangeName(event.target.value.trim())}
                    type="text"
                />
                <Validation validField={validNameRecipient} field={nameRecipient} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.b3}>
                <Form.Control
                    placeholder="Фамилия  Получателя"
                    value={familyRecipient}
                    onChange={event => onChangeFamily(event.target.value.trim())}
                    type="text"
                />
                <Validation validField={validFamilyRecipient} field={familyRecipient} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.b4}></div>
            <div className={styles.col + ' ' + styles.b5}></div>
            <div className={styles.col + ' ' + styles.b6}>
            <Button variant="outline-info" onClick={cleanItem} className={styles.button}
                    hidden={nameRecipient === ''}>Очистить</Button>
            </div>

            <div className={styles.col + ' ' + styles.c1}></div>
            <div className={styles.col + ' ' + styles.c2}>
                <Form.Control
                    placeholder="Телефон"
                    value={phoneNumberRecipient}
                    onChange={event => onChangePhoneNumber(event.target.value.trim())}
                    type="text"
                />
                <Validation validField={validPhoneNumberRecipient} field={phoneNumberRecipient} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.c3}>
                <Form.Control
                    placeholder="Город"
                    value={city}
                    onChange={event => onChangeCity(event.target.value.trim())}
                    type="text"
                />
                <Validation validField={validCity} field={city} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.c4}>
                <Form.Control
                    placeholder="Улица"
                    value={street}
                    onChange={event => onChangeStreet(event.target.value.trim())}
                    type="text"
                />
                <Validation validField={validStreet} field={street} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.c5}>

                <div className={styles.col + ' ' + styles.c51}>
                    <Form.Control
                        className={styles.control}
                        placeholder="Дом"
                        value={house}
                        onChange={event => onChangeHouse(event.target.value.trim())}
                        type="text"
                    />
                    <Validation validField={validHouse} field={house} message={''} />
                </div>
                <div className={styles.col + ' ' + styles.c52}>
                    <Form.Control
                        className={styles.control}
                        placeholder="Квартира"
                        value={apatment}
                        onChange={event => onChangeApatment(event.target.value.trim())}
                        type="text"
                    />
                    <Validation validField={validApatment} field={apatment} message={''} />
                </div>
                <div className={styles.col + ' ' + styles.c53}>
                    <Form.Control
                        className={styles.control}
                        placeholder="Индекс"
                        value={index}
                        onChange={event => onChangeIndex(event.target.value.trim())}
                        type="text"
                    />
                    <Validation validField={validIndex} field={index} message={''} />
                </div>

            </div>
            <div className={styles.col + ' ' + styles.c6}>
                <Button variant="outline-success" onClick={save} className={styles.button}
                    disabled={!flagButton}>Сохранить</Button>
            </div>
        </div>
    )
}

export default AddressBook