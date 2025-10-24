import { Grid } from '../../../../components/Grid'
import { Loader } from 'semantic-ui-react'
import CategoriasListLogic from './CategoriasListLogic'

const CategoriasList: React.FC = () => {
    
    const { loading,
            categorias,
            searchTerm,
            handlerBtnNuevoClick,
            handlerEditarClick,
            handlerInputBuscarChange,
            handlerInputBuscarKeyDown,
            handlerEliminarClick } = CategoriasListLogic();

    if(loading) return (<Loader active inline='centered'>Cargando ...</Loader>)

    return (
        <div className="main-container">
            <h1>Categorias de productos</h1>
            <Grid 
                data={categorias} 
                headers={['ID', 'Nombre', 'Descripción', 'imágen', 'Fecha creación', 'Fecha modificación']} 
                fields={['id','name', 'description', 'image', 'created_at', 'updated_at']} 
                types={['number', 'text', 'text', 'image', 'date-dma', 'date-dma']}
                btnText={"Nueva categoría"}
                placeholderText={"Buscar categoría..."}
                searchValue={searchTerm}
                handlerBtnNuevoClick={handlerBtnNuevoClick}
                handlerInputBuscarChange={handlerInputBuscarChange}
                handlerEditarClick={handlerEditarClick}
                handlerEliminarClick={handlerEliminarClick}
                handlerInputBuscarKeyDown={handlerInputBuscarKeyDown}
            />
        </div>
    )
}

export default CategoriasList;