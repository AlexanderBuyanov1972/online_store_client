import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Validation from '../../../components/validation/Validation'
import styles from './ContactInformation.module.css'
import { getUser, updateUser } from '../../../http/userAPI'
import { validation } from '../../../utils/validations'
import { Context } from '../../..'
import { useValidInput } from '../../../hooks/useValidInput'
import { useValidConfirmPassword } from '../../../hooks/useValidConfirmPassword'
import { observer } from 'mobx-react-lite'


const ContactInformation = observer(() => {
    const { userStore } = useContext(Context)
    const contactEmpty = {
        name: '', family: '', email: '', dateBirth: '', phoneNumber: '', passwordOld: '', passwordNew: '', passwordConfirm: ''
    }

    const name = useValidInput('', validation.validFieldName)
    const family = useValidInput('', validation.validFieldName)
    const email = useValidInput('', validation.validFieldEmail)
    const dateBirth = useValidInput('', validation.validFieldDateBirth)
    const phoneNumber = useValidInput('', validation.validFieldPhoneNumber)
    const passwordOld = useValidInput('', validation.validFieldPassword)
    const passwordNew = useValidInput('', validation.validFieldPassword)
    const passwordConfirm = useValidConfirmPassword('', validation.validFieldConfirmPassword, passwordNew.value)

    const [flagButton, setFlagButtom] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        getUser(userStore.user.id).then(data => {
            if (data.name)
                name.onSetInput(data.name)
            if (data.family)
                family.onSetInput(data.family)
            if (data.email)
                email.onSetInput(data.email)
            if (data.dateBirth)
                dateBirth.onSetInput(data.dateBirth)
            if (data.phoneNumber)
                phoneNumber.onSetInput(data.phoneNumber)
                if(data)
                userStore.setUser(data)
        })
    }, [reload])

    useEffect(() => {
        setFlagButtom(name.valid.flag && family.valid.flag && email.valid.flag && dateBirth.valid.flag &&
            phoneNumber.valid.flag && passwordOld.valid.flag && passwordNew.valid.flag && passwordConfirm.valid.flag)
    }, [name, family, email, dateBirth, phoneNumber, passwordOld, passwordNew, passwordConfirm])



    const save = () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('family', family.value)
        formData.append('email', email.value)
        formData.append('dateBirth', dateBirth.value)
        formData.append('phoneNumber', phoneNumber.value)
        formData.append('passwordOld', passwordOld.value)
        formData.append('passwordNew', passwordNew.value)

        updateUser(formData, userStore.user.id)
            .then(data => {
                setReload(!reload)
                setForm(contactEmpty)
            })
            .catch(error => alert(error.message))
    }


    const setForm = (object) => {
        name.onSetInput(object.name)
        family.onSetInput(object.family)
        email.onSetInput(object.email)
        dateBirth.onSetInput(object.dateBirth)
        phoneNumber.onSetInput(object.phoneNumber)
        passwordOld.onSetInput(object.passwordOld)
        passwordNew.onSetInput(object.passwordNew)
        passwordConfirm.onSetInput(object.passwordConfirm)

    }

    return (
        <div className={styles.container}>
            <div className={styles.col + ' ' + styles.a1}>
                <h5>Редактирование личных данных</h5>
            </div>
            <div className={styles.col + ' ' + styles.a2}>
                <Form.Control placeholder="Имя" type="text"
                    value={name.value} onChange={name.onChange} />
                <Validation valid={name.valid} value={name.value} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.a3}>
                <Form.Control placeholder="Фамилия" type="text"
                    value={family.value} onChange={family.onChange} />
                <Validation valid={family.valid} value={family.value} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.a4}>
                <Form.Control placeholder="E-mail/Логин"
                    value={email.value} onChange={email.onChange} />
                <Validation valid={email.valid} value={email.value} message={''} />
                <div className={styles.col + ' ' + styles.a5}></div>
            </div>

            <div className={styles.col + ' ' + styles.b1}></div>
            <div className={styles.col + ' ' + styles.b2}>
                <Form.Control placeholder="Дата рождения" type="text"
                    value={dateBirth.value} onChange={dateBirth.onChange} />
                <Validation valid={dateBirth.valid} value={dateBirth.value} message='Шаблон для ввода даты: YYYY-MM-DD' />
            </div>
            <div className={styles.col + ' ' + styles.b3}>
                <Form.Control placeholder="Телефон" type="text"
                    value={phoneNumber.value} onChange={phoneNumber.onChange} />
                <Validation valid={phoneNumber.valid} value={phoneNumber.value} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.b4}></div>
            <div className={styles.col + ' ' + styles.b5}></div>

            <div className={styles.col + ' ' + styles.c1}>
                <h5>Изменение пароля</h5>
            </div>
            <div className={styles.col + ' ' + styles.c2}>
                <Form.Control placeholder="Старый пароль" type="text"
                    value={passwordOld.value} onChange={passwordOld.onChange} />
                <Validation valid={passwordOld.valid} value={passwordOld.value} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.c3}>
                <Form.Control placeholder="Новый пароль" type="text"
                    value={passwordNew.value} onChange={passwordNew.onChange} />
                <Validation valid={passwordNew.valid} value={passwordNew.value} message=
                    {'Пароль может содержать цифры, английские буквы верхнего и нижнего регистров, точку.'} />
            </div>
            <div className={styles.col + ' ' + styles.c4}>
                <Form.Control placeholder="Подтверждение пароля" type="text"
                    value={passwordConfirm.value} onChange={passwordConfirm.onChange} />
                <Validation valid={passwordConfirm.valid} value={passwordConfirm.value} message={''} />
            </div>
            <div className={styles.col + ' ' + styles.c5}>
                <Button variant="outline-success" onClick={save}
                    disabled={!flagButton} className={styles.button}>Сохранить</Button>
            </div>
        </div>
    )
})

export default ContactInformation