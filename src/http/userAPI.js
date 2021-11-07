import { $host, $authHost } from "./index";
import { API_USER_REGISTRATION, API_USER_LOGIN, API_USER_AUTH } from "./pathURL"
import jwt_decode from "jwt-decode"

export const registration = async(email, password, role) => {
    if (role !== 'ADMIN')
        role = 'USER'
    const { data } = await $host.post(API_USER_REGISTRATION, { email, password, role })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const login = async(email, password) => {
    const { data } = await $host.post(API_USER_LOGIN, { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const check = async() => {
    const { data } = await $authHost.get(API_USER_AUTH)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}