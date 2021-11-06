import React from 'react'
import styles from './FooterHeader.module.css'
import { Form, Button } from 'react-bootstrap'
import Badge from 'react-simple-badges'

const FooterHeader = () => {

    return (
        <Form>
            <div className={styles.container}>

                <div className={styles.text}>
                    Подписывайтесь на акции и предложения:
                </div>

                <div className={styles.email}>
                    <Form.Control type="email" placeholder="Enter email" />
                </div>

                <div className={styles.buttom}>
                    <Button variant="warning" onClick={() => alert('Вы подписаны!!!')}>
                        ПОДПИСАТЬСЯ
                    </Button>
                </div>

                <div className={styles.badges}>
                    <Badge className={styles.badge} name="Facebook" onClick={() => alert('Facebook')} />
                    <Badge className={styles.badge} name="YouTube" onClick={() => alert('YouTube')} />
                    <Badge className={styles.badge} name="Instagram" onClick={() => alert('YouTube')} />
                    <Badge className={styles.badge} name="Viber" onClick={() => alert('Viber')} />
                </div>

            </div >
        </Form>
    )
}

export default FooterHeader