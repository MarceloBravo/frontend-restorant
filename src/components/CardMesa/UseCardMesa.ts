import { useEffect, useId, useState } from 'react'
import { InfoPedidosInterface } from '../../interfaces/Pedidos/InfoPedidosInterface';

export const UseCardMesa = (props: any)  => {
    const { item } = props;
    const imgMesaId = useId();
    const [ info, setInfo ] = useState<InfoPedidosInterface | null>()


    useEffect(() => {
        getPedidosInfo(item.orders ?? [])
    },[item.orders])
    

     const getPedidosInfo = (ordenes: any[]): void => {
      const info: InfoPedidosInterface = {
        pending: ordenes.filter((orden: any) => orden.status === 'pending').length,
        delivered: ordenes.filter((orden: any) => orden.status === 'delivered').length,
        canceled: ordenes.filter((orden: any) => orden.status === 'canceled').length,
        closed: ordenes.filter((orden: any) => orden.status === 'closed').length,
        total: ordenes.length,
      }
      setInfo(info);
    } 

  return {
    imgMesaId,
    item,
    info
  }
}