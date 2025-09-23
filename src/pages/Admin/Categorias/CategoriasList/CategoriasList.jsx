import { use, useEffect, useState } from 'react'
import { Grid } from '../../../../components/Grid'
import { useCategorias } from '../../../../Hooks/useCategorias'
import { Loader } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { openModal } from '../../../../store/slices/ModalSlices'
import { useDispatch } from 'react-redux'

import './CategoriasList.scss'
import { useNavigate } from 'react-router-dom'


const CategoriasList = () => {
    const [ deletedId, setDeleteId ] = useState(null)
    const { loading, categorias, status, listarCategorias, eliminarCategorias } = useCategorias();
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => { 
        listarCategorias()
    }, [])

    useEffect(() => {
        if(!modal.isOpen && modal.isOkClicked){  //Se seleccionó el botón de aceptar en el modal
            eliminarCategorias(deletedId)
        }
    },[modal.isOpen])


    const handlerBtnNuevoClick = (e) => {
        e.preventDefault()
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
                headers={['Nombre', 'Descripción', 'imágen', 'Fecha creación', 'Fecha modificación']} 
                fields={['name', 'description', 'image', 'created_at', 'updated_at']} 
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