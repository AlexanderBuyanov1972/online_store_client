import {$host, $authHost } from "./index"
import {API_ADDRESS, API_ADDRESS_GROUP} from "./pathURL";

const  addressHttp = {
      createAddress : async (address) => {
        const {data} = await $authHost.post(API_ADDRESS, address)
        return data
    },
     updateAddress : async (id, address) => {
        const {data} = await $authHost.put(API_ADDRESS + '/' + id, address)
        return data
    },
     getAddress : async (id) => {
        const {data} = await $authHost.get((API_ADDRESS + '/' + id))
        return data
    },
     deleteAddress : async (id) => {
        const {data} = await $authHost.delete(API_ADDRESS + '/' + id)
        return data
    },
    
     getAllAddresses : async (id) => {
        const {data} = await $authHost.get(API_ADDRESS_GROUP + '/' + id)
        return data
    },
     deleteAllAddresses : async (id) => {
        const {data} = await $authHost.delete(API_ADDRESS_GROUP + '/' + id)
        return data
    },
     replaceAddressDefault : async (id_old, id_new) => {
        const {data} = await $authHost.get(API_ADDRESS + '/' + id_old + '/' + id_new)
        return data
    },
   
}

export default addressHttp

