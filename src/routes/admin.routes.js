import { AdminLayout } from "../layouts";
import { AdminHome, AdminUsersList, AdminUsersForm, LoginAdmin } from "../pages";
//import { AdminUsersList } from "../pages/Adin/AdminUsers/AdminUsersList/AdminUsersList";

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
    },
    {
        path: '/admin/users/:id',
        layout: AdminLayout,
        component: AdminUsersForm,
        menu: 'usuarios'
    },
    {
        path: '/admin/users/nuevo',
        layout: AdminLayout,
        component: AdminUsersForm,
        menu: 'usuarios'
    },
];

export default AdminRoutes;