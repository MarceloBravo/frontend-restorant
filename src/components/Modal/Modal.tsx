import { ModalLogic } from './ModalLogic';
import { JSX } from 'react'
import './Modal.scss'

export const Modal = ():JSX.Element => {
    const {
        titulo,
        mensaje,
        btnCancelarText,
        btnAceptarText,
        modal,
        handlerCloseModalClick,
        handlerAceptarModalClick
    } = ModalLogic()


  return (
    <>
    {
    modal.isOpen && <div className="modal" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
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