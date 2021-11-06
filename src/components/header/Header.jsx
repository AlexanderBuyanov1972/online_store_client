import React from 'react'
import styles from './Header.module.css'
import HeaderTop from './headerTop/HeaderTop'
import HeaderBottom from './headerBottom/HeaderBottom'
import HeaderContent from './headerContent/HeaderContent'

const Header = () => {
    return (
        <div className={styles.container}>
            <HeaderTop />
            {/* <HeaderContent /> */}
            <HeaderBottom />
        </div>
    )
}
export default Header