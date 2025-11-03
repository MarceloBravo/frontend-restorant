import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { crearMesa, eliminarMesa, listarMesas, actualizarMesa, getMesaById } from '../axios/mesas';
import { MesasClass } from "../class/MesasClass";

/**
 * Hook para gestionar las operaciones CRUD de las mesas.
 * @param searchTerms - Términos de búsqueda para filtrar las mesas.
 * @param mesaId - ID de la mesa para buscar.
 * @returns Un objeto con funciones para listar, buscar por ID, crear, actualizar y eliminar mesas.
 */
export const useMesas = (searchTerms: string = '', mesaId: number | null = null, orderString: string = '') => {
    const queryClient = useQueryClient()
    
    /**
     * Query para listar las mesas.
     */
    const listar = useQuery({
        queryKey: ['mesas', searchTerms],
        queryFn: () => listarMesas(searchTerms),
        enabled: false
    })

    /**
     * Query para buscar una mesa por su ID.
     */
    const buscarPorId = useQuery({
        queryKey: ['mesas', mesaId],
        queryFn: () => mesaId ? getMesaById(mesaId, orderString) : null,
        enabled: false
    })

    /**
     * Mutación para crear una nueva mesa.
     */
    const nuevo = useMutation<any, Error, any>({
        mutationFn: (mesa: MesasClass) => {
            const token: string | null = localStorage.getItem('access')
            return crearMesa(mesa, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['mesas']})
    })


    /**
     * Mutación para actualizar una mesa existente.
     */
    const actualizar = useMutation<any, Error, any>({
        mutationFn: (mesa: MesasClass) => {
            const token: string | null = localStorage.getItem('access')
            return actualizarMesa(mesa, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['mesas']})
    })
            
    /**
     * Mutación para eliminar una mesa.
     */
    const eliminar = useMutation<any, Error, any>({
        mutationFn: (id: number) => {
            const token: string | null = localStorage.getItem('access')
            return eliminarMesa(id, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['mesas']})
    })

    return {
        listar,
        buscarPorId,
        nuevo,
        actualizar,
        eliminar
    }
}