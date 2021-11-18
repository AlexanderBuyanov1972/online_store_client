import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Validation from '../validation/Validation'
import styles from './InputValid.module.css'

const InputValid = ({ placeholder, value, valid, message, onChange }) => {

    return (
        <div className={styles.container}>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <Validation
                valid={valid}
                value={value}
                message={message}
            />
        </div>
    )
}

export default InputValid