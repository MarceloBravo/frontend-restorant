import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProductById, getProducts, updateProduct, deleteProduct} from "../axios/productos";
import { ProductoClass } from "../class/ProductoClass";

/**
 * Hook personalizado para gestionar las operaciones CRUD de Productos utilizando @tanstack/react-query.
 *
 * Proporciona consultas (`useQuery`) para listar y ver productos, y mutaciones (`useMutation`) 
 * para crear, actualizar y eliminar productos. Las consultas de listar y ver están deshabilitadas 
 * por defecto y deben ser activadas manualmente donde se use el hook.
 *
 * @param searchTerms - Términos de búsqueda para filtrar la lista de productos en la consulta `listar`.
 * @param productoId - El ID del producto a obtener en la consulta `ver`.
 * @returns Un objeto con los siguientes manejadores de @tanstack/react-query:
 *  - `listar`: Objeto de `useQuery` para la lista de productos.
 *  - `ver`: Objeto de `useQuery` para un solo producto.
 *  - `nuevo`: Objeto de `useMutation` para crear un producto.
 *  - `actualizar`: Objeto de `useMutation` para actualizar un producto.
 *  - `eliminar`: Objeto de `useMutation` para eliminar un producto.
 */
export const UseProducto = (searchTerms: string = '', productoId: number | null = null) => {
    const queryClient = useQueryClient();

    const listar = useQuery({
        queryKey: ['productos', searchTerms],
        queryFn: () => getProducts(searchTerms),
        enabled: false
    })

    const ver = useQuery({
        queryKey: ['productos', productoId],
        queryFn: () => productoId ? getProductById(productoId) : null,
        enabled: false
    })

    const nuevo = useMutation<any, Error, any>({
        mutationFn: (producto: ProductoClass)=>
        {
            const token: string | null = localStorage.getItem('access');
            return createProduct(producto, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['productos']})
    });

    const actualizar = useMutation<any, Error, any>({
        mutationFn: (producto: ProductoClass) => {
            const token: string | null = localStorage.getItem('access');
            return updateProduct(producto, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['productos']})
    });

    const eliminar = useMutation<any, Error, any>({
        mutationFn: (id: number) => {
            const token: string | null= localStorage.getItem('access');
            return deleteProduct(id, token ?? '')
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['productos']})
    });
    
    return {
        listar,
        ver,
        nuevo,
        actualizar,
        eliminar
    };
}