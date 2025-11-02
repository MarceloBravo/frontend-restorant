import { useMesas } from '../../../../Hooks/useMesas'
import CardMesa from '../../../../components/CardMesa/CardMesa'
import useOrdenesList from './useOrdenesList'
import './OrdenesList.scss'


const OrdenesList = () => {
  const { handlerEditarClick } = useOrdenesList()

  const { listar: listarMesas } = useMesas()


  console.log(listarMesas.data)

  return (
    <div className="main-container">
        <h1>Pedidos</h1>
        {listarMesas?.isLoading && <p>Cargando...</p>}
        <div className="table-container">
          {listarMesas.data?.data.length > 0 && listarMesas.data.data.map((item: any, index: number) => 
            <CardMesa key={item.id} item={item} handlerEditarClick={handlerEditarClick}/>
          )}
        </div>
    </div>
  )
}

export default OrdenesList
