import { $authHost } from "./index"
import { API_ORDERING, API_ORDERING_GROUP } from "./pathURL";

export const createOrder = async(order) => {
    const { data } = await $authHost.post(API_ORDERING, order)
    return data
}
export const updateOrder = async(id, order) => {
    const { data } = await $authHost.put(API_ORDERING + '/' + id, order)
    return data
}
export const getOrder = async(id) => {
    const { data } = await $authHost.get((API_ORDERING + '/' + id))
    return data
}
export const deleteOrder = async(id) => {
    const { data } = await $authHost.delete(API_ORDERING + '/' + id)
    return data
}

export const getAllOrders = async(id) => {
    const { data } = await $authHost.get(API_ORDERING_GROUP + '/' + id)
    return data
}
export const deleteAllOrders = async(id) => {
    const { data } = await $authHost.delete(API_ORDERING_GROUP + '/' + id)
    return data
}