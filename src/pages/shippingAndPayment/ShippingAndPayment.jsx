import React from 'react'
import styles from './ShippingAndPayment.module.css'
import newpost from '../../assets/NewPost.jpg'
import autoluxe from '../../assets/AutoLux.jpg'
import delivery from '../../assets/Delivery.jpg'
import { Nav } from 'react-bootstrap'

const ShippingAndPayment = () => {

    return (
        <div className={styles.container}>
            <div className={styles.title}>Доставка</div>
            <div className={styles.text}>
                <p>Магазин householdappliances.ua работает для всех, кто хочет организовать свой быт максимально комфортно.
                    Среди предлагаемых товаров можно найти массу товаров, которые займут свое достойное место в доме и
                    помогут упростить работу на кухне. При этом система покупок налажена таким образом, что самым сложным
                    для покупателя является лишь сам выбор, который слишком разнообразен для того, чтобы принять решение сразу.</p>

                <p>В остальном же схема оплаты и доставки достаточно проста, так что оформление заказа
                    занимает всего несколько минут.</p>

                <p>Доставка возможна несколькими методами:</p>

                <ul>
                    <li>транспортной компанией Нова пошта (на отделение или курьером по адресу);</li>
                    <li>транспортной компанией Деливери;</li>
                    <li>самовывоз в г. Харькове (встречу нужно предварительно согласовать с нашими менеджерами)</li>
                </ul>
                <p>Стоимость доставки зависит от выбранной транспортной компании (Новая почта или Деливери),
                    веса/размеров упаковки заказа и степени удаленности региона от города Харькова.</p>

                <p> Если мы живем с вами в одном городе, товар можно забрать со склада,
                    предварительно согласовав встречу с менеджером компании.</p>

                <p> АКЦИЯ: При розничной покупке товаров на сумму от 5000 гривен доставка Новой почтой БЕСПЛАТНАЯ</p></div>
            <div className={styles.badges}>
                <div className={styles.badge}>
                    <h3>Новая почта</h3>
                    <img src={newpost} alt='Not found' />
                </div>
                <div className={styles.badge}>
                    <h3>Автолюкс</h3>
                    <img src={autoluxe} alt='Not found' />
                </div>
                <div className={styles.badge}>
                    <h3>Деливери</h3>
                    <img src={delivery} alt='Not found' />
                </div>
            </div>
            <div className={styles.links}>
                <Nav >
                    <Nav.Item as="li" className={styles.link}>
                        <Nav.Link href="#">Доставка в Черкассы</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={styles.link}>
                        <Nav.Link href="#">Доставка в Одессу</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={styles.link}>
                        <Nav.Link href="#">Доставка в Днепропетровск</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={styles.link}>
                        <Nav.Link href="#">Доставка в Киев</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    )
}

export default ShippingAndPayment