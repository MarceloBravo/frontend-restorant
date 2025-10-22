import { useDispatch, useSelector } from 'react-redux'
import { closeModal, acpetarModal } from '../../store/slices/ModalSlices'
import { useEffect, useState } from 'react'
import ModalInterface from '../../interfaces/ModalInterface'

/**
 * Hook de lógica para un componente Modal.
 * Obtiene el estado del modal (título, mensaje, etc.) desde el store de Redux
 * y proporciona manejadores para las acciones de aceptar o cerrar el modal.
 * @returns {ModalInterface} - Objeto con el estado del modal y las funciones para interactuar con él.
 */
export const ModalLogic = ():ModalInterface => {
    const [ titulo, setTitulo ] = useState('')
    const [ mensaje, setMensaje ] = useState('')
    const [ btnCancelarText, setBtnCancelarText ] = useState('Cancelar')
    const [ btnAceptarText, setBtnAceptarText ] = useState('Aceptar')
    const modal = useSelector<unknown, any>((state: any)=> state.modal)
    const dispatch = useDispatch()

    /**
     * Efecto que se ejecuta cuando cambia el estado del modal en Redux.
     * Sincroniza el estado del store de Redux (título, mensaje, etc.) con el
     * estado local de este hook, estableciendo valores por defecto para el texto de los botones.
     */
    useEffect(() => {
        if(!modal.isOpen)return
        setTitulo(modal.title)
        setMensaje(modal.message)
        setBtnCancelarText(modal.btnCancelarText ?? 'Cancelar')
        setBtnAceptarText(modal.btnAceptarText ?? 'Aceptar')
    },[modal])

    /**
     * Manejador para el evento de cierre del modal.
     * Despacha la acción `closeModal` de Redux.
     */
    const handlerCloseModalClick = ():void => {
        dispatch(closeModal())          
    }
    
    /**
     * Manejador para el evento de aceptación del modal.
     * Despacha la acción `acpetarModal` de Redux.
     */
    const handlerAceptarModalClick = ():void => {
        dispatch(acpetarModal())
    }


  return (
    {
        titulo,
        mensaje,
        btnCancelarText,    
        btnAceptarText,
        modal,
        handlerCloseModalClick,
        handlerAceptarModalClick
    }
  )
}