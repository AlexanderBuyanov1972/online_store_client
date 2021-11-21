import { useEffect, useState } from "react"

export const useValid = (value, callback) => {

    const [valid, setValid] = useState({ flag: false, message: '' })

    useEffect(() => {
        callback(value).then(data => setValid(data))
    }, [])

    return { valid }

}