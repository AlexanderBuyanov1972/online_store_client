import { $host, $authHost } from "./index";
import { API_USER} from "./pathURL"

export const createUser = async (user) => {
    const { data } = await $host.post(API_USER, user)
    return data
}

export const updateUser = async (user, id) => {
    const { data } = await $authHost.put(API_USER + '/' + id, user)
    return data
}

export const getUser = async (id) => {
    const { data } = await $authHost.get(API_USER + '/' + id)
    return data
}

export const deleteUser = async (id) => {
    const { data } = await $authHost.delete(API_USER + '/' + id)
    return data
}

