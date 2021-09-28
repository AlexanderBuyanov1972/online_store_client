import {$host, $authHost} from "./index";
import {API_USER_REGISTRATION, API_USER_LOGIN, API_USER_CHECK} from "./pathURL"
import jwt_decode from "jwt-decode"

export const registration = async (email, password) => {
    const {data} = await $host.post(API_USER_REGISTRATION, {email, password, role: 'ADMIN'})
    return jwt_decode(data.token)
}
export const login = async (email, password) => {
    const {data} = await $host.post(API_USER_LOGIN, {email, password})
    return jwt_decode(data.token)
}
export const check = async () => {
    const response = await $host.post(API_USER_CHECK)
    return response
}