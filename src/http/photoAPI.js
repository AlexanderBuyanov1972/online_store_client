import { $host, $authHost } from "./index"
import { API_PHOTO, API_PHOTO_GROUP } from "./pathURL";

export const createPhoto = async (photo) => {
    const { data } = await $authHost.post(API_PHOTO, photo)
    return data
}

export const updatePhoto = async (id, photo) => {
    const { data } = await $authHost.put(API_PHOTO + '/' + id, photo)
    return data
}

export const fetchOnePhoto = async (id) => {
    const { data } = await $authHost.get(API_PHOTO + '/' + id)
    return data
}

export const fetchGroupPhoto = async (group) => {
    const { data } = await $host.get(API_PHOTO_GROUP + '/' + group)
    return data
}

export const fetchAllPhotos = async () => {
    const { data } = await $host.get(API_PHOTO)
    return data
}

export const deletePhoto = async (id) => {
    const { data } = await $authHost.delete(API_PHOTO + '/' + id)
    return data
}

export const deleteGroupPhoto = async (group) => {
    const { data } = await $authHost.delete(API_PHOTO_GROUP + '/' + group)
    return data
}

export const deleteAllPhoto = async () => {
    const { data } = await $authHost.delete(API_PHOTO)
    return data
}