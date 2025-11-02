export interface PedidosInterface{
    handlerBtnNuevoClick: (e: any) => void, 
    handlerEditarClick: (id: number) => void, 
    handlerInputBuscarChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    handlerInputBuscarKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void, 
    handlerEliminarClick: (id: number) => void, 
    getPedidosInfo: (ordenes: any[]) => void;
    listar: any, 
    searchTerm: string 
}