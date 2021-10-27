import React from 'react'
import styles from './Validation.module.css'

const Validation = ({ validField, field, message }) => {

    return (
        <div>
            {!validField.flag
                && field.length >= 1 && <div className={styles.valid}>
                    {validField.message}
                </div>}
            {field.length === 0
                && <div className={styles.valid}>
                    {message}
                </div>}
        </div>
    )
}

export default Validation