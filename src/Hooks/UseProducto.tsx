import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProductById, getProducts, updateProduct, deleteProduct} from "../axios/productos";
import { ProductoClass } from "../class/ProductoClass";

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