import { useEffect, useState } from "react";

export const  useRequest = ( request, id) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)

    const reloading = () => {
        setReload(!reload)
    }


    useEffect(() => {
        setLoading(true)
        request(id)
            .then(data => setData(data.rows))
            .catch(error => setError(error))
            .finally(() => setLoading(false))

    }, [reload])

    return [data, loading, error, reload, reloading]

}