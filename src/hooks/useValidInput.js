import { useEffect, useState } from "react"

export const useValidInput = (initialValue, initialValid, callback) => {

    const [value, setValue] = useState(initialValue)
    const [valid, setValid] = useState(initialValid)

    const onChange = e => setValue(e.target.value)
    const onClick = e => setValue(e.target.value)

    useEffect(() => {
        callback(value).then(data => setValid(data))
    }, [value])

    return { value, onChange, onClick, valid }
}