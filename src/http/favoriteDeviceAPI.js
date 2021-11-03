import { $host } from "./index"
import { API_FAVORITE_DEVICE, API_FAVORITE_DEVICE_GROUP } from "./pathURL";

export const createFavoriteDevice = async(userId, deviceId) => {
    const {data} = await $host.post(API_FAVORITE_DEVICE + '/' + userId + '/' +deviceId)
    return data
}

export const fetchOneFavoriteDevice = async(userId, deviceId) => {
    const  {data} = await $host.get(API_FAVORITE_DEVICE + '/' + userId + '/' +deviceId)
    return data
}

export const fetchAllFavoriteDevice = async(userId) => {
    const  {data}  = await $host.get(API_FAVORITE_DEVICE + '/' + userId)
    return data
}


export const removeOneFavoriteDevice = async(userId, deviceId) => {
    const  {data}  = await $host.delete(API_FAVORITE_DEVICE + '/' + userId + '/' +deviceId)
    return data
}

export const removeGroupFavoriteDevice = async(userId, deviceId) => {
    const  {data}  = await $host.delete(API_FAVORITE_DEVICE_GROUP + '/' + userId + '/' +deviceId)
    return data
}

export const removeAllFavoriteDevice = async(userId) => {
    const  {data}  = await $host.delete(API_FAVORITE_DEVICE + '/' + userId)
    return data
}