import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { actualizarOrden, crearOrden, eliminarOrden, getOrdersById, listarOrdenes } from '../axios/orders'
import { OrdersClass } from '../class/OrdersClass'


export const UseOrders = (id: number | null, searchTerm: string = '') => {
    const queryClient = useQueryClient()


    const buscarPorId = useQuery({
        queryKey: ['orders'],
        queryFn: () => id ? getOrdersById(id) : null,
        enabled: false
    })
    
    const listar = useQuery({
        queryKey: ['orders', searchTerm],
        queryFn: () => listarOrdenes(searchTerm ?? null),
        enabled: false
    })

    const crear = useMutation<any, Error, any>({
        mutationFn: (order: OrdersClass) => {
            const token: string | null = localStorage.getItem('access')
            return crearOrden(order, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['orders']})   
    })


    const actualizar = useMutation<any, Error, any>({
        mutationFn: (order: OrdersClass) => {
            const token: string | null = localStorage.getItem('access')
            return actualizarOrden(order, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['orders']})
    })

    const eliminar = useMutation<any, Error, any>({
        mutationFn: (id: number) => {
            const token: string | null = localStorage.getItem('access')
            return eliminarOrden(id, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['orders']})
    })  


  return {
    buscarPorId,
    listar,
    crear,
    actualizar,
    eliminar,    
  }
}