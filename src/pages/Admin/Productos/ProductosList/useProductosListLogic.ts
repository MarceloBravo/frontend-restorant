import { useEffect, useState } from 'react'
import { UseProducto } from '../../../../Hooks/UseProducto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../../store/slices/ModalSlices';
import { toast } from 'react-toastify';


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
  

 useEffect(() => {
    // Se ejecuta solo cuando el usuario hace clic en "Aceptar" en el modal de confirmación.
    if (modal.isOkClicked && deletedId) { // El usuario confirma la eliminación
        eliminar.mutate(deletedId);    
    }
    // eslint-disable-next-line
  }, [modal.isOkClicked]); // Dependemos de isOkClicked para disparar la acción


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


  useEffect(() => {
    if (listar.isError === true) {
      toast.error(listar.error.message);
    }
    // eslint-disable-next-line
  }, [listar])

  const handlerBtnNuevoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(`/admin/productos/nuevo`)
  }

  const handlerEditarClick = (id: string) => {
    navigate(`/admin/productos/${id}`)
  } 

  const handlerInputBuscarChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTextTemp(e.target.value);
  };

  const handlerInputBuscarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchTextTemp);
      //listar.refetch();
    }
  };

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