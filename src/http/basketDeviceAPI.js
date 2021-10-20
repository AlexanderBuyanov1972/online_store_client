import { $host } from "./index"
import { API_BASKET_DEVICE, API_BASKET_DEVICE_GROUP } from "./pathURL";

export const createBasketDevice = async(userId, deviceId) => {
    const {data} = await $host.post(API_BASKET_DEVICE + '/' + userId + '/' +deviceId)
    return data
}

export const fetchOneBasketDevice = async(userId, deviceId) => {
    const  {data} = await $host.get(API_BASKET_DEVICE + '/' + userId + '/' +deviceId)
    return data
}

export const fetchAllBasketDevice = async(userId) => {
    const  {data}  = await $host.get(API_BASKET_DEVICE + '/' + userId)
    return data
}


export const removeOneBasketDevice = async(userId, deviceId) => {
    const  {data}  = await $host.delete(API_BASKET_DEVICE + '/' + userId + '/' +deviceId)
    return data
}

export const removeGroupBasketDevice = async(userId, deviceId) => {
    const  {data}  = await $host.delete(API_BASKET_DEVICE_GROUP + '/' + userId + '/' +deviceId)
    return data
}

export const removeAllBasketDevice = async(userId) => {
    const  {data}  = await $host.delete(API_BASKET_DEVICE + '/' + userId)
    return data
}