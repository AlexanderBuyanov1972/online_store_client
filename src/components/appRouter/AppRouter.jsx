import React, { useContext } from 'react'
import styles from './AppRouter.module.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import { authRoutes, publicRoutes } from "../../routes/routes"
import { SHOP_ROUTE } from "../../routes/routesConsts"
import { Context } from "../../index"

const AppRouter = () => {
    const { userStore } = useContext(Context)

    return (
        <div className={styles.container}>
            <Switch>
                {
                    userStore.isAuth && authRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} component={Component} exact />
                    )
                },
                {
                    publicRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} component={Component} exact />
                    )
                }
                <Redirect to={SHOP_ROUTE} />

            </Switch>
        </div>
    );
};

export default AppRouter;