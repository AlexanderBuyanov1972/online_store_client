import React, { useContext, useEffect, useState } from 'react'
import styles from './AddressBook.module.css'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { validation } from '../../../utils/validations'
import { Context } from '../../..'
import addressHttp from '../../../http/addressAPI'
import Validation from '../../../components/validation/Validation'
import { useValidInput } from '../../../hooks/useValidInput'
import { useRequest } from '../../../hooks/useRequest'

const AddressBook = () => {
    const { userStore } = useContext(Context)
    const userId = userStore.user.id
    const addressEmpty = {
        id: '', name: '', family: '', email: '', phoneNumber: '', city: '', street: ''
        , house: '', apatment: '', index: '', default: false
    }
    const [addresses, setAddresses] = useState([])
    const [addressIdForUpdate, setAddressIdForUpdate] = useState('')
    const [isDefault, setIsDefault] = useState(false)
    const [flagButton, setFlagButtom] = useState(false)
    const [reload, setReload] = useState(false)

    const name = useValidInput('', validation.validFieldName)
    const family = useValidInput('', validation.validFieldName)
    const email = useValidInput('', validation.validFieldEmail)
    const phoneNumber = useValidInput('', validation.validFieldPhoneNumber)
    const city = useValidInput('', validation.validFieldCityStreet)
    const street = useValidInput('', validation.validFieldCityStreet)
    const house = useValidInput('', validation.validFieldHouse)
    const apatment = useValidInput('', validation.validFieldApatment)
    const index = useValidInput('', validation.validFieldIndex)

    // const [data, loading, error, reload, reloading] = useRequest(addressHttp.getAllAddresses, userId)

    useEffect(() => {
        setFlagButtom(name.valid.flag && family.valid.flag && email.valid.flag &&
            phoneNumber.valid.flag && city.valid.flag && street.valid.flag && house.valid.flag &&
            apatment.valid.flag && index.valid.flag)
    }, [name, family, email, phoneNumber, city, street, house, apatment, index, reload])

    // if (loading) 
    //     return <h1>Идёт загрузка</h1>

    // if (error) 
    //     return <h1>Произошла ошибка</h1>

    // if (data) 
    //     setAddresses(data)

    useEffect(() => {
        addressHttp.getAllAddresses(userId).then(data => setAddresses(data.rows))
    }, [reload])



    const save = () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('family', family.value)
        formData.append('phoneNumber', phoneNumber.value)
        formData.append('email', email.value)
        formData.append('city', city.value)
        formData.append('street', street.value)
        formData.append('house', house.value)
        formData.append('apatment', apatment.value)
        formData.append('index', index.value)
        formData.append('isDefault', isDefault)
        formData.append('userId', userStore.user.id)

        if (addressIdForUpdate !== '') {
            addressHttp.updateAddress(addressIdForUpdate, formData)
                .then(data => {
                    cleanForm()
                    setReload(!reload)
                })
                .catch(error => alert(error.message))
        } else {
            addressHttp.createAddress(formData)
                .then(data => {
                    cleanForm()
                    setReload(!reload)
                })
                .catch(error => alert(error.message))
        }
    }
    // функция изменить адресс по умолчанию в листе адрессов
    const selectAddressDefault = (id_new) => {
        let id_old = ''
        const element = addresses.find(el => el.isDefault === true)
        !element || element === {} ? id_old = id_new : id_old = element.id
        addressHttp.replaceAddressDefault(id_old, id_new)
            .then(data => setReload(!reload))
            .catch(error => alert(error.message))
    }
    // функция удалить адресс
    const deleteItem = (id) => {
        addressHttp.deleteAddress(id)
            .then(data => setAddressIdForUpdate(''))
            .catch(error => alert(error.message))
            .finally(() => setReload(!reload))
    }
    //функция редактировать адресс
    const editItem = (item) => {
        setForm(item)
        setAddressIdForUpdate(item.id)
        setIsDefault(item.isDefault)
    }

    // функция заполнить форму объектом
    const setForm = (object) => {
        name.onSetInput(object.name)
        family.onSetInput(object.family)
        phoneNumber.onSetInput(object.phoneNumber)
        email.onSetInput(object.email)
        city.onSetInput(object.city)
        street.onSetInput(object.street)
        house.onSetInput(object.house)
        apatment.onSetInput(object.apatment)
        index.onSetInput(object.index)
        setIsDefault(object.isDefault)
    }
    // функция очистиь форму
    const cleanForm = () => {
        setForm(addressEmpty)
        setAddressIdForUpdate('')
        setIsDefault(false)
    }

    // установить адресс по умолчанию (true/false) в форму нового объекта
    const setAddressDefault = () => setIsDefault(!isDefault)

    return (
        <div className={styles.container}>
            <div className={styles.col + ' ' + styles.a}>
                <ListGroup className={styles.list}>
                    {addresses.map(item =>
                        <ListGroup.Item as="li" key={item.id}>
                            <Form.Check label="по умолчанию" name="group" type='radio' value={item.id}
                                onClick={() => selectAddressDefault(item.id)}
                                checked={item.isDefault === true}
                            />
                            <div>
                                <p>{item.name + " " + item.family}</p>
                                <p>{`телефон: ${item.phoneNumber}`}</p>
                                <p>{`email: ${item.email}`}</p>
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
                {<h5>Добавление нового адресса</h5>}
            </div>
            <div className={styles.col + ' ' + styles.b2}>
                <Form.Control type="text" placeholder='Имя Получателя'
                    value={name.value} onChange={name.onChange}
                />
                <Validation message='' value={name.value} valid={name.valid} />
            </div>
            <div className={styles.col + ' ' + styles.b3}>
                <Form.Control type="text" placeholder='Фамилия Получателя'
                    value={family.value}
                    onChange={family.onChange}
                    onClick={family.onChange}
                />
                <Validation message='' value={family.value} valid={family.valid} />
            </div>
            <div className={styles.col + ' ' + styles.b4}>
                <Form.Control type="text" placeholder='Email Получателя'
                    value={email.value} onChange={email.onChange} onClick={email.onChange} />
                <Validation message='' value={email.value} valid={email.valid} />
            </div>
            <div className={styles.col + ' ' + styles.b5}>
                <Form.Check checked={isDefault} onChange={() => setAddressDefault()}
                    type="checkbox" label="Сделать адрессом по умолчанию" />
            </div>
            <div className={styles.col + ' ' + styles.b6}>
                <Button variant="outline-info" onClick={cleanForm} className={styles.button}
                    hidden={addressIdForUpdate === ''}>Очистить</Button>
            </div>
            <div className={styles.col + ' ' + styles.c1}></div>
            <div className={styles.col + ' ' + styles.c2}>
                <Form.Control type="text" placeholder='Телефон Получателя'
                    value={phoneNumber.value} onChange={phoneNumber.onChange} onClick={phoneNumber.onChange}
                />
                <Validation message='' value={phoneNumber.value} valid={phoneNumber.valid} />
            </div>
            <div className={styles.col + ' ' + styles.c3}>
                <Form.Control type="text" placeholder='Город'
                    value={city.value} onChange={city.onChange} onClick={city.onChange} />
                <Validation message='' value={city.value} valid={city.valid} />
            </div>
            <div className={styles.col + ' ' + styles.c4}>
                <Form.Control type="text" placeholder='Улица'
                    value={street.value} onChange={street.onChange} onClick={street.onChange} />
                <Validation message='' value={street.value} valid={street.valid} />
            </div>
            <div className={styles.col + ' ' + styles.c5}>
                <div className={styles.col + ' ' + styles.c51}>
                    <Form.Control type="text" placeholder='Дом'
                        value={house.value} onChange={house.onChange} onClick={house.onChange} />
                    <Validation message='' value={house.value} valid={house.valid} />
                </div>
                <div className={styles.col + ' ' + styles.c52}>
                    <Form.Control type="text" placeholder='Квартира'
                        value={apatment.value} onChange={apatment.onChange} onClick={apatment.onChange} />
                    <Validation message='' value={apatment.value} valid={apatment.valid} />
                </div>
                <div className={styles.col + ' ' + styles.c53}>
                    <Form.Control type="text" placeholder='Индекс'
                        value={index.value} onChange={index.onChange} onClick={index.onChange} />
                    <Validation message='' value={index.value} valid={index.valid} />
                </div>
            </div>
            <div className={styles.col + ' ' + styles.c6}>
                <Button variant="outline-success" onClick={save} className={styles.button} disabled={!flagButton}
                >{'Сохранить'}</Button>
            </div>
        </div>
    )
}

export default AddressBook