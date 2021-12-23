import { observer } from 'mobx-react-lite'
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import AddressBook from './addressBook/AddressBook'
import styles from './Cabinet.module.css'
import ContactInformation from './contactInformation/ContactInformation'
import HistoryOrders from './historyOrders/HistoryOrders'
import WishList from './wishList/WishList'

const Cabinet = observer(() => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Личный кабинет</h1>
            <div className={styles.body}>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="profile" title="Контактная информация">
                        <div>
                            <ContactInformation/>
                        </div>
                    </Tab>
                    <Tab eventKey="addresslist" title="Адрессная книга">
                        <div>
                            <AddressBook/>
                        </div>
                    </Tab>
                    <Tab eventKey="wishlist" title="Список желаний">
                        <div>
                            <WishList/>
                        </div>
                    </Tab>
                    <Tab eventKey="orderslist" title="История заказов">
                        <div>
                            <HistoryOrders/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )

})

export default Cabinet