import { CardOrderDetail } from '../../../../components/CardOrderDetail/CardOrderDetail';
import { ModalAgregarOrden } from '../../../../components/ModalAgregarOrden/ModalAgregarOrden';
import { useOrdenesDetail } from './useOrdenesDetail';
import './OrdenesDetail.scss';

export const OrdenesDetail: React.FC = (): React.ReactElement => {
    const {
        mesa,
        orders,
        isVisible,
        optionsSelect,
        setSelectedProducts,
        setIsVisible,
        handleBtnNuevaOrden,
    } = useOrdenesDetail();

  return (
    <div className="order-detail-container">
        <div className="order-detail-header">
            <h1>Mesa { mesa?.number ?? ''} </h1>

            <button className="btn btn-success" onClick={handleBtnNuevaOrden}>Agregar orden</button>
        </div>
        {orders && orders.length > 0 && orders.map((order: any) =>
            <CardOrderDetail key={order.id} order={order}/>
        )}
        <ModalAgregarOrden 
            title={'Agregar orden'} 
            isVisible={isVisible} 
            setIsVisible={setIsVisible}
            optionsSelect={optionsSelect}
            setSelectedProducts={setSelectedProducts}
        />
    </div>
  )
}
