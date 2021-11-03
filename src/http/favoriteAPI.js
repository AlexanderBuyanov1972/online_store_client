import { $host, $authHost } from "./index"
import { API_FAVORITE} from "./pathURL";

export const fetchOneFavorite = async (id) => {
    const { data } = await $host.get(API_FAVORITE + '/' + id)
    return data
}

export const deleteFavorite = async (id) => {
    const { data } = await $authHost.get(API_FAVORITE + '/' + id)
    return data
}