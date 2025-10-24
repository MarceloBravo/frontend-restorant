import { CategoryClass } from "../class/CategoryClass";

export interface CategoriasListLogicInterface {
    handlerBtnNuevoClick: () => void;
    handlerEditarClick: (id: number) => void;
    handlerInputBuscarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlerInputBuscarKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handlerEliminarClick: (id: number) => void;
    categorias: CategoryClass[];
    searchTerm: string;
    loading: boolean;
}
