import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Context } from '../..'
import styles from './Ordering.module.css'
import { fetchAllBasketDevice } from '../../http/basketDeviceAPI'
import { firmsPost, cities, paymentMethod, optionsDelivery, addresesBranchParcelMachine } from '../../utils/helpArrays'
import ObjectList from '../../components/objectList/ObjectList'
import BasketDeviceItem from '../../components/items/basketDeviceItem/BasketDeviceItem'
import { beautifulViewPrice } from '../../utils/helpFunctions'
import { observer } from 'mobx-react-lite'
import addressHttp from '../../http/addressAPI'
import Validation from '../../components/validation/Validation'
import { validation } from '../../utils/validations'
import { createOrder } from '../../http/orderingAPI'
import { useValidInput } from '../../hooks/useValidInput'

const Ordering = observer(() => {
    const { userStore, deviceStore } = useContext(Context)
    const [objectsJSX, setObjectsJSX] = useState([])

    const name = useValidInput('', validation.validFieldName)
    const family = useValidInput('', validation.validFieldName)
    const email = useValidInput('', validation.validFieldEmail)
    const phoneNumber = useValidInput('', validation.validFieldPhoneNumber)
    const comments = useValidInput('', validation.validFieldText)
    const street = useValidInput('', validation.validFieldCityStreet)
    const house = useValidInput('', validation.validFieldHouse)
    const apatment = useValidInput('', validation.validFieldApatment)

    const [payment, setPayment] = useState('')
    const [post, setPost] = useState('')
    const [options, setOptions] = useState('')
    const [city, setCity] = useState('')
    const [branchParcelMachine, setBranchParcelMachine] = useState('')



    const [sendBill, setSendBill] = useState(false)
    const [isBranch, setIsBranch] = useState(false)
    const [isCourier, setIsCourier] = useState(false)
    const [flagSubmit, setFlagSubmit] = useState(false)

    const totalPrice = deviceStore.totalPrice

    useEffect(() => {
        addressHttp.getAddress(userStore.addressId).then(address => {
            setCity(address.city)
            street.onSetInput(address.street)
            house.onSetInput(address.house)
            apatment.onSetInput(address.apatment)
            name.onSetInput(address.nameRecipient)
            family.onSetInput(address.familyRecipient)
            phoneNumber.onSetInput(address.phoneNumberRecipient)
            email.onSetInput(address.emailRecipient)
        })

        fetchAllBasketDevice(userStore.user.id).then(data => {
            const array = []
            data.result.forEach(element => {
                array.push(<BasketDeviceItem object={element} typeItem='typeItem' />)
            });
            setObjectsJSX(array)
            deviceStore.setTotalPrice(data.totalPrice)
        })
    }, [])

    useEffect(() => {
        setFlagSubmit(
            name.valid.flag && family.valid.flag && phoneNumber.valid.flag && email.valid.flag &&
            comments.valid.flag && street.valid.flag && house.valid.flag && apatment.valid.flag)
    }, [name, family, phoneNumber, email, comments, street, house, apatment])

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

    const onClickSendBill = () => setSendBill(!sendBill)

    const submit = () => {
        const formData = new FormData()
        formData.append('payment', payment)
        formData.append('post', post)
        formData.append('options', options)
        formData.append('city', city)
        formData.append('branchParcelMachine', branchParcelMachine)
        formData.append('street', street.value)
        formData.append('house', house.value)
        formData.append('apatment', apatment.value)
        formData.append('name', name.value)
        formData.append('family', family.value)
        formData.append('phoneNumber', phoneNumber.value)
        formData.append('email', email.value)
        formData.append('comments', comments.value)
        formData.append('sendBill', sendBill)

        createOrder(formData)
            .then(data => console.log(data))
            .catch(error => alert(error.message))
    }

    return (
        <div className={styles.container}>
            <div className={styles.col + " " + styles.a}>
                <hr />
                <Form.Label>Способ оплаты</Form.Label>
                <Form.Select className={styles.select} onChange={(e) => setPayment(e.target.value)}>
                    {paymentMethod.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <hr />
                <Form.Label>Почтовый оператор</Form.Label>
                <Form.Select className={styles.select} onChange={(e) => setPost(e.target.value)}>
                    {firmsPost.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <Form.Label>Способ доставки</Form.Label>
                <Form.Select className={styles.select} onChange={(e) => onChangeOptions(e.target.value)}>
                    {optionsDelivery.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <Form.Label>Город</Form.Label>
                <Form.Select className={styles.select} onChange={(e) => setCity(e.target.value)}>
                    {cities.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <Form.Label hidden={isCourier}>{isBranch ? 'Отделение' : 'Почтомат'}</Form.Label>
                <Form.Select hidden={isCourier} className={styles.select} onChange={(e) => setBranchParcelMachine(e.target.value)}>
                    {addresesBranchParcelMachine.map(item => <option key={item.id} value={item.name}>{item.name}</option>)
                    }
                </Form.Select>
                <div hidden={!isCourier} className={styles.courier}>
                    <div className={styles.input + " " + styles.street}>
                        <Form.Control type="text" placeholder="Улица"
                            value={street.value} onChange={street.onChange} />
                        < Validation valid={street.valid} value={street.value} message={''} />
                    </div>
                    <div className={styles.input + ' ' + styles.house}>
                        <Form.Control type="text" placeholder="Дом"
                            value={house.value} onChange={house.onChange} />
                        < Validation valid={house.valid} value={house.value} message={''} />
                    </div>
                    <div className={styles.input + ' ' + styles.apatment}>
                        <Form.Control type="text" placeholder="Кв."
                            value={apatment.value} onChange={apatment.onChange} />
                        < Validation valid={apatment.valid} value={apatment.value} message={''} />
                    </div>
                </div>
                <hr />
                <p>Информация о получателе:</p>
                <Form.Group className={styles.input}>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" placeholder="Имя"
                        value={name.value} onChange={name.onChange} />
                    < Validation valid={name.valid} value={name.value} message={''} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control type="text" placeholder="Фамилия"
                        value={family.value} onChange={family.onChange} />
                    < Validation valid={family.valid} value={family.value} message={''} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control type="text" placeholder="Телефон"
                        value={phoneNumber.value} onChange={phoneNumber.onChange} />
                    < Validation valid={phoneNumber.valid} value={phoneNumber.value} message={''} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email"
                        value={email.value} onChange={email.onChange} />
                    < Validation valid={email.valid} value={email.value} message={''} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Комментарий</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Уточнение к заказу"
                        value={comments.value} onChange={comments.onChange} />
                    < Validation valid={comments.valid} value={comments.value} message={''} />
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