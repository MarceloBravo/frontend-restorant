import { AdminLayout } from "../layouts";
import { AdminHome, LoginAdmin } from "../pages";

const AdminRoutes = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: AdminHome
    },
    {
        path: '/admin/login',
        layout: AdminLayout,
        component: LoginAdmin
    }
];

export default AdminRoutes;