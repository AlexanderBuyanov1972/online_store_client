import { $host, $authHost } from "./index"
import { API_BASKET } from "./pathURL";

export const fetchOneBasket = async(id) => {
    const { data } = await $host.get(API_BASKET + '/' + id)
    return data
}

export const deleteBasket = async(id) => {
    const { data } = await $authHost.get(API_BASKET + '/' + id)
    return data
}