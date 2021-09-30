import {$host, $authHost} from "./index"
import {API_BRAND} from "./pathURL";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post(API_BRAND, brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get(API_BRAND)
    return data
}
