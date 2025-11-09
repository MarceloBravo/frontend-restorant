import { UseQueryResult } from "@tanstack/react-query";
import { OrdersClass } from "../../class/OrdersClass";
import { MesasClass } from "../../class/MesasClass";
import { OptionSelectInterface } from "../Components/OptionSelectInterface";

export interface OrdenesDetailInterface{
      mesa: MesasClass | null,
      buscarPorId:  UseQueryResult<OrdersClass | null, Error> ,
      orders: any[],
      isVisible: boolean,
      optionsSelect: OptionSelectInterface[],
      setSelectedProducts: (options: any[]) => void,
      setIsVisible: (value: boolean) => void,
      handleBtnNuevaOrden: () => void,
}