import ModalSlicesInterface from "./slices/ModalSlicesInterface";

export default interface ModalInterface {
    titulo: string, 
    mensaje: string, 
    btnCancelarText: string, 
    btnAceptarText: string, 
    modal: ModalSlicesInterface, 
    handlerCloseModalClick: () => void,
    handlerAceptarModalClick: () => void
}