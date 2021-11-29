import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../..'
import WishDeviceItem from '../../../components/items/wishDeviceItem/WishDeviceItem'
import ObjectList from '../../../components/objectList/ObjectList'
import { fetchAllFavoriteDevice } from '../../../http/favoriteDeviceAPI'
import styles from './WishList.module.css'

const WishList = () => {
    const { userStore } = useContext(Context)
    const [objectsJSX, setObjectsJSX] = useState([])

    useEffect(() => {
        fetchAllFavoriteDevice(userStore.user.id).then(data => {
            let array = []
            data.forEach(element =>
                array.push(<WishDeviceItem object={element} />)
            );
            setObjectsJSX(array)
        })
    }, [])

    return (
        <div className={styles.container}>
            <ObjectList objectsJSX={objectsJSX} list={'wishList'} />
        </div>
    )
}

export default WishList