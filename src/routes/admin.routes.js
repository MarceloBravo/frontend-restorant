import { AdminLayout } from "../layouts";
import { AdminHome, LoginAdmin } from "../pages";
import { AdminUsersList } from "../pages/Admin/AdminUsers/AdminUsersList/AdminUsersList";

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
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: AdminUsersList
    }
];

export default AdminRoutes;