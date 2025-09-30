import { useEffect, useState } from 'react'
import { Grid } from '../../../../components/Grid'
import { useCategorias } from '../../../../Hooks/useCategorias'
import { Loader } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { openModal } from '../../../../store/slices/ModalSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './CategoriasList.scss'


const CategoriasList = () => {
    const [ deletedId, setDeleteId ] = useState(null)
    const [ searchTerm, setSearchTerm ] = useState('');
    const { loading, categorias, status, listarCategorias, eliminarCategoria } = useCategorias();
    const modal = useSelector(state => state.modal)
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
        if (status.code >= 200 && status.code < 300 && status.message.includes('eliminada')) {
            toast.success(status.message);
            listarCategorias(); // Recargamos la lista solo después de una eliminación exitosa
        } else if (status.code >= 400) { // Manejo de errores genérico
            toast.error(status.message);
        }
        // eslint-disable-next-line
    }, [status]);


    const handlerBtnNuevoClick = (e) => {
        e.preventDefault()
        navigate(`/admin/categorias/nuevo`)
    }

    const handlerEditarClick = (id) => {
        navigate(`/admin/categorias/${id}`)
    }   

    const handlerInputBuscarChange  = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
        if(e.key === 'Enter') listarCategorias(searchTerm);
    };

    const handlerEliminarClick = (id) => {
        dispatch(openModal({
            title: 'Eliminar categoría', 
            message: '¿Está seguro que desea eliminar esta categoría?', 
            btnAceptarText: 'Eliminar', 
            isOpen: true
        }))
        setDeleteId(id)
    }

    if(loading) return (<Loader active inline='centered'>Cargando ...</Loader>)

    return (
        <div className="main-container">
            <h1>Categorias de productos</h1>
            <Grid 
                data={categorias} 
                headers={['ID', 'Nombre', 'Descripción', 'imágen', 'Fecha creación', 'Fecha modificación']} 
                fields={['id','name', 'description', 'image', 'created_at', 'updated_at']} 
                types={['number', 'text', 'text', 'image', 'date', 'date']}
                btnText={"Nueva categoría"}
                placeholderText={"Buscar categoría..."}
                searchValue={searchTerm}
                handlerBtnNuevoClick={handlerBtnNuevoClick}
                handlerInputBuscarChange={handlerInputBuscarChange}
                handlerEditarClick={handlerEditarClick}
                handlerEliminarClick={handlerEliminarClick}
            />
        </div>
    )
}

export default CategoriasList;