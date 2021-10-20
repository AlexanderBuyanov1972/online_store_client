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