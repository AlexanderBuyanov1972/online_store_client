import {$host, $authHost} from "./index"
import {API_BRAND} from "./pathURL";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post(API_BRAND, brand)
    return data
}
export const updateBrand = async (id, brand) => {
    const {data} = await $authHost.put(API_BRAND + '/' + id, brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get(API_BRAND)
    return data
}
export const fetchOneBrand = async (id) => {
    const {data} = await $authHost.get(API_BRAND + '/' + id)
    return data
}