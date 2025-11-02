import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//import { UseOrders } from '../../../../Hooks/UseOrders'
import { useMesas } from '../../../../Hooks/useMesas'
import { CardOrderDetail } from '../../../../components/CardOrderDetail/CardOrderDetail'
import './OrdenesDetail.scss'

export const OrdenesDetail = () => {
    const param = useParams()
    const mesaId: string = param.mesaId ?? ''
    const { buscarPorId } = useMesas('', parseInt(mesaId))
    const [ orders, setOrders ] = useState([])
    
    //const { buscarPorId } = UseOrders(parseInt(mesaId))

    
    useEffect(()=> {
        console.log('Buscando pedidos de la mesa ', mesaId);
        if(mesaId !== ''){
            buscarPorId.refetch()    
        }
    },[])

    useEffect(()=> {
        if(buscarPorId.error){
            console.log('Mesa sin pedidos')
        }else{
            console.log('Listando los pedidos de la mesa ',buscarPorId.data)
            setOrders(buscarPorId.data?.data.orders)
        }
    },[buscarPorId.data])

   

  return (
    <div className="order-detail-container">
        {orders && orders.length > 0 && orders.map((order: any) =>
            <CardOrderDetail key={order.id} order={order}/>
        )}
    </div>
  )
}
