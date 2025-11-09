import React, { useCallback, useEffect, useRef, useState } from 'react'
import { UseOrders } from '../../../../Hooks/UseOrders';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../store/slices/ModalSlices';
import { useNavigate } from 'react-router-dom';
import { ListaOrdenesInterface } from '../../../../interfaces/Ordenes/ListaOrdenesInterface';
import { useMesas } from '../../../../Hooks/useMesas';

const useOrdenesList = (): ListaOrdenesInterface => {
  const REFRESHTIME_5MIN: number = 300000;
  const refreshButton = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const modal = useSelector((state: any) => state.modal);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {listar, eliminar} = UseOrders(deletedId, searchTerm);
  const {listar: listarMesas} = useMesas()

  // Función para refrescar de forma segura
  const safeRefresh = useCallback(() => {
    if (refreshButton.current) {
      refreshButton.current.click();
    }
  }, []);

  useEffect(() => {
    // Siempre limpiar el intervalo existente primero para evitar acumular intervalos 
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Solo crear nuevo intervalo si autoRefresh está activo
    if (autoRefresh) {
      intervalRef.current = setInterval(safeRefresh, REFRESHTIME_5MIN);
    }

    // Cleanup al desmontar o cuando autoRefresh cambie
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, safeRefresh])


  useEffect(() => {
    listarMesas.refetch();
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
    navigate('/admin/ordenes/' + id);
  }


  const handlerBtnNuevoClick = (): void => {
    navigate('/admin/ordenes/nuevo');
  }


  const handleRefresh = (): void => {
    listarMesas.refetch();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  }

  const handleAutoRefresh = (): void => {
    if(!autoRefresh){
      refreshButton.current?.click()
    }
    setAutoRefresh(prev => !prev);
  }

  return {
    autoRefresh,
    refreshButton,
    isRefreshing,
    listarMesas,
    listar,
    searchTerm,
    handleRefresh,
    handleAutoRefresh,
    handlerInputBuscarChange,
    handlerInputBuscarKeyDown,
    handlerEliminarClick,
    handlerBtnNuevoClick,
    handlerEditarClick,
  }
}

export default useOrdenesList;
