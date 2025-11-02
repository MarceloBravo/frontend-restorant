import React, { useEffect, useState } from 'react'
import { UseOrders } from '../../../../Hooks/UseOrders';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../store/slices/ModalSlices';
import { useNavigate } from 'react-router-dom';
import { ListInterface } from '../../../../interfaces/ListInterface';

const useOrdenesList = (): ListInterface => {
    const [deletedId, setDeletedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const {listar, eliminar} = UseOrders(deletedId, searchTerm);
    const modal = useSelector((state: any) => state.modal);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(() => {
      listar.refetch();
      // eslint-disable-next-line
    },[])

    useEffect(() => {
      if(deletedId && modal.isOkClicked){
        eliminar.mutate(deletedId ?? '');
        setDeletedId(null);
      }
      // eslint-disable-next-line
    },[modal.isOkClicked])

    useEffect(() => { 
      listar.refetch()
      // eslint-disable-next-line
    },[eliminar.isSuccess])

    const handlerInputBuscarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(e.target.value);
    }

    const handlerInputBuscarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        listar.refetch();
      }
    }

    const handlerEliminarClick = (id: number): void => {
      setDeletedId(id);
      dispatch(openModal({
        title: 'Eliminar orden', 
        message: '¿Está seguro que desea eliminar esta orden?', 
        btnAceptarText: 'Eliminar', 
        isOpen: true
      }));
    }

    const handlerEditarClick = (id: number): void => {
      console.log('editar', id);
      navigate('/admin/ordenes/' + id);
    }


    const handlerBtnNuevoClick = (): void => {
      navigate('/admin/ordenes/nuevo');
    }

  return {
    listar,
    searchTerm,
    handlerInputBuscarChange,
    handlerInputBuscarKeyDown,
    handlerEliminarClick,
    handlerBtnNuevoClick,
    handlerEditarClick,
  }
}

export default useOrdenesList;
