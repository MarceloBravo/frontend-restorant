import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardOrderDetail } from '../../../../components/CardOrderDetail/CardOrderDetail';
import { UseOrders } from '../../../../Hooks/UseOrders';
import { toast } from 'react-toastify';
import './OrdenesDetail.scss';

export const OrdenesDetail = () => {
    const param = useParams()
    const mesaId: string = param.mesaId ?? ''
    const { listar } = UseOrders(null, '?table=' + mesaId + '&ordering=-status,created_at', true);
    const [ orders, setOrders ] = useState<any>([]);
    
    
    useEffect(()=> {
        if(mesaId !== ''){
            listar.refetch();
        }
    },[])

    useEffect(()=> {
        const raw = (listar as any);
        const hasError = raw?.error;

        if(hasError){
            toast.info('Mesa sin pedidos');
        }else{
            console.log('Listando los pedidos de la mesa ', raw?.data ?? raw)
            // manejar listar cuando puede ser un array o un objeto con .data.data
            let fetched: any[] = [];

            if(Array.isArray(raw)){
                fetched = raw;
            } else if (raw?.data && Array.isArray(raw.data?.data)) {
                fetched = raw.data.data;
            } else if (Array.isArray(raw?.data)) {
                fetched = raw.data;
            }

            setOrders(fetched)
        }
    },[listar])

   

  return (
    <div className="order-detail-container">
        {orders && orders.length > 0 && orders.map((order: any) =>
            <CardOrderDetail key={order.id} order={order}/>
        )}
    </div>
  )
}
