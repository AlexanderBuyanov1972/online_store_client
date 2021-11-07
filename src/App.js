import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/appRouter/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Container, Spinner } from "react-bootstrap";
import Footer from './components/footer/Footer';
import Header from './components/header/Header'
import styles from './App.css'

const App = observer(() => {
    const { userStore } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            userStore.setUser(data)
            userStore.setIsAuth(true)
            if (data.role === 'ADMIN') {
                userStore.setIsAdmin(true)
            }
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation = { "grow" }
        />
    }
    return ( <
        BrowserRouter >
        <
        Container >
        <
        Header / >
        <
        AppRouter / >
        <
        Footer / >
        <
        /Container>  < /
        BrowserRouter >
    );
})

export default App