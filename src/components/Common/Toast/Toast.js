import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { closeToast } from '../../../store/slices/toastSlice.js'
import './toast.scss'

/**
 * Un componente Toast que muestra mensajes desde el store de Redux.
 * El toast se cerrará automáticamente después de 10 segundos.
 * @returns {JSX.Element} El componente Toast.
 */
export const Toast = (props) => {
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


    const close = (id) => {
        dispatch(closeToast({id}))
    }

    return (
        <>
        {mensaje?.length > 0 && 
            <div aria-live="polite" aria-atomic="true" className="position-relative bd-example-toasts">
                <div className={"toast-progress-bar "  + (tipo ?? 'bk-info')}></div>
                <div className="toast-single-container" id="toastPlacement">
                    <div className={"toast-display display " + (tipo ?? 'bk-info')}>
                        <div className={"toast-header " + (tipo ?? 'bk-success')}>

                            <svg fill="#000000" width="32px" height="32px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.43200000000000005"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <title>info-circle-line</title> 
                                    <circle className="clr-i-outline clr-i-outline-path-1" cx="17.93" cy="11.9" r="1.4"></circle>
                                    <path className="clr-i-outline clr-i-outline-path-2" d="M21,23H19V15H16a1,1,0,0,0,0,2h1v6H15a1,1,0,1,0,0,2h6a1,1,0,0,0,0-2Z"></path>
                                    <path className="clr-i-outline clr-i-outline-path-3" d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm0,22A10,10,0,1,1,28,18,10,10,0,0,1,18,28Z"></path> 
                                    <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> 
                                </g>
                            </svg>

                            <strong className="me-auto">{titulo}</strong>
                            {info && <small>{info}</small>}
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => close(id)}></button>
                        </div>
                        <div className="toast-body">
                            {mensaje}
                        </div>
                    </div>
                </div>
            </div>
            }
        </> 
    )
}