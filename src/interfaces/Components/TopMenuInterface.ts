import { UserClass } from "../../class/UserClass";

export default interface TopMenuInterface {
    user: UserClass | string, 
    handlerExitClick: ()=> void
}
