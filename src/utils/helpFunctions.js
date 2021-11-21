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
    let result = 1
    console.log('array--->', array)
    for (let i = 0; i < array.length; i++) {
        result = result * array[i]
    }
    console.log('flagButton--->', result)
    return result
}


// export const updateStateObjectInput = (state, hook, values, valid, callBacks) => {
//     for (let key in Object.keys(state)) {
//         state[key] = hook(values[key], valid, callBacks[key])
//     }
//     console.log('state--->', state)
//     return state
// }

// export const setValuesFromObjectIntoArray = (item, arrayObjects, valid) => {
//     for (let key in item) {
//         switch (key) {
//             case 'nameRecipient':
//                 arrayObjects[0][key].value = item[key];
//                 arrayObjects[0][key].valid = valid;
//                 break;
//             case 'familyRecipient':
//                 arrayObjects[1][key].value = item[key];
//                 arrayObjects[1][key].valid = valid;
//                 break;
//             case 'emailRecipient':
//                 arrayObjects[2][key].value = item[key];
//                 arrayObjects[2][key].valid = valid;
//                 break;
//             case 'phoneNumberRecipient':
//                 arrayObjects[3][key].value = item[key];
//                 arrayObjects[3][key].valid = valid;
//                 break;
//             case 'city':
//                 arrayObjects[4][key].value = item[key];
//                 arrayObjects[4][key].valid = valid;
//                 break;
//             case 'street':
//                 arrayObjects[5][key].value = item[key];
//                 arrayObjects[5][key].valid = valid;
//                 break;
//             case 'house':
//                 arrayObjects[6][key].value = item[key];
//                 arrayObjects[6][key].valid = valid;
//                 break;
//             case 'apatment':
//                 arrayObjects[7][key].value = item[key];
//                 arrayObjects[7][key].valid = valid;
//                 break;
//             case 'index':
//                 arrayObjects[8][key].value = item[key];
//                 arrayObjects[8][key].valid = valid;
//                 break;
//             default:
//         }
//     }
//     console.log('***************************')
//     console.log('arrayObjects--->', arrayObjects)
//     return arrayObjects
// }