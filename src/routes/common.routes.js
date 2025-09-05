import { EmptyLayout } from "../layouts";
import { Page404 } from "../pages";

const CommonRoutes = [
    {
        path: '*',
        layout: EmptyLayout,
        component: Page404
    }
];

export default CommonRoutes;