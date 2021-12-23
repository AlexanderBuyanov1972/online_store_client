import { useEffect, useState } from "react"

export const useValidInput = (initialValue, callbackValidation) => {

    const validFalse = { flag: false, message: '' }
    const [value, setValue] = useState(initialValue)
    const [valid, setValid] = useState(validFalse)

    const onChange = e => setValue(e.target.value)
    const onSetInput = (str) => setValue(str)

    useEffect(() => {
        if (value) {
            callbackValidation(value).then(data => setValid(data))
        } else {
            setValid(validFalse)
        }

    },
        [value])

    return { value, valid, onChange, onSetInput }
}