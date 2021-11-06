import React from 'react';
import styles from "./Footer.module.css"
import FooterHeader from './footerHeader/FooterHeader';
import FooterContent from './footerContent/FooterContent';
import FooterFooter from './footerFooter/FooterFooter';


const Footer = () => {

    return (
        <div className={styles.container}>
            <div className={styles.header}><FooterHeader/></div>
            {/* <div className={styles.content}><FooterContent/></div> */}
            <div className={styles.footer}>< FooterFooter/></div>
        </div>
    )
}

export default Footer