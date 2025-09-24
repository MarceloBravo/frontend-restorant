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
    const { loading, categorias, status, listarCategorias, eliminarCategoria } = useCategorias();
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => { 
        listarCategorias()
        // eslint-disable-next-line
    }, [])

    
    useEffect(() => {
        if(deletedId && !modal.isOpen && modal.isOkClicked){  //Se seleccionó el botón de aceptar en el modal
            eliminarCategoria(deletedId)
            .then((resp) => toast.success(resp.message))
            .catch((err) => toast.error(err.message))
            .finally(() => listarCategorias())  
        }
        // eslint-disable-next-line
    },[modal.isOpen])


    const handlerBtnNuevoClick = (e) => {
        e.preventDefault()
        navigate(`/admin/categorias/nuevo`)
    }

    const handlerEditarClick = (id) => {
        navigate(`/admin/categorias/${id}`)
    }   

    const handlerInputBuscarChange  = (e) => {
        console.log('Buscar usuario', e.target.value)
    }

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
    if(status.code < 200 || status.code > 299) toast.error(status.message)

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
                handlerBtnNuevoClick={handlerBtnNuevoClick}
                handlerInputBuscarChange={handlerInputBuscarChange}
                handlerEditarClick={handlerEditarClick}
                handlerEliminarClick={handlerEliminarClick}
            />
        </div>
    )
}

export default CategoriasList;