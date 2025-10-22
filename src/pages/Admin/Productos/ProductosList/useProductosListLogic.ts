import { useEffect, useState } from 'react'
import { UseProducto } from '../../../../Hooks/UseProducto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../../store/slices/ModalSlices';
import { toast } from 'react-toastify';

/**
 * Hook personalizado que encapsula la lógica para la lista de productos del panel de administración.
 * Maneja la obtención de datos, búsqueda, y el flujo de eliminación con modal de confirmación.
 * @returns {{ 
 *  handlerBtnNuevoClick: (e: React.MouseEvent<HTMLButtonElement>) => void, 
 *  handlerEditarClick: (id: string) => void, 
 *  handlerInputBuscarChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
 *  handlerInputBuscarKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void, 
 *  handlerEliminarClick: (id: number) => void, 
 *  listar: any, 
 *  searchTextTemp: string 
 * }} - Objeto con los manejadores de eventos y el estado de la consulta de productos.
 */
export const useProductosListLogic = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTextTemp, setSearchTextTemp] = useState('');
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const { listar, eliminar } = UseProducto(searchTerm);
  const modal = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Search Term changed:', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    listar.refetch();
    // eslint-disable-next-line
  }, []);
  

  /**
   * Efecto que se dispara cuando el usuario confirma la eliminación en el modal.
   * Llama a la mutación `eliminar` de react-query con el ID del producto a eliminar.
   */
 useEffect(() => {
    // Se ejecuta solo cuando el usuario hace clic en "Aceptar" en el modal de confirmación.
    if (modal.isOkClicked && deletedId) { // El usuario confirma la eliminación
        eliminar.mutate(deletedId);    
    }
    // eslint-disable-next-line
  }, [modal.isOkClicked]); // Dependemos de isOkClicked para disparar la acción


  /**
   * Efecto que maneja el resultado de la mutación de eliminación.
   * Muestra una notificación de éxito o error y, en caso de éxito, 
   * refresca la lista de productos.
   */
  useEffect(() => {
    if (eliminar.isError === true) {
      toast.error(eliminar.error.message);
    }else{
      if(eliminar.isSuccess === true && deletedId){
        toast.success('Producto eliminado con éxito.');
        setDeletedId(null);
        listar.refetch();
      }
    }
    // eslint-disable-next-line
  }, [eliminar])


  /**
   * Efecto que maneja los errores de la consulta para listar los productos.
   */
  useEffect(() => {
    if (listar.isError === true) {
      toast.error(listar.error.message);
    }
    // eslint-disable-next-line
  }, [listar])

  /**
   * Navega a la página de creación de un nuevo producto.
   * @param e - Evento de clic del botón.
   */
  const handlerBtnNuevoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(`/admin/productos/nuevo`)
  }

  /**
   * Navega a la página de edición de un producto existente.
   * @param id - ID del producto a editar.
   */
  const handlerEditarClick = (id: string) => {
    navigate(`/admin/productos/${id}`)
  } 

  /**
   * Actualiza el estado temporal del texto de búsqueda mientras el usuario escribe.
   * @param e - Evento de cambio del input de búsqueda.
   */
  const handlerInputBuscarChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTextTemp(e.target.value);
  };

  /**
   * Inicia una nueva búsqueda cuando el usuario presiona "Enter" en el campo de búsqueda.
   * @param e - Evento de teclado del input de búsqueda.
   */
  const handlerInputBuscarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchTextTemp);
      //listar.refetch();
    }
  };

  /**
   * Inicia el flujo de eliminación de un producto.
   * Abre un modal de confirmación y guarda el ID del producto a eliminar.
   * @param id - ID del producto a eliminar.
   */
  const handlerEliminarClick = (id: number) => { 
     dispatch(openModal({
        title: 'Eliminar categoría', 
        message: '¿Está seguro que desea eliminar esta categoría?', 
        btnAceptarText: 'Eliminar', 
        isOpen: true
    }));
    setDeletedId(id);
  }
  
  return {
    handlerBtnNuevoClick,
    handlerEditarClick,
    handlerInputBuscarChange,
    handlerInputBuscarKeyDown,
    handlerEliminarClick,
    listar,
    searchTextTemp
  }
}