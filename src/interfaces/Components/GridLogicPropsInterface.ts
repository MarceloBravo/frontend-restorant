export interface GridLogicPropsInterface {
  sinBusqueda?: boolean;
  data: Array<object>;
  headers?: Array<string>;
  fields?: Array<string>;
  types?: Array<string>;
  btnText?: string;
  placeholderText?: string;
  searchValue: string;
  handlerBtnNuevoClick: () => void;
  handlerInputBuscarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlerInputBuscarKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handlerEditarClick: (id: number) => void;
  handlerEliminarClick: (id: number) => void;
} 