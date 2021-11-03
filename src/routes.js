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
    ARTICLES_ROUTE,
    ABOUT_STORE_ROUTE,
    CABINET_ROUTE,
    FAVORITE_ROUTE
} from "./utils/consts";
import Basket from "./pages/basket/Basket";
import Shop from "./pages/shop/Shop";
import DevicePage from "./pages/devicePage/DevicePage";
import Admin from "./pages/admin/Admin";
import Auth from "./pages/auth/Auth";
import Main from "./pages/main/Main";
import NotFound from "./pages/notFound/NotFound";
import Stoke from "./pages/stoke/Stoke";
import ShippingAndPayment from './pages/shippingAndPayment/ShippingAndPayment'
import Articles from './pages/articles/Articles'
import AboutStore from './pages/aboutStore/AboutStore'
import Cabinet from './pages/cabinet/Cabinet'
import Favorites from './pages/favorites/Favorites'


export const authRoutes = [
    { path: ADMIN_ROUTE, Component: Admin },
]

export const publicRoutes = [
    { path: MAIN_ROUTE, Component: Main },
    { path: SHOP_ROUTE, Component: Shop },
    { path: LOGIN_ROUTE, Component: Auth },
    { path: REGISTRATION_ROUTE, Component: Auth },
    { path: DEVICE_ROUTE + '/:id', Component: DevicePage },
    { path: BASKET_ROUTE, Component: Basket },
    { path: STOKE_ROUTE, Component: Stoke },
    { path: SHIPPING_AND_PAYMENT_ROUTE, Component: ShippingAndPayment },
    { path: ARTICLES_ROUTE, Component: Articles },
    { path: ABOUT_STORE_ROUTE, Component: AboutStore },
    { path: CABINET_ROUTE, Component: Cabinet },
    { path: FAVORITE_ROUTE, Component: Favorites },
    { path: "", Component: NotFound },

]