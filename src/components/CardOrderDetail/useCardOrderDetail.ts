import { useEffect, useState } from 'react'
import { UseOrders } from '../../Hooks/UseOrders';
import { OrdersClass } from '../../class/OrdersClass';
import { status_enum } from '../../shared/enums';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../store/slices/ModalSlices';
import { toast } from 'react-toastify';

export const useCardOrderDetail = (orden: OrdersClass) => {
    const [ order, setOrder ] = useState(orden);
    const { actualizar, listar, eliminar } = UseOrders(null, '', true);
    const modalState = useSelector((state: any) => state.modal);
    const dispatch = useDispatch();
    const [isWaitingForConfirmation, setWaitingForConfirmation] = useState(false);
    const [ accion, setAccion ] = useState<string>('');



    useEffect(()=> {
        if(!isWaitingForConfirmation){
            return;
        }
        if(accion === 'deliver'){
            if(modalState.isOkClicked){
                actualizar.mutate(order);
            }else if(modalState.isOkClicked === false){
                setOrder({...order, status: status_enum.PENDING});
            }
            if(modalState.isOkClicked !== null){
                setWaitingForConfirmation(false);
                dispatch(closeModal()); // Reset modal state
            }
        }
        if(accion === 'delete' && modalState.isOkClicked){
            eliminar.mutate(order.id);
        }
        // eslint-disable-next-line
    }, [modalState.isOkClicked])


    useEffect(()=> {
        if (actualizar.isSuccess) {
            toast.success('Pedido entregado');
            listar.refetch();
            actualizar.reset();
        } else if (actualizar.error) {
            toast.error('Error al entregar el pedido');
            actualizar.reset();
        }
        // eslint-disable-next-line
    },[actualizar.error, actualizar.isSuccess])


    const handleBtnDeliveredOrder = () => {
        if(order.status !== status_enum.PENDING){
            toast.info('El pedido no está pendiente');
            return;
        }
        setOrder({...order, status: status_enum.DELIVERED});
        setWaitingForConfirmation(true);
        dispatch(openModal({
            isOpen: true,
            title: 'Entregar pedido',
            message: '¿Desea entregar el pedido?',
            btnAceptarText: 'Si, entregar pedido',
            btnCancelarText: 'Cancelar',
        }));
        setAccion('deliver');
    }

    const handleBtnDeleteOrder = () => {
        if(order.status !== status_enum.PENDING){
            toast.info('El pedido no está pendiente');
            return;
        }
        setWaitingForConfirmation(true);
        dispatch(openModal({
            isOpen: true,
            title: 'Cancelar pedido',
            message: '¿Desea eliminar el pedido?',
            btnAceptarText: 'Si, eliminar pedido',
            btnCancelarText: 'Cancelar',
        }));
        setAccion('delete');
    }

  return {
    handleBtnDeliveredOrder,
    handleBtnDeleteOrder
  }
}
