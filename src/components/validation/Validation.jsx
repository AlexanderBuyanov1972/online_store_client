import React from 'react'
import styles from './Validation.module.css'

const Validation = ({ validField, field, message }) => {
    return (
        <div>
            {!validField.flag
                && field.length >= 1
                && <div className={styles.invalid}>
                    {validField.message}
                </div>}
            {!validField.flag
                && field.length === 0
                && <div className={styles.invalid}>
                    {message}
                </div>}
            {validField.flag && <div className={styles.valid}>
                {validField.message}
            </div>}
        </div>
    )
}

export default Validation