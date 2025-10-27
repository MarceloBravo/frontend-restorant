import { Grid } from '../../../../components'
import MesasListLogic from './MesasListLogic'

const MesasList = () => {
    const { 
        listar, 
        searchTerm,
        handlerBtnNuevoClick, 
        handlerEditarClick, 
        handlerInputBuscarChange, 
        handlerInputBuscarKeyDown, 
        handlerEliminarClick, 
    } = MesasListLogic()

  return (
    <div className="main-container">
        <h1>Productos</h1>
        {listar?.isLoading && <p>Cargando...</p>}
        <Grid 
            data={listar.data?.data || []} 
            headers={['ID', 'Mesa N°', 'Puestos', 'Activa', 'Fecha creación', 'Fecha modificación']} 
            fields={['id','number','capacity','active', 'created_at','updated_at']} 
            types={['number', 'number', 'number','boolean', 'date-dma', 'date-dma']}
            btnText={"Nueva mesa"}
            placeholderText={"Buscar mesa... (mesa y/o puestos)"}
            searchValue={searchTerm}
            handlerBtnNuevoClick={() => handlerBtnNuevoClick()}
            handlerInputBuscarChange={handlerInputBuscarChange}
            handlerInputBuscarKeyDown={handlerInputBuscarKeyDown}
            handlerEditarClick={handlerEditarClick}
            handlerEliminarClick={handlerEliminarClick}
        />
    </div>
  )
}

export default MesasList
