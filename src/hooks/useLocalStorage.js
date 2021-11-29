import { useEffect, useState } from 'react'

export const useLocalStorage = (initialValue, key) => {
    const getValue = () => {
        const storage = localStorage.getItem(key)
        return storage ? JSON.parse(storage) : initialValue
    }
    const [value, setValue] = useState(getValue)
    useEffect(() => {
        localStorage.set(key, JSON.stringify(value))
    }, [value])
    return [value, setValue]
}