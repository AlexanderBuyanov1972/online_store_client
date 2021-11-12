import {$host, $authHost} from "./index"
import {API_ADDRESS, API_ADDRESS_GROUP} from "./pathURL";

export const createAddress = async (address) => {
    const {data} = await $authHost.post(API_ADDRESS, address)
    return data
}
export const updateAddress = async (id, address) => {
    const {data} = await $authHost.put(API_ADDRESS + '/' + id, address)
    return data
}
export const getAddress = async (id) => {
    const {data} = await $host.get((API_ADDRESS + '/' + id))
    return data
}
export const deleteAddress = async (id) => {
    const {data} = await $authHost.delete(API_ADDRESS + '/' + id)
    return data
}

export const getAllAddresses = async (id) => {
    const {data} = await $authHost.get(API_ADDRESS_GROUP + '/' + id)
    return data
}
export const deleteAllAddresses = async (id) => {
    const {data} = await $authHost.delete(API_ADDRESS_GROUP + '/' + id)
    return data
}
