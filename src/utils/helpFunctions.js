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