import { formatDate } from '../../shared/functions';
import { status_enum } from '../../shared/enums';
import { useCardOrderDetail } from './useCardOrderDetail';
import './CardOrderDetail.scss';

export const CardOrderDetail = (props: any) => {
  const { order } = props;
  const { handleBtnDeliveredOrder } = useCardOrderDetail(order);

  return (
    <div key={order.id} className={'card-order-detail order_' + order.status}>
        <div className="orden-detail">
          <img className="img-producto" src={order.product_data?.image} alt={order.product_data?.title} />
          <div className="info-order">
            <div className="time-order">{formatDate(order.created_at,'date-dmah')}</div>
            <div className="title-order">{order.product_data?.title}</div>
            <div>$ {order.product_data?.price} x {order.quantity} = $ {order.total}</div>
          </div>
          {order.status === status_enum.PENDING && <button className='btn btn-primary custom_pending_button' onClick={handleBtnDeliveredOrder}>Entregar pedido</button>}
          {order.status === status_enum.DELIVERED && <div className="custom_pending_button order_detail_status">Entregado</div>}
        </div>
    </div>
  )
}