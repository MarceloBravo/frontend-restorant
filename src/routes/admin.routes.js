import { AdminLayout } from "../layouts";
import { AdminHome } from "../pages";

const AdminRoutes = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: AdminHome
    }
];

export default AdminRoutes;