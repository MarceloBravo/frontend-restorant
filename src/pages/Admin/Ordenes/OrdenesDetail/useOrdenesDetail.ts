import { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { UseOrders } from '../../../../Hooks/UseOrders';
import { toast } from 'react-toastify';
import { useMesas } from '../../../../Hooks/useMesas';
import { OrdenesDetailInterface } from '../../../../interfaces/Ordenes/OrdenesDetailInterface';
import { MesasClass } from '../../../../class/MesasClass';
import { UseProducto } from '../../../../Hooks/UseProducto';
import { ProductoClass } from '../../../../class/ProductoClass';
import { OptionSelectInterface } from '../../../../interfaces/Components/OptionSelectInterface';
import { OrdersClass } from '../../../../class/OrdersClass';
import { status_enum } from '../../../../shared/enums';

export const useOrdenesDetail = ():OrdenesDetailInterface => {
    const param: Readonly<Params<string>> = useParams()
    const mesaId: string = param.mesaId ?? ''
    const { listar, crear } = UseOrders(null, '?table=' + mesaId + '&ordering=-status,created_at', true);
    const { listar: listarProductos } = UseProducto()
    const { buscarPorId } = useMesas('',parseInt(mesaId));
    const [ orders, setOrders ] = useState<any>([]);
    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ mesa, setMesa ] = useState<MesasClass | null>(null);
    const [ optionsSelect, setOptionsSelect ] = useState<OptionSelectInterface[]>([]);
    const [ selectedProducts, setSelectedProducts ] = useState<OptionSelectInterface[]>([])
    
    useEffect(()=> {
        listarProductos.refetch()
        if(mesaId !== ''){
            listar.refetch();
            buscarPorId.refetch();
        }
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(buscarPorId.isSuccess){
            setMesa(buscarPorId.data.data ?? '');
        }
        if(buscarPorId.isError){
            toast.error('Ocurrió un error al buscar los datos de la mesa.');
        }    
        // eslint-disable-next-line
    },[buscarPorId.isSuccess, buscarPorId.isError]);

    useEffect(()=> {
        if(listar.isError){
            toast.info('Mesa sin pedidos');
        }
        if(listar.isSuccess === true){
            const raw = (listar.data as any).data;
            setOrders(raw);
        }
    },[listar.isSuccess, listar.isError, listar.data])


    useEffect(()=> {
        if(listarProductos.isSuccess){
            formatOptionsSelect(listarProductos.data.data);            
        }
        if(listarProductos.isError){
            toast.error('Ocurrió un error al obtener los productos.');
            setOptionsSelect([]);
        }
        // eslint-disable-next-line
    },[listarProductos.isSuccess])


    useEffect(() => {
        if(selectedProducts.length > 0){
            const productos = agruparProductosSeleccionados(selectedProducts);

            productos.forEach((producto: OptionSelectInterface) => {
                const data: OrdersClass = { 
                    id: null, 
                    table: parseInt(mesaId), 
                    products: parseInt(producto.value), 
                    status: status_enum.PENDING,
                    quantity: producto.cantidad,
                    total: producto.price * producto.cantidad,
                };
                crear.mutate(data);
            });
        }
        // eslint-disable-next-line
    }, [selectedProducts]);

    
    const agruparProductosSeleccionados = (products: OptionSelectInterface[]): OptionSelectInterface[] => {
        const sortProduct = products.reduce((acc: OptionSelectInterface[], product: OptionSelectInterface) => {
            const existingProduct = acc.find((p: OptionSelectInterface) => p.value === product.value);
            if (!existingProduct) {
                acc.push({value: product.value, cantidad:1, price: product.price, label: product.label, image: product.image});
            }else{
                existingProduct.cantidad++;
            }
            return acc;
        }, [] as OptionSelectInterface[]);
        return sortProduct;
    }

    

    /**
     * Prepara los datos para ser enviados al control SELECT del formulario "Agregar pedido"
     * @param options: ProductoClass[] = array con productos a enviar al modal "Agrgar pedido"
     */
    const formatOptionsSelect = (options: ProductoClass[]): void => {
        const optionsArray: OptionSelectInterface[] = options.map((option: ProductoClass) => {
            return { 
                value: option.id ?? '', 
                label: option.title, 
                image: option.image,
                price: option.price,
                cantidad: 1
            }
        });
        setOptionsSelect(optionsArray);
    }

   const handleBtnNuevaOrden = (): void => {
    setIsVisible(true);
    setSelectedProducts([]);
   }

  return {
        mesa,
        buscarPorId,
        orders,
        isVisible,
        optionsSelect,
        setSelectedProducts,
        setIsVisible,
        handleBtnNuevaOrden
  }
}
