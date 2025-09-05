import ClientRoutes from "./client.routes";
import AdminRoutes from "./admin.routes";
import CommonRoutes from "./common.routes";

const routes = [...ClientRoutes, ...AdminRoutes, ...CommonRoutes];

export default routes;
