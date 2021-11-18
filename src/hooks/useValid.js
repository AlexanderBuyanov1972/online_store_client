import { useState } from "react"

export const useValid = (value, callback) => {
    

    const [valid, setValid] = useState({ flag: false, message: '' })

    callback(value).then(data => setValid(data))

    return { valid }

}