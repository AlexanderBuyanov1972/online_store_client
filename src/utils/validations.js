const validFieldMinMaxPattern = (field, min, max, pattern) => {
    if (field.length > max)
        return { flag: false, message: `Значение должно быть меньше ${max + 1} символов` }
    if (field.length < min)
        return { flag: false, message: `Значение должно быть больше ${min - 1} символов` }
    if (!pattern.test(field))
        return { flag: false, message: 'Значение не соответствует шаблону' }
    return { flag: true, message: 'Ок' }
}

export const validation = {

    validFieldEmail: async (email) => {
        const max = 50
        const min = 7
        const pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        return validFieldMinMaxPattern(email, min, max, pattern)
    },
    validFieldText: async (text) => {
        const max = 300
        const min = 5
        const pattern = /./
        return validFieldMinMaxPattern(text, min, max, pattern)
    },

    validTypeBrand: async (value) => {
        const max = 50
        const min = 3
        const pattern = /^[A-ZА-Я][а-яА-Яa-zA-Z ]+$/
        return validFieldMinMaxPattern(value, min, max, pattern)
    },

    validFieldPassword: async (password) => {
        const min = 5,
            max = 12,
            pattern = /^[a-zA-Z0-9.]+$/
        return validFieldMinMaxPattern(password, min, max, pattern)
    },

    validFieldNameDevice: async (name) => {
        const max = 100
        const min = 3
        const pattern = /^[А-ЯA-Z][а-яa-zА-ЯA-Z0-9-/() ]+$/
        return validFieldMinMaxPattern(name, min, max, pattern)
    },

    validFieldPrice: async (price) => {
        const max = 6
        const min = 1
        const pattern = /^[1-9][0-9]*$/
        return validFieldMinMaxPattern(price, min, max, pattern)
    },
    validFieldHouse: async (house) => {
        const max = 5
        const min = 1
        const pattern = /^[1-9][0-9a-zA-Zа-яА-Я-]*$/
        return validFieldMinMaxPattern(house, min, max, pattern)
    },
    validFieldApatment: async (apatment) => {
        const max = 3
        const min = 1
        const pattern = /^[1-9][0-9]*$/
        return validFieldMinMaxPattern(apatment, min, max, pattern)
    },
    validFieldIndex: async (index) => {
        const max = 8
        const min = 4
        const pattern = /^[0-9]+$/
        return validFieldMinMaxPattern(index, min, max, pattern)
    },

    validFieldRating: async (rating) => {
        const max = 7
        const min = 1
        const pattern = /^(0|[1-9][0-9]*)$/
        return validFieldMinMaxPattern(rating, min, max, pattern)
    },

    validFieldName: async (name) => {
        const min = 2
        const max = 50
        const pattern = /^[А-ЯA-Z][а-яa-z]+$/
        return validFieldMinMaxPattern(name, min, max, pattern)
    },

    validFieldProperties: async (name) => {
        const min = 3
        const max = 50
        const pattern = /^[а-яА-Яa-zA-Z0-9-(),.+" ]+$/
        return validFieldMinMaxPattern(name, min, max, pattern)
    },
    validFieldCityStreet: async (name) => {
        const min = 3
        const max = 50
        const pattern = /^[а-яА-Яa-zA-Z0-9-()., ]+$/
        return validFieldMinMaxPattern(name, min, max, pattern)
    },

    // ------------------------------------------------------- нешаблонные функции-------------------------------------------
    validFieldConfirmPassword: async (confirmPassword, password) => {
        if (confirmPassword && password) {
            return password !== confirmPassword ? { flag: false, message: 'Пароли не совпадают' } : { flag: true, message: 'Ок' }
        } else {
            return { flag: false, message: 'Есть проблемы' }
        }

    },

    validFieldFile: async (file) => {
        if (!file) {
            alert('file of validFieldFile()--->', file)
            return { flag: false, message: 'Файл отсутствует или повреждён' }
        }
        return { flag: true, message: 'Файл выбран' }
    },

    validFieldPhoneNumber: async (phoneNumber) => {
        const pattern = /^(\+380|0)[5-9]\d{8}$/
        if (!pattern.test(phoneNumber))
            return { flag: false, message: 'Телефонный номер не соответствует шаблону' }
        return { flag: true, message: 'Ок' }
    },

    validIdTypeBrand: async (value) => {
        if (value.id === 1) {
            return { flag: false, message: 'Наименование не выбрано' }
        }
        return { flag: true, message: 'Ok' }
    },


    validFieldDateBirth: async (dateBirth) => {
        const pattern = /^(19\d\d|20[0-1]\d|202[0-1])-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/
        if (!pattern.test(dateBirth))
            return { flag: false, message: 'Дата рождения не соответствует шаблону' }
        return { flag: true, message: 'Ок' }

    },

}
