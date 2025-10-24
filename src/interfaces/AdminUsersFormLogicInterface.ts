import { UserClass } from "../class/UserClass";

export interface AdminUsersFormLogicInterface{
    handlerInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlerCancelarClick: () => void;
    handlerGrabarClick: () => void;
    handlerEliminarClick: () => void;
    formData: UserClass;
    id: string | null;
}