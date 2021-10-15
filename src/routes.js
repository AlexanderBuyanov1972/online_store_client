import { MAIN_ROUTE, ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts";
import Basket from "./pages/basket/Basket";
import Shop from "./pages/shop/Shop";
import DevicePage from "./pages/devicePage/DevicePage";
import Admin from "./pages/admin/Admin";
import Auth from "./pages/auth/Auth";
import Main from "./pages/main/Main";
import NotFound from "./pages/notFound/NotFound";

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
    { path: "", Component: NotFound },

]