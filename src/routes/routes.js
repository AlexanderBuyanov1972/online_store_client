import {
    MAIN_ROUTE,
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    STOKE_ROUTE,
    SHIPPING_AND_PAYMENT_ROUTE,
    ABOUT_STORE_ROUTE,
    CABINET_ROUTE,
    ORDERING_ROUTE,
} from "../routes/routesConsts";
import Basket from "../pages/basket/Basket";
import Shop from "../pages/shop/Shop";
import DevicePage from "../pages/devicePage/DevicePage";
import Admin from "../pages/admin/Admin";
import Auth from "../pages/auth/Auth";
import Main from "../pages/main/Main";
import NotFound from "../pages/notFound/NotFound";
import Stoke from "../pages/stoke/Stoke";
import ShippingAndPayment from '../pages/shippingAndPayment/ShippingAndPayment'
import AboutStore from '../pages/aboutStore/AboutStore'
import Cabinet from '../pages/cabinet/Cabinet'
import Ordering from "../pages/ordering/Ordering";


export const authRoutes = [
    { path: ADMIN_ROUTE, Component: Admin },
    { path: CABINET_ROUTE, Component: Cabinet },
    { path: BASKET_ROUTE, Component: Basket },
    { path: ORDERING_ROUTE, Component: Ordering },
]

export const publicRoutes = [
    { path: MAIN_ROUTE, Component: Main },
    { path: SHOP_ROUTE, Component: Shop },
    { path: LOGIN_ROUTE, Component: Auth },
    { path: REGISTRATION_ROUTE, Component: Auth },
    { path: DEVICE_ROUTE + '/:id', Component: DevicePage },
    { path: STOKE_ROUTE, Component: Stoke },
    { path: SHIPPING_AND_PAYMENT_ROUTE, Component: ShippingAndPayment },
    { path: ABOUT_STORE_ROUTE, Component: AboutStore },
    { path: "", Component: NotFound },

]