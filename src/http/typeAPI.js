import { $host, $authHost } from "./index"
import { API_TYPE } from "./pathURL";

export const createType = async (type) => {
    const { data } = await $authHost.post(API_TYPE, type)
    return data
}

export const updateType = async (id, type) => {
    const { data } = await $authHost.put(API_TYPE + '/' + id, type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get(API_TYPE)
    return data
}

export const fetchOneType = async (id) => {
    const { data } = await $authHost.get(API_TYPE + '/' + id)
    return data
}