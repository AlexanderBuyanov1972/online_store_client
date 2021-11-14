import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../..'
import WishDeviceItem from '../../../components/items/wishDeviceItem/WishDeviceItem'
import ObjectList from '../../../components/objectList/ObjectList'
import { fetchAllFavoriteDevice } from '../../../http/favoriteDeviceAPI'
import styles from './WishList.module.css'

const WishList = () => {
    const {userStore} = useContext(Context)
    const[devices, setDevices] = useState([])

    useEffect(()=> {
        fetchAllFavoriteDevice(userStore.user.id).then(data =>
            {  
                const objectsJSX = []
                for (let i = 0; i < data.length; i++) {
                    objectsJSX.push(<WishDeviceItem object={data[i]} />)
                }  
                setDevices(objectsJSX) 
            })
    }, [])

    // const objectsJSX = []
    // for (let i = 0; i < devices.length; i++) {
    //     objectsJSX.push(<WishDeviceItem object={devices[i]} />)
    // }

    return(
        <div className={styles.container}>
            <ObjectList objectsJSX={devices} list={'wishList'} />
        </div>
    )
}

export default WishList