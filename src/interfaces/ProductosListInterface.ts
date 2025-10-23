export interface ProductosListLogicInterface {    
   handlerBtnNuevoClick: (e: any) => void, 
   handlerEditarClick: (id: number) => void, 
   handlerInputBuscarChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
   handlerInputBuscarKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void, 
   handlerEliminarClick: (id: number) => void, 
   listar: any, 
   searchTextTemp: string 
 }