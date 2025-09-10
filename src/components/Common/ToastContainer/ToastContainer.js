import { Toast } from "../Toast/Toast"
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './toastContainer.scss'


export const ToastContainer = () =>  {
    const [ toastArray, setToastArray ] = useState([])
    const toast = useSelector(state => state.toast.toastData)


    /**
     * Establece los valores de los mensajes que se mostrarán en el toast.
     * Obtiene los mensajes desde el store y borra los mensajes cuando el componente se desmonta.
    */
    useEffect(() => {
        console.log(toast)
        setToastArray(toast)   
        // eslint-disable-next-line
    }, [toast])

  return (
    <div className="toast-container">
        {toastArray.map((toast, index) => 
            <Toast key={index} id={toast.id} mensaje={toast.mensaje} titulo={toast.titulo} info={toast.info} tipo={toast.tipo ?? null}/>
        )}
    </div>
  )
}
