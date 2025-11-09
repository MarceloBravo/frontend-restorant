import { Grid } from '../../../../components/Grid'
import { useProductosListLogic } from './useProductosListLogic'


const ProductosList: React.FC = (): React.ReactElement => {
  const { 
    handlerBtnNuevoClick, 
    handlerEditarClick, 
    handlerInputBuscarChange, 
    handlerInputBuscarKeyDown,
    handlerEliminarClick, 
    listar, 
    searchTextTemp
  } = useProductosListLogic();
    
  return (
    <div className="main-container">
        <h1>Productos</h1>
        {listar?.isLoading && <p>Cargando...</p>}
        <Grid 
            data={listar.data?.data || []} 
            headers={['ID', 'Nombre', 'Descripción', 'imágen','Precio','Activo','Categoría', 'Fecha creación', 'Fecha modificación']} 
            fields={['id','title','description','image','price','active','category_name', 'created_at','updated_at']} 
            types={['number', 'text', 'text','image', 'money','boolean','string', 'date-dma', 'date-dma']}
            btnText={"Nuevo producto"}
            placeholderText={"Buscar producto..."}
            searchValue={searchTextTemp}
            handlerBtnNuevoClick={() => handlerBtnNuevoClick(undefined)}
            handlerInputBuscarChange={handlerInputBuscarChange}
            handlerInputBuscarKeyDown={handlerInputBuscarKeyDown}
            handlerEditarClick={handlerEditarClick}
            handlerEliminarClick={handlerEliminarClick}
        />
    </div>
  )
}

export default ProductosList;
