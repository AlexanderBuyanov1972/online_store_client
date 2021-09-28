import {$host, $authHost} from "./index";
import {API_USER_REGISTRATION, API_USER_LOGIN, API_USER_CHECK} from "./pathURL"

export const registration = async (email, password) => {
    const response = await $host.post(API_USER_REGISTRATION, {email, password, role: 'ADMIN'})
    return response
}
export const login = async (email, password) => {
    const response = await $host.post(API_USER_LOGIN, {email, password})
    return response
}
export const check = async () => {
    const response = await $host.post(API_USER_CHECK)
    return response
}