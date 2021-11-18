import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Context } from '../..'
import styles from './Ordering.module.css'
import { fetchAllBasketDevice } from '../../http/basketDeviceAPI'
import { firmsPost, cities, paymentMethod, optionsDelivery } from '../../utils/helpArrays'
import ObjectList from '../../components/objectList/ObjectList'
import BasketDeviceItem from '../../components/items/basketDeviceItem/BasketDeviceItem'
import { beautifulViewPrice } from '../../utils/helpFunctions'
import { observer } from 'mobx-react-lite'
import { getAddress } from '../../http/addressAPI'
import Validation from '../../components/validation/Validation'
import { validFieldApatment, validFieldCityStreet, validFieldEmail, validFieldHouse, validFieldName, validFieldPhoneNumber, validFieldText } from '../../utils/validations'
import { createOrder } from '../../http/orderingAPI'

const Ordering = observer(() => {
    const { userStore, deviceStore } = useContext(Context)
    const [basketDevices, setBasketDevices] = useState([])
    const [objectsJSX, setObjectsJSX] = useState([])

    const [payment, setPayment] = useState('')
    const [post, setPost] = useState('')
    const [options, setOptions] = useState('')
    const [city, setCity] = useState('')
    const [branchParcelMachine, setBranchParcelMachine] = useState('')
    const [street, setStreet] = useState('')
    const [house, setHouse] = useState('')
    const [apatment, setApatment] = useState('')

    const [name, setName] = useState('')
    const [family, setFamily] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [comments, setComments] = useState('')
    const [sendBill, setSendBill] = useState(false)

    const [isBranch, setIsBranch] = useState(false)
    const [isCourier, setIsCourier] = useState(false)

    const totalPrice = deviceStore.totalPrice

    const validFalse = { flag: false, message: '' }
    const validTrue = { flag: true, message: 'Ok' }

    const [validName, setValidName] = useState(validFalse)
    const [validFamily, setValidFamily] = useState(validFalse)
    const [validPhoneNumber, setValidPhoneNumber] = useState(validFalse)
    const [validEmail, setValidEmail] = useState(validFalse)
    const [validComments, setValidComments] = useState(validFalse)
    const [validStreet, setValidStreet] = useState(validFalse)
    const [validHouse, setValidHouse] = useState(validFalse)
    const [validApatment, setValidApatment] = useState(validFalse)
    const [flagSubmit, setFlagSubmit] = useState(false)

    useEffect(() => {
        getAddress(userStore.addressId).then(address => {
            setCity(address.city)
            setStreet(address.street)
            setHouse(address.house)
            setApatment(address.apatment)
            setName(address.nameRecipient)
            setFamily(address.familyRecipient)
            setPhoneNumber(address.phoneNumberRecipient)
            setEmail(address.emailRecipient)
            flagValidForFields(validTrue)
        })

        fetchAllBasketDevice(userStore.user.id).then(data => {
            setBasketDevices(data.result)
            const array = []
            for (let i = 0; i < data.result.length; i++) {
                array.push(<BasketDeviceItem object={data.result[i]} typeItem='typeItem' />)
            }
            setObjectsJSX(array)
            deviceStore.setTotalPrice(data.totalPrice)
        })
    }, [])

    useEffect(() => {
        setFlagSubmit(
            validName.flag && validFamily.flag && validPhoneNumber.flag && validEmail.flag &&
            validComments.flag && validStreet.flag && validHouse.flag && validApatment.flag)
    }, [validName, validFamily, validPhoneNumber, validEmail, validComments, validStreet,
        validHouse, validApatment])

    const flagValidForFields = (valid) => {
        setValidName(valid)
        setValidFamily(valid)
        setValidPhoneNumber(valid)
        setValidEmail(valid)
        setValidComments(valid)
        setValidStreet(valid)
        setValidHouse(valid)
        setValidApatment(valid)
    }

    const onChangePayment = (value) => {
        setPayment(value)
    }

    const onChangePost = (value) => {
        setPost(value)
    }

    const onChangeCity = (value) => {
        setCity(value)
    }

    const onChangeBranchParcelMachine = (value) => {
        setBranchParcelMachine(value)
    }

    const onChangeOptions = (value) => {
        if (value === 'Самовывоз из отделения') {
            setIsBranch(true)
            setIsCourier(false)
        }
        if (value === 'Почтомат') {
            setIsBranch(false)
            setIsCourier(false)
        }
        if (value === 'Доставка курьером') {
            setIsCourier(true)
            setIsBranch(false)
        }
        setOptions(value)
    }
    const onChangeStreet = (value) => {
        setStreet(value)
        validFieldCityStreet(value).then(data => setValidStreet(data))
    }
    const onChangeHouse = (value) => {
        setHouse(value)
        validFieldHouse(value).then(data => setValidHouse(data))
    }
    const onChangeApatment = (value) => {
        setApatment(value)
        validFieldApatment(value).then(data => setValidApatment(data))
    }
    const onChangeName = (value) => {
        setName(value)
        validFieldName(value).then(data => setValidName(data))
    }
    const onChangeFamily = (value) => {
        setFamily(value)
        validFieldName(value).then(data => setValidFamily(data))
    }
    const onChangePhoneNumber = (value) => {
        setPhoneNumber(value)
        validFieldPhoneNumber(value).then(data => setValidPhoneNumber(data))
    }
    const onChangeEmail = (value) => {
        setEmail(value)
        validFieldEmail(value).then(data => setValidEmail(data))
    }
    const onChangeComments = (value) => {
        setComments(value)
        validFieldText(value).then(data => setValidComments(data))
    }

    const onClickSendBill = () => {
        setSendBill(!sendBill)
    }

    const submit = () => {
        const formData = new FormData()
        formData.append('payment', payment)
        formData.append('post', post)
        formData.append('options', options)
        formData.append('city', city)
        formData.append('branchParcelMachine', branchParcelMachine)
        formData.append('street', street)
        formData.append('house', house)
        formData.append('apatment', apatment)
        formData.append('name', name)
        formData.append('family', family)
        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('comments', comments)
        formData.append('sendBill', sendBill)

        createOrder(formData).then(data => console.log(data))
    }

    return (
        <div className={styles.container}>
            <div className={styles.col + " " + styles.a}>
                <hr />
                <Form.Label>Способ оплаты</Form.Label>
                <Form.Select className={styles.select} onChange={e => onChangePayment(e.target.value)}>
                    {paymentMethod.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <hr />
                <Form.Label>Почтовый оператор</Form.Label>
                <Form.Select className={styles.select} onChange={e => onChangePost(e.target.value)}>
                    {firmsPost.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <Form.Label>Способ доставки</Form.Label>
                <Form.Select className={styles.select} onChange={e => onChangeOptions(e.target.value)}>
                    {optionsDelivery.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <Form.Label>Город</Form.Label>
                <Form.Select className={styles.select} onChange={e => onChangeCity(e.target.value)}>
                    {cities.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <Form.Label hidden={isCourier}>{isBranch ? 'Отделение' : 'Почтомат'}</Form.Label>
                <Form.Select hidden={isCourier} className={styles.select} onChange={e => onChangeBranchParcelMachine(e.target.value)}>

                </Form.Select>
                <div hidden={!isCourier} className={styles.courier}>
                    <div className={styles.input + " " + styles.street}>
                        <Form.Control value={street} type="text" placeholder="Улица"
                            onChange={e => onChangeStreet(e.target.value)} />
                        < Validation valid={validStreet} value={street} message={''} />
                    </div>
                    <div className={styles.input + ' ' + styles.house}>
                        <Form.Control value={house} type="text" placeholder="Дом"
                            onChange={e => onChangeHouse(e.target.value)} />
                        < Validation valid={validHouse} value={house} message={''} />
                    </div>
                    <div className={styles.input + ' ' + styles.apatment}>
                        <Form.Control value={apatment} type="text" placeholder="Кв."
                            onChange={e => onChangeApatment(e.target.value)} />
                        < Validation valid={validApatment} value={apatment} message={''} />
                    </div>
                </div>
                <hr />
                <p>Информация о получателе:</p>
                <Form.Group className={styles.input} controlId="formBasicPassword">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={name} type="text" placeholder="Имя" onChange={e => onChangeName(e.target.value)} />
                    < Validation valid={validName} value={name} message={''} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control value={family} type="text" placeholder="Фамилия"
                        onChange={e => onChangeFamily(e.target.value)} />
                    < Validation valid={validFamily} value={family} message={''} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control value={phoneNumber} type="text" placeholder="Телефон"
                        onChange={e => onChangePhoneNumber(e.target.value)} />
                    < Validation valid={validPhoneNumber} value={phoneNumber} message={''} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} type="email" placeholder="Email"
                        onChange={e => onChangeEmail(e.target.value)} />
                    < Validation valid={validEmail} value={email} message={''} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Комментарий</Form.Label>
                    <Form.Control value={comments} as="textarea" rows={3} placeholder="Уточнение к заказу"
                        onChange={e => onChangeComments(e.target.value)} />
                    < Validation valid={validComments} value={comments} message={''} />
                </Form.Group>
                <hr />
                <Form.Check checked={!sendBill} onClick={() => onClickSendBill()} type="checkbox" label="Выслать счёт на оплату" />
                <hr />
                <div>К оплате: {beautifulViewPrice(totalPrice)}</div>
                <hr />
                <Button disabled={!flagSubmit} variant="outline-success" onClick={submit}>Подтвердить заказ</Button>
                <hr />
                <p>Подтверждая заказ вы соглашаетесь с политикой конфиденциальности</p>
            </div>
            <div className={styles.col + " " + styles.b}>
                <ObjectList objectsJSX={objectsJSX} list={'orderingBasketList'} />
            </div>
        </div>
    )
})

export default Ordering