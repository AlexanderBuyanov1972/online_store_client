import { useEffect, useState } from "react"

export const useValidConfirmPassword = (initialValue, callbackValidation, str) => {

    const validFalse = { flag: false, message: '' }
    const [value, setValue] = useState(initialValue)
    const [valid, setValid] = useState(validFalse)

    const onChange = e => setValue(e.target.value)
    const onSetInput = (string) => setValue(string)

    useEffect(() => {
        if (str && value) {
            callbackValidation(value, str).then(data => setValid(data))
        } else {
            setValid(validFalse)
        }

    }, [value, str])

    return { value, valid, onChange, onSetInput }
}