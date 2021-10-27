const validFieldMinMaxPattern = (field, min, max, pattern) => {
    if (field.length > max)
        return { flag: false, message: `Значение должно быть меньше ${max + 1} символов` }
    if (field.length < min)
        return { flag: false, message: `Значение должно быть больше ${min + 1} символов` }
    if (!pattern.test(field))
        return { flag: false, message: 'Значение не соответствует шаблону' }
    return { flag: true, message: '' }
}

export const validFieldEmail = async(email) => {
    const max = 50
    const min = 7
    const pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    validFieldMinMaxPattern(email, min, max, pattern)
}


export const validFieldConfirmPassword = async(password, confirmPassword) => {
    return password !== confirmPassword ? { flag: false, message: 'Пароли не совпадают' } : { flag: true, message: '' }
}

export const validFieldName = async(name) => {
    const min = 2
    const max = 50
    const pattern = /^[А-ЯA-Z][а-яa-z]+$/
    validFieldMinMaxPattern(name, min, max, pattern)
}
export const validFieldPhoneNumber = async(phoneNumber) => {
    const pattern = /^(\+380|0)[5-9]\d{8}$/
    if (!pattern.test(phoneNumber))
        return { flag: false, message: 'Телефонный номер не соответствует шаблону' }
    return { flag: true, message: '' }
}
export const validFieldText = async(text) => {
    const max = 300
    const min = 5
    const pattern = /./
    validFieldMinMaxPattern(text, min, max, pattern)
}

export const validTypeBrand = async(value) => {
    const max = 50
    const min = 3
    const pattern = /^[A-ZА-Я][а-яА-Яa-zA-Z ]+$/
    validFieldMinMaxPattern(value, min, max, pattern)
}

export const validFieldPassword = async(password) => {
    const min = 5,
        max = 12,
        pattern = /^[a-zA-Z0-9\.]+$/
    validFieldMinMaxPattern(password, min, max, pattern)
}

export const validFieldNameDevice = async(name) => {
    const max = 100
    const min = 3
    const pattern = /^[А-ЯA-Z][а-яa-zА-ЯA-Z0-9-/()]+$/
    validFieldMinMaxPattern(name, min, max, pattern)
}

export const validFieldPrice = async(price) => {
    const max = 6
    const min = 1
    const pattern = /^[1-9][0-9]{0-5}$/
    validFieldMinMaxPattern(price, min, max, pattern)
}

export const validFieldRating = async(price) => {
    const max = 7
    const min = 1
    const pattern = /^(0|[1-9][0-9]+)$/
    validFieldMinMaxPattern(price, min, max, pattern)
}