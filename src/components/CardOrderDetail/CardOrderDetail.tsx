import { formatDate } from '../../shared/functions';
import './CardOrderDetail.scss'

export const CardOrderDetail = (props: any) => {
    const { order } = props;

  return (
    <div key={order.id} className="card-order-detail">
        <div className="orden-detail">
          <img className="img-producto" src={order.products?.image} alt={order.products?.title} />
          <div>
            <div className="time-order">{formatDate(order.created_at,'date-dmah')}</div>
            <div>{order.status}</div>
            <div>{order.total}</div>
            <div>{order.products?.id}</div>
            <div>{order.products?.price}</div>
            <div>{order.products?.title}</div>
          </div>
        </div>
    </div>
  )
}