export const validFieldEmail = (email) => {
    const pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    const max = 50
    if (!pattern.test(email))
        return { flag: false, message: 'Email не соответствует шаблону' }
    if (email.length > max)
        return { flag: false, message: `Email должен быть меньше ${max + 1} символов` }
    return { flag: true, message: '' }

}
export const validFieldPassword =  (password) => {
    const min = 5
    const max = 12
    const pattern = /^[a-zA-Z0-9\.]+$/
    if (password.length > max)
        return { flag: false, message: `Пароль должен быть меньше ${max + 1} символов` }
    if (password.length < min)
        return { flag: false, message: `Пароль должен быть больше ${min - 1} символов` }
    if (!pattern.test(password))
        return { flag: false, message: 'Пароль не соответствует шаблону' }
    return { flag: true, message: '' }
}

export const validFieldConfirmPassword =  (password, confirmPassword) => {
    return password !== confirmPassword ?
        { flag: false, message: 'Пароли не совпадают' } : { flag: true, message: '' }
}

export const validFieldName =  async(name) => {
    const max = 50
    const pattern = /^[А-ЯA-Z][а-яa-z]+$/
    if (name.length > max)
        return { flag: false, message: `Имя должен быть меньше ${max + 1} символов` }
    if (!pattern.test(name))
        return { flag: false, message: 'Имя не соответствует шаблону' }
    return { flag: true, message: '' }
}
export const validFieldPhoneNumber =  async(phoneNumber) => {
    const pattern = /^(\+380|0)[5-9]\d{8}$/
    if (!pattern.test(phoneNumber))
        return { flag: false, message: 'Телефонный номер не соответствует шаблону' }
    return { flag: true, message: '' }
}
export const validFieldText =  async(text) => {
    const max = 300
    const min = 5
    if (text.length < min)
        return { flag: false, message: `Текст должен быть больше ${min - 1} символов` }
    if (text.length > max)
        return { flag: false, message: `Текс должен быть меньше ${max + 1} символов` }
    return { flag: true, message: '' }
}