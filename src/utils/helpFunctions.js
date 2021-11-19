// красиво оформленная цена
export const beautifulViewPrice = (price) => {
    let arr = (price + '').trim().split('')
    let newPrice = []
    let count = 0
    for (let i = arr.length - 1; i >= 0; i--) {
        if (count === 3) {
            count = 0
            newPrice.push(' ')
        }
        newPrice.push(arr[i])
        count += 1
    }
    return newPrice.reverse().join('') + ' UAH'
}

export const getClassForList = (value, styles) => {
    if (value === 'shopList')
        return styles.shopList
    if (value === 'wishList')
        return styles.wishList
    if (value === 'basketList')
        return styles.basketList
    if (value === 'orderingBasketList')
        return styles.orderingBasketList
    if (value === 'orderList')
        return styles.orderList
    alert('Проблема с определением класса листа')
}

export const getBooleonFromArrayFlags = (array) => {
    let result = true
    for (let i = 0; i < array.length; i++) {
        result = result * array[i].valid.flag
    }
    return result
}

export const setFieldsOfObjectIntoArray = (item, array, valid) => {
    for (let key in item) {
        switch (key) {
            case 'nameRecipient':
                array[0].value = item[key];
                array[0].valid = valid;
                break;
            case 'familyRecipient':
                array[1].value = item[key];
                array[1].valid = valid;
                break;
            case 'emailRecipient':
                array[2].value = item[key];
                array[2].valid = valid;
                break;
            case 'phoneNumberRecipient':
                array[3].value = item[key];
                array[3].valid = valid;
                break;
            case 'city':
                array[4].value = item[key];
                array[4].valid = valid;
                break;
            case 'street':
                array[5].value = item[key];
                array[5].valid = valid;
                break;
            case 'house':
                array[6].value = item[key];
                array[6].valid = valid;
                break;
            case 'apatment':
                array[7].value = item[key];
                array[7].valid = valid;
                break;
            case 'index':
                array[8].value = item[key];
                array[8].valid = valid;
                break;
            default:
        }
    }
    return array
}

