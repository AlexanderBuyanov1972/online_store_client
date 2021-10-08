import {$host, $authHost} from "./index"
import {API_BRAND, API_DEVICE} from "./pathURL";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post(API_BRAND, brand)
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