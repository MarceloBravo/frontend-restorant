import { ClientLayout } from "../layouts";
import { ClientHome } from "../pages";


const ClientRoutes = [
    {
        path: '/',
        layout: ClientLayout,
        component: ClientHome
    }
];

export default ClientRoutes;

