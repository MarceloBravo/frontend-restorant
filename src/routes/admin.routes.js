import { AdminLayout } from "../layouts";
import { AdminHome, AdminUsersList, AdminUsersForm, LoginAdmin, CategoriasList } from "../pages";
import CategoriasForm from "../pages/Admin/Categorias/CategoriasForm/CategoriasForm";
import MesasForm from "../pages/Admin/Mesas/MesasForm/MesasForm";
import MesasList from "../pages/Admin/Mesas/MesasList/MesasList";
import ProductosList from "../pages/Admin/Productos";
import ProductoForm from "../pages/Admin/Productos/ProductosForm/ProductoForm";
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
    {
        path: '/admin/categorias',
        layout: AdminLayout,
        component: CategoriasList,
        menu: 'categorias'
    },
    {
        path: '/admin/categorias/:id',
        layout: AdminLayout,
        component: CategoriasForm,
        menu: 'categorias'
    },
    {
        path: '/admin/categorias/nuevo',
        layout: AdminLayout,
        component: CategoriasForm,
        menu: 'categorias'
    },
    {
        path: '/admin/productos',
        layout: AdminLayout,
        component: ProductosList,
        menu: 'productos'
    },
    {
        path: '/admin/productos/nuevo',
        layout: AdminLayout,
        component: ProductoForm,
        menu: 'productos'
    },
    {
        path: '/admin/productos/:id',
        layout: AdminLayout,
        component: ProductoForm,
        menu: 'productos'
    },
    {
        path: '/admin/mesas',
        layout: AdminLayout,
        component: MesasList,
        menu: 'mesas'
    },
    {
        path: '/admin/mesas/nuevo',
        layout: AdminLayout,
        component: MesasForm,
        menu: 'mesas'
    },
    {
        path: '/admin/mesas/:id',
        layout: AdminLayout,
        component: MesasForm,
        menu: 'mesas'
    },
];

export default AdminRoutes;