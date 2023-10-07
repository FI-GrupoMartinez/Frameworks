import { AdminLayout } from "../layouts";
import { HomeAdmin, UsersAdmin, FuncionesAdmin, PeliculasAdmin, EstablecimientosAdmin, SalasAdmin } from "../pages/Admin";

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
        path: "/admin/peliculas",
        layout: AdminLayout,
        component: PeliculasAdmin,
    },
];

export default routesAdmin;