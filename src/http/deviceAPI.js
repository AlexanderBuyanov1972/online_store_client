import { $host, $authHost } from "./index"
import { API_DEVICE } from "./pathURL";

export const createDevice = async (device) => {
    const { data } = await $authHost.post(API_DEVICE, device)
    return data
}

export const updateDevice = async (id, device) => {
    const { data } = await $authHost.put(API_DEVICE + '/' + id, device)
    return data
}
export const fetchDevices = async (typeId, brandId, pageCurrent, limit = 5) => {
    const { data } = await $host.get(API_DEVICE, {
        params: {
            typeId, brandId, pageCurrent, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get(API_DEVICE + '/' + id)
    return data
}