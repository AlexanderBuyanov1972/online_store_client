import React, { useContext, useEffect, useState } from 'react'
import styles from './AddressBook.module.css'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { validation } from '../../../utils/validations'
import { Context } from '../../..'
import { createAddress, deleteAddress, getAddress, getAllAddresses, updateAddress } from '../../../http/addressAPI'
import Validation from '../../../components/validation/Validation'
import { useValidInput } from '../../../hooks/useValidInput'

const AddressBook = () => {
    const { userStore } = useContext(Context)

    const validFalse = { flag: false, message: '' }
    const validTrue = { flag: true, message: 'Ok' }

    const nameRecipient = useValidInput('', validFalse, validation.validFieldName)
    const familyRecipient = useValidInput('', validFalse, validation.validFieldName)
    const emailRecipient = useValidInput('', validFalse, validation.validFieldEmail)
    const phoneNumberRecipient = useValidInput('', validFalse, validation.validFieldPhoneNumber)
    const city = useValidInput('', validFalse, validation.validFieldCityStreet)
    const street = useValidInput('', validFalse, validation.validFieldCityStreet)
    const house = useValidInput('', validFalse, validation.validFieldHouse)
    const apatment = useValidInput('', validFalse, validation.validFieldApatment)
    const index = useValidInput('', validFalse, validation.validFieldIndex)

    const [addressId, setAddressId] = useState('')
    const [address, setAddress] = useState({})
    const [addresses, setAddresses] = useState([])
    const [flagButton, setFlagButtom] = useState(false)
    const [reloader, setReloader] = useState(false)

    useEffect(() => {
        getAllAddresses(userStore.user.id).then(data => {
            setAddresses(data.rows)
        })
    }, [reloader])

    useEffect(() => {
        getAddress(addressId).then(data => setAddress(data))
    }, [addressId])

    useEffect(() => {
        setFlagButtom(
            nameRecipient.valid.flag &&
            familyRecipient.valid.flag &&
            emailRecipient.valid.flag &&
            phoneNumberRecipient.valid.flag &&
            city.valid.flag &&
            street.valid.flag &&
            house.valid.flag &&
            apatment.valid.flag &&
            index.valid.flag
        )
    }, [nameRecipient, familyRecipient, emailRecipient, phoneNumberRecipient,
        city, street, house, apatment, index])

    const save = () => {
        const formData = new FormData()
        formData.append('nameRecipient', nameRecipient.value)
        formData.append('familyRecipient', familyRecipient.value)
        formData.append('phoneNumberRecipient', phoneNumberRecipient.value)
        formData.append('emailRecipient', emailRecipient.value)
        formData.append('city', city.value)
        formData.append('street', street.value)
        formData.append('house', house.value)
        formData.append('apatment', apatment.value)
        formData.append('index', index.value)
        formData.append('userId', userStore.user.id)

        if (addressId && addressId !== '') {
            updateAddress(addressId, formData).then(data => {
                setReloader(!reloader)
                cleanForm()
            })
        } else {
            createAddress(formData).then(data => {
                setReloader(!reloader)
                cleanForm()
            })
        }
    }

    const selectAddress = (item) => {
        userStore.setAddress(item)
    }
    const deleteItem = (id) => {
        deleteAddress(id)
        setReloader(!reloader)
    }
    const editItem = (item) => {
        setAddress(item)
    }
    const cleanForm = () => {
        setAddress({
            nameRecipient: '', familyRecipient: '', emailRecipient: '', phoneNumberRecipient: '',
            city: '', street: '', house: '', apatment: '', index: ''
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.col + ' ' + styles.a}>
                <ListGroup>
                    {addresses.map(item =>
                        <ListGroup.Item as="li" key={item.id}>
                            <Form.Check label="по умолчанию" name="group1" type='radio' onClick={() => selectAddress(item.id)} />
                            <div>
                                <p>{item.nameRecipient + " " + item.familyRecipient}</p>
                                <p>{`телефон: ${item.phoneNumberRecipient}`}</p>
                                <p>{`email: ${item.emailRecipient}`}</p>
                                <p>{`индекс: ${item.index} город: ${item.city}`}</p>
                                <p>{`ул: ${item.street} д: ${item.house} кв: ${item.apatment}`}</p>
                            </div>
                            <div>
                                <Button variant="outline-danger" onClick={() => deleteItem(item.id)}>Удалить</Button>
                                <Button variant="outline-warning" onClick={() => editItem(item)}>Редактировать</Button>
                            </div>
                        </ListGroup.Item>)}
                </ListGroup>
            </div>
            <div className={styles.col + ' ' + styles.b1}>
                {addressId ? <h5>Обновление адресса</h5> : <h5>Добавление нового адресса</h5>}
            </div>

            <div className={styles.col + ' ' + styles.b2}>
                <Form.Control type="text" placeholder='Имя Получателя'
                    value={nameRecipient.value || address.nameRecipient} 
                    onChange={nameRecipient.onChange} onClick={nameRecipient.onChange}/>
                <Validation message='' value={nameRecipient.value} valid={nameRecipient.valid} />
            </div>
            <div className={styles.col + ' ' + styles.b3}>
                <Form.Control type="text" placeholder='Фамилия Получателя'
                    value={familyRecipient.value || address.familyRecipient}
                     onChange={familyRecipient.onChange}  onClick={familyRecipient.onChange}/>
                <Validation message='' value={familyRecipient.value} valid={familyRecipient.valid} />
            </div>
            <div className={styles.col + ' ' + styles.b4}>
                <Form.Control type="text" placeholder='Email Получателя'
                    value={emailRecipient.value || address.emailRecipient} 
                    onChange={emailRecipient.onChange}  onClick={emailRecipient.onChange}/>
                <Validation message='' value={emailRecipient.value} valid={emailRecipient.valid} />
            </div>
            <div className={styles.col + ' ' + styles.b5}></div>
            <div className={styles.col + ' ' + styles.b6}>
                <Button variant="outline-info" onClick={cleanForm} className={styles.button}
                    hidden={address.nameRecipient === ''}>Очистить</Button>
            </div>
            <div className={styles.col + ' ' + styles.c1}></div>
            <div className={styles.col + ' ' + styles.c2}>
                <Form.Control type="text" placeholder='Телефон Получателя'
                    value={phoneNumberRecipient.value || address.phoneNumberRecipient}
                     onChange={phoneNumberRecipient.onChange}  onClick={phoneNumberRecipient.onChange}/>
                <Validation message='' value={phoneNumberRecipient.value} valid={phoneNumberRecipient.valid} />
            </div>
            <div className={styles.col + ' ' + styles.c3}>
                <Form.Control type="text" placeholder='Город' value={city.value || address.city}
                 onChange={city.onChange}  onClick={city.onChange}/>
                <Validation message='' value={city.value} valid={city.valid} />
            </div>
            <div className={styles.col + ' ' + styles.c4}>
                <Form.Control type="text" placeholder='Улица' value={street.value || address.street}
                 onChange={street.onChange}  onClick={street.onChange}/>
                <Validation message='' value={street.value} valid={street.valid} />
            </div>
            <div className={styles.col + ' ' + styles.c5}>
                <div className={styles.col + ' ' + styles.c51}>
                    <Form.Control type="text" placeholder='Дом' value={house.value || address.house}
                     onChange={house.onChange}  onClick={house.onChange}/>
                    <Validation message='' value={house.value} valid={house.valid} />
                </div>
                <div className={styles.col + ' ' + styles.c52}>
                    <Form.Control type="text" placeholder='Квартира' value={apatment.value || address.apatment} 
                    onChange={apatment.onChange}  onClick={apatment.onChange}/>
                    <Validation message='' value={apatment.value} valid={apatment.valid} />
                </div>
                <div className={styles.col + ' ' + styles.c53}>
                    <Form.Control type="text" placeholder='Индекс' value={index.value || address.index}
                     onChange={index.onChange}  onClick={index.onChange}/>
                    <Validation message='' value={index.value} valid={index.valid} />
                </div>
            </div>
            <div className={styles.col + ' ' + styles.c6}>
                <Button variant="outline-success" onClick={save} className={styles.button} disabled={!flagButton}
                >{addressId ? 'Обновить' : 'Сохранить'}</Button>
            </div>
        </div>
    )
}

export default AddressBook