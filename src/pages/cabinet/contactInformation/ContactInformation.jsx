import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Validation from '../../../components/validation/Validation'
import styles from './ContactInformation.module.css'
import { getUser, updateUser } from '../../../http/userAPI'
import {
    validFieldName, validFieldEmail,
    validFieldDateBirth, validFieldPhoneNumber,
    validFieldPassword, validFieldConfirmPassword

} from '../../../utils/validations'
import { Context } from '../../..'

const ContactInformation = () => {
    const { userStore } = useContext(Context)

    const [name, setName] = useState('')
    const [family, setFamily] = useState('')
    const [email, setEmail] = useState('')
    const [dateBirth, setDateBirth] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passwordOld, setPasswordOld] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [validName, setValidName] = useState({ flag: false, message: '' })
    const [validFamily, setValidFamily] = useState({ flag: false, message: '' })
    const [validEmail, setValidEmail] = useState({ flag: false, message: '' })
    const [validDateBirth, setValidDateBirth] = useState({ flag: false, message: '' })
    const [validPhoneNumber, setValidPhoneNumber] = useState({ flag: false, message: '' })
    const [validPasswordOld, setValidPasswordOld] = useState({ flag: false, message: '' })
    const [validPasswordNew, setValidPasswordNew] = useState({ flag: false, message: '' })
    const [validPasswordConfirm, setValidPasswordConfirm] = useState({ flag: false, message: '' })

    const [flagButton, setFlagButtom] = useState(false)

    useEffect(() => {
        const flagValid = { flag: true, message: 'Ok' }
        getUser(userStore.user.id).then(data => {
            setName(data.name)
            setFamily(data.family)
            setEmail(data.email)
            setDateBirth(data.dateBirth)
            setPhoneNumber(data.phoneNumber)
            setValidName(flagValid)
            setValidFamily(flagValid)
            setValidEmail(flagValid)
            setValidDateBirth(flagValid)
            setValidPhoneNumber(flagValid)
        })
    }, [])

    useEffect(() => {
        setFlagButtom(validName.flag && validFamily.flag && validEmail.flag && validDateBirth.flag &&
            validPhoneNumber.flag && validPasswordOld.flag && validPasswordNew.flag && validPasswordConfirm.flag)
    }, [
        validName,
        validFamily,
        validEmail,
        validDateBirth,
        validPhoneNumber,
        validPasswordOld,
        validPasswordNew,
        validPasswordConfirm
    ])

    const onChangeName = (value) => {
        setName(value)
        validFieldName(value).then(data =>
            setValidName(data))
    }
    const onChangeFamily = (value) => {
        setFamily(value)
        validFieldName(value).then(data =>
            setValidFamily(data))
    }
    const onChangeEmail = (value) => {
        setEmail(value)
        validFieldEmail(value).then(data =>
            setValidEmail(data))
    }
    const onChangeDateBirth = (value) => {
        setDateBirth(value)
        validFieldDateBirth(value).then(data =>
            setValidDateBirth(data))
    }
    const onChangePhoneNumber = (value) => {
        setPhoneNumber(value)
        validFieldPhoneNumber(value).then(data =>
            setValidPhoneNumber(data))
    }
    const onChangePasswordOld = (value) => {
        setPasswordOld(value)
        validFieldPassword(value).then(data =>
            setValidPasswordOld(data))
    }
    const onChangePasswordNew = (value) => {
        setPasswordNew(value)
        validFieldPassword(value).then(data =>
            setValidPasswordNew(data))
    }
    const onChangePasswordConfirm = (value) => {
        setPasswordConfirm(value)
        validFieldConfirmPassword(passwordNew, value).then(data =>
            setValidPasswordConfirm(data)
        )
    }

    const save = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('family', family)
        formData.append('email', email)
        formData.append('dateBirth', dateBirth)
        formData.append('phoneNumber', phoneNumber)
        formData.append('passwordOld', passwordOld)
        formData.append('passwordNew', passwordNew)

        updateUser(formData, userStore.user.id).then(data => {
            userStore.setUser(data)
            cleanState()
            cleanValidState()
            // deviceStore.setFlagReload(true)
            // reload()
        })
    }
    // const reload = () => {
    //     deviceStore.setFlagReload(false)
    // }

    const cleanState = () => {
        setName('')
        setFamily('')
        setEmail('')
        setDateBirth('')
        setPhoneNumber('')
        setPasswordOld('')
        setPasswordNew('')
        setPasswordConfirm('')
    }
    const cleanValidState = () => {
        setValidName({ flag: false, message: '' })
        setValidFamily({ flag: false, message: '' })
        setValidEmail({ flag: false, message: '' })
        setValidDateBirth({ flag: false, message: '' })
        setValidPhoneNumber({ flag: false, message: '' })
        setValidPasswordOld({ flag: false, message: '' })
        setValidPasswordNew({ flag: false, message: '' })
        setValidPasswordConfirm({ flag: false, message: '' })
    }

    return (
        <div className={styles.container}>
            <div className={styles.col + ' ' + styles.a1}>
                <h5>Редактирование личных данных</h5>
            </div>
            <div className={styles.col + ' ' + styles.a2}>
                <Form.Control
                    placeholder="Имя"
                    value={name}
                    onChange={event => onChangeName(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validName} value={name} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.a3}>
                <Form.Control
                    placeholder="Фамилия"
                    value={family}
                    onChange={event => onChangeFamily(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validFamily} value={family} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.a4}>
                <Form.Control
                    placeholder="E-mail/Логин"
                    value={email}
                    onChange={event => onChangeEmail(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validEmail} value={email} message={''} />
                <div className={styles.col + ' ' + styles.a5}>
                </div>
            </div>

            <div className={styles.col + ' ' + styles.b1}></div>
            <div className={styles.col + ' ' + styles.b2}>
                <Form.Control
                    placeholder="Дата рождения"
                    value={dateBirth}
                    onChange={event => onChangeDateBirth(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validDateBirth} value={dateBirth} message='Шаблон для ввода даты: YYYY-MM-DD' />
            </div>
            <div className={styles.col + ' ' + styles.b3}>
                <Form.Control
                    placeholder="Телефон"
                    value={phoneNumber}
                    onChange={event => onChangePhoneNumber(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validPhoneNumber} value={phoneNumber} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.b4}></div>
            <div className={styles.col + ' ' + styles.b5}></div>

            <div className={styles.col + ' ' + styles.c1}>
                <h5>Изменение пароля</h5>
            </div>
            <div className={styles.col + ' ' + styles.c2}>
                <Form.Control
                    placeholder="Старый пароль"
                    value={passwordOld}
                    onChange={event => onChangePasswordOld(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validPasswordOld} value={passwordOld} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.c3}>
                <Form.Control
                    placeholder="Новый пароль"
                    value={passwordNew}
                    onChange={event => onChangePasswordNew(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validPasswordNew} value={passwordNew} message=
                    {'Пароль может содержать цифры, английские буквы верхнего и нижнего регистров, точку.'} />
            </div>
            <div className={styles.col + ' ' + styles.c4}>
                <Form.Control
                    placeholder="Подтверждение пароля"
                    value={passwordConfirm}
                    onChange={event => onChangePasswordConfirm(event.target.value.trim())}
                    type="text"
                />
                <Validation valid={validPasswordConfirm} value={passwordConfirm} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.c5}>
                <Button variant="outline-success" onClick={save}
                    disabled={!flagButton} className={styles.button}>Сохранить</Button>
            </div>
        </div>
    )
}

export default ContactInformation