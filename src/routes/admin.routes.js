import { AdminLayout } from "../layouts";
import { AdminHome, LoginAdmin } from "../pages";
import { AdminUsersList } from "../pages/Admin/AdminUsers/AdminUsersList/AdminUsersList";

const AdminRoutes = [
    {
        path: '/admin/home',
        layout: AdminLayout,
        component: AdminHome,
        menu: 'home'
    },
    {
        path: '/admin/login',
        layout: null,
        component: LoginAdmin
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: AdminUsersList,
        menu: 'usuarios'
    }
];

export default AdminRoutes;