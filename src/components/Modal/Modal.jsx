import { useDispatch, useSelector } from 'react-redux'
import { closeModal, acpetarModal } from '../../store/slices/ModalSlices'
import { useEffect, useState } from 'react'
import './Modal.scss'

export const Modal = () => {
    const [ titulo, setTitulo ] = useState('')
    const [ mensaje, setMensaje ] = useState('')
    const [ btnCancelarText, setBtnCancelarText ] = useState('Cancelar')
    const [ btnAceptarText, setBtnAceptarText ] = useState('Aceptar')
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!modal.isOpen)return
        setTitulo(modal.title)
        setMensaje(modal.message)
        setBtnCancelarText(modal.btnCancelarText ?? 'Cancelar')
        setBtnAceptarText(modal.btnAceptarText ?? 'Aceptar')
    },[modal])

    const handlerCloseModalClick = () => {
        dispatch(closeModal())          
    }
    
    const handlerAceptarModalClick = () => {
        dispatch(acpetarModal())
    }


  return (
    <>
    {
    modal.isOpen && <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                {titulo && <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{titulo}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handlerCloseModalClick}>
                    <span >&times;</span>
                    </button>
                </div>}
                <div className="modal-body">
                    {mensaje ?? ''}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handlerCloseModalClick}>{btnCancelarText ?? 'Cancelar'}</button>
                    <button type="button" className="btn btn-primary" onClick={handlerAceptarModalClick}>{btnAceptarText ?? 'Aceptar'}</button>
                </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}