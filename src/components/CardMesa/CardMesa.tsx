
import MesaRestorant2 from '../../assets/png/MesaRestorant2.png'
import { UseCardMesa } from './UseCardMesa'
import './CardMesa.scss'

interface CardMesaProps {
  item: any;
  handlerEditarClick: (id: number) => void;
}

const CardMesa: React.FC<CardMesaProps> = ({ item, handlerEditarClick }) => {
    const { imgMesaId, info } = UseCardMesa({ item });
    

  return (
    <div key={item.id} className="table-item" title="Click para ver los detalles" onClick={() => handlerEditarClick(parseInt(item.id))}>
        <div className="table-info">
            <label htmlFor={imgMesaId}>Mesa {item?.number ?? 'sin número'}</label>
        </div>
        <img id={imgMesaId} src={MesaRestorant2} alt="mesa1" className='img-table'/>
        <div className="table-group-info">
            {info && info.pending > 0 && (
                <label className="orders-count-pending" title='Ordenes Pendientes'>{info.pending}</label>
            )}
            {info && info.delivered > 0 && (
                <label className="orders-count-delivered" title='Ordenes entregados'>{info.delivered}</label>
            )}
            {info && info.canceled > 0 && (
                <label className="orders-count-canceled" title='Ordenes cancelados'>{info.canceled}</label>
            )}
        </div>
    </div>
  )
}

export default CardMesa
