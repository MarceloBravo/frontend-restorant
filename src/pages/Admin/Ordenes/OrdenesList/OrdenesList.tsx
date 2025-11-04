import { useMesas } from '../../../../Hooks/useMesas'
import CardMesa from '../../../../components/CardMesa/CardMesa'
import useOrdenesList from './useOrdenesList'
import { Icon } from 'semantic-ui-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './OrdenesList.scss'


const OrdenesList = () => {
  const [ autoRefresh, setAutoRefresh ] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const REFRESHTIME_5MIN = 150000;
  const { handlerEditarClick } = useOrdenesList()
  const refreshButton = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { listar: listarMesas } = useMesas()

  // Función para refrescar de forma segura
  const safeRefresh = useCallback(() => {
    if (refreshButton.current) {
      refreshButton.current.click();
    }
  }, []);

  useEffect(() => {
    // Siempre limpiar el intervalo existente primero para evitar acumular intervalos 
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Solo crear nuevo intervalo si autoRefresh está activo
    if (autoRefresh) {
      intervalRef.current = setInterval(safeRefresh, REFRESHTIME_5MIN);
    }

    // Cleanup al desmontar o cuando autoRefresh cambie
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, safeRefresh])
  

  const handleRefresh = () => {
    console.log('Refrescando...')
    listarMesas.refetch();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  }

  const handleAutoRefresh = () => {
    if(!autoRefresh){
      refreshButton.current?.click()
    }
    setAutoRefresh(prev => !prev);
  }


  //console.log(listarMesas.data)

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
