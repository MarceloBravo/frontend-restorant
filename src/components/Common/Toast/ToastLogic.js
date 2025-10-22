import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { closeToast } from '../../../store/slices/toastSlice.js'
import './toast.scss'

/**
 * Lógica para un componente Toast que muestra mensajes desde el store de Redux.
 * El toast se cerrará automáticamente después de 5 segundos.
 * @param {object} props - Propiedades para el toast.
 * @param {string} props.mensaje - El mensaje a mostrar en el toast.
 * @param {string} props.titulo - El título del toast.
 * @param {string} props.info - Información adicional para el toast.
 * @param {string} props.id - El ID único del toast.
 * @param {string} props.tipo - El tipo de toast (e.g., 'success', 'error').
 * @returns {{mensaje: string, titulo: string, info: string, id: string, tipo: string, close: function}} - Objeto con los datos del toast y una función para cerrarlo.
 */
export const ToastLogic = (props) => {
    const {mensaje, titulo, info, id, tipo} = props
    const dispatch = useDispatch()
    const autoCloseTime = 5000; // 5 seconds

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(closeToast({id}))
        }, autoCloseTime);

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line
    },[dispatch, id]);


    /**
     * Despacha la acción para cerrar un toast.
     * @param {string} id - El ID del toast a cerrar.
     */
    const close = (id) => {
        dispatch(closeToast({id}))
    }

    return (
        {
            mensaje,
            titulo,
            info,
            id,
            tipo,
            close
        } 
    )
}