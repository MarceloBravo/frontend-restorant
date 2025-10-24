import { UserClass } from "../class/UserClass"

export interface AdminUserListLogicInterface {
    users: UserClass[];
    textoBuscado: string;
    handlerBtnNuevoClick: () => void;
    handlerInputBuscarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlerEditarClick: (id: number) => void;
    handlerEliminarClick: (id: number) => void;
    handlerInputBuscarKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}