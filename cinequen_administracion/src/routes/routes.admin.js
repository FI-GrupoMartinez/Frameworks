import { AdminLayout, LoginAdminLayout } from "../layouts";
import { HomeAdmin, UsersAdmin, FuncionesAdmin, PeliculasAdmin, EstablecimientosAdmin, SalasAdmin, LoginAdmin, Soap_Calculadora, Soap } from "../pages/Admin";

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
    },
    {
        path: "/admin/users",
        layout: AdminLayout,
        component: UsersAdmin,
    },
    {
        path: "/admin/funciones",
        layout: AdminLayout,
        component: FuncionesAdmin,
    },
    {
        path: "/admin/peliculas",
        layout: AdminLayout,
        component: PeliculasAdmin,
    },
    {
        path: "/admin/establecimientos",
        layout: AdminLayout,
        component: EstablecimientosAdmin,
    },
    {
        path: "/admin/salas",
        layout: AdminLayout,
        component: SalasAdmin,
    },
    {
        path: "/admin/login",
        layout: LoginAdminLayout,
        component: LoginAdmin,
    },
    {
        path: "/admin/soap",
        layout: AdminLayout,
        component: Soap,
    },
];

export default routesAdmin;