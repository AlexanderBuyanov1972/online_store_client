import { $host, $authHost } from "./index";
import { API_AUTH_REGISTRATION, API_AUTH_LOGIN, API_AUTH } from "./pathURL"
import jwt_decode from "jwt-decode"

export const registration = async(email, password, role) => {
    if (role !== 'ADMIN')
        role = 'USER'
    const { data } = await $host.post(API_AUTH_REGISTRATION, { email, password, role })
    if (data.message)
        return data
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async(email, password) => {
    const { data } = await $host.post(API_AUTH_LOGIN, { email, password })
    console.log(data)
    if (data.message)
        return data
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async() => {
    const { data } = await $authHost.get(API_AUTH)
    if (data.message)
        return data
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}