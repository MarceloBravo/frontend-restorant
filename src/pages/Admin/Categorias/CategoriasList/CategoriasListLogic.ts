import React, { useEffect, useState } from 'react'
import { useCategorias } from '../../../../Hooks/useCategorias'
import { toast } from 'react-toastify'
import { openModal } from '../../../../store/slices/ModalSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CategoriasListLogicInterface } from '../../../../interfaces/CategoriasListLogicInterface'

const CategoriasListLogic = (): CategoriasListLogicInterface => {
    const [ deletedId, setDeleteId ] = useState<number | null>(null)
    const [ searchTerm, setSearchTerm ] = useState('');
    const { loading, categorias, status, listarCategorias, eliminarCategoria } = useCategorias();
    const modal = useSelector((state: any) => state.modal)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => { 
        listarCategorias()
        // eslint-disable-next-line
    }, [])

    
    useEffect(() => {
        // Se ejecuta solo cuando el usuario hace clic en "Aceptar" en el modal de confirmación.
        if (modal.isOkClicked && deletedId) { // 1. El usuario confirma la eliminación
            eliminarCategoria(deletedId); // 2. Se llama a la función del hook (que no devuelve nada)
        }
        // eslint-disable-next-line
    }, [modal.isOkClicked]); // Dependemos de isOkClicked para disparar la acción

    useEffect(() => {
        // 3. Este efecto reacciona al cambio de 'status' provocado por eliminarCategoria
        if (status.code >= 200 && status.code < 300 && status.message && status.message.includes('eliminada')) {
            toast.success(status.message);
            listarCategorias(); // Recargamos la lista solo después de una eliminación exitosa
        } else if (status.code >= 400) { // Manejo de errores genérico
            toast.error(status.message);
        }
        // eslint-disable-next-line
    }, [status]);


    const handlerBtnNuevoClick = (): void => {
        navigate(`/admin/categorias/nuevo`)
    }

    const handlerEditarClick = (id: number): void => {
        navigate(`/admin/categorias/${id}`)
    }   

    const handlerInputBuscarChange  = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const handlerInputBuscarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if(e.key === 'Enter') listarCategorias(searchTerm);
    };

    const handlerEliminarClick = (id: number): void => {
        dispatch(openModal({
            title: 'Eliminar categoría', 
            message: '¿Está seguro que desea eliminar esta categoría?', 
            btnAceptarText: 'Eliminar', 
            isOpen: true
        }))
        setDeleteId(id)
    }

    return (
        {
            handlerBtnNuevoClick,
            handlerEditarClick,
            handlerInputBuscarChange,
            handlerInputBuscarKeyDown,
            handlerEliminarClick,
            categorias,
            searchTerm,
            loading
        }
    )
}

export default CategoriasListLogic;