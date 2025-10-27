import React, { useEffect, useState } from 'react'
import { useMesas } from '../../../../Hooks/useMesas';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../../store/slices/ModalSlices';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MesasListLogic = () => {
    const [ searchTerm, setSearchTerm] = useState<string>('');
    const [ mesaIdDelete, setMesaIdDelete ] = useState<number | null>(null);
    const { listar, eliminar } = useMesas(searchTerm);
    const modal = useSelector((state: any) => state.modal);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        listar.refetch();
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(modal.isOkClicked && mesaIdDelete){
            eliminar.mutate(mesaIdDelete)
        }
        // eslint-disable-next-line
    }, [modal.isOkClicked])

    useEffect(() => {
        if(!modal.isOkClicked || !mesaIdDelete)return
        if(eliminar.isError === true){
            toast.error('Ocurrió un error al intentar eliminar la mesa.');
        }else{
            if(eliminar.isSuccess === true){
                toast.success('Mesa eliminada exitosamente')   
                listar.refetch();
                setMesaIdDelete(null);
            }
        }
        // eslint-disable-next-line
    },[eliminar, modal.isOkClicked])

    const handlerBtnNuevoClick = () => {
        navigate('/admin/mesas/nuevo');
    }

    const handlerEditarClick = (id: number) => {
        navigate('/admin/mesas/' + id);
    }

    const handlerEliminarClick = (id: number) => {
        setMesaIdDelete(id);
        dispatch(openModal({
            title: 'Eliminar mesa',
            message: '¿Está seguro que desea eliminar esta mesa?',
            btnAceptarText: 'Eliminar',
            isOpen: true
        }));
    }

    const handlerInputBuscarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    }


    const handlerInputBuscarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            listar.refetch()
        }
    }


  return (
    {
        searchTerm,
        listar,
        handlerBtnNuevoClick,
        handlerEditarClick,
        handlerEliminarClick,
        handlerInputBuscarChange,
        handlerInputBuscarKeyDown
    }
  )
}

export default MesasListLogic
