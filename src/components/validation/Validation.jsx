import React from 'react'
import styles from './Validation.module.css'

const Validation = ({ valid, value, message }) => {
    return (
        <div>
            {!valid.flag
                && value.length >= 1
                && <div className={styles.invalid}>
                    {valid.message}
                </div>}
            {!valid.flag
                && value.length === 0
                && <div className={styles.nutral}>
                    {message}
                </div>}
            {valid.flag && <div className={styles.valid}>
                {valid.message}
            </div>}
        </div>
    )
}

export default Validation