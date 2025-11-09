import CardMesa from '../../../../components/CardMesa/CardMesa'
import useOrdenesList from './useOrdenesList'
import { Icon } from 'semantic-ui-react'
import './OrdenesList.scss'


const OrdenesList: React.FC = (): React.ReactElement => {
  const { 
    autoRefresh,
    refreshButton,
    isRefreshing,
    listarMesas,
    handleRefresh,
    handleAutoRefresh,
    handlerEditarClick 
  } = useOrdenesList()

  return (
    <div className="main-container">
          <h1>Pedidos</h1> 
        <div className="pedidos-top-menu">
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Autorefresh</label>
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={autoRefresh}
              onChange={handleAutoRefresh}
            />
          </div>
          <div ref={refreshButton} className={`refresh-orders ${isRefreshing ? 'refreshing' : ''}`} onClick={handleRefresh}><Icon name="refresh"></Icon></div>
        </div>
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
