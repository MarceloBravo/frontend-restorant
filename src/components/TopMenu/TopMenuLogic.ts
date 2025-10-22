import { useDispatch } from 'react-redux'
import { useUserSession } from '../../Hooks'
import { logOut } from '../../store/slices/loginSlices'
import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from '../../shared/storage'
import { useEffect, useState } from 'react'
import TopMenuInterface from '../../interfaces/Components/TopMenuInterface'
import { UserClass } from '../../class/UserClass'

/**
 * Hook de lógica para el componente del menú superior (TopMenu).
 * Se encarga de obtener el nombre de usuario a mostrar y de gestionar el cierre de sesión.
 * @returns {TopMenuInterface} - Objeto que contiene el nombre de usuario formateado y el manejador para el evento de cierre de sesión.
 */
export const TopMenuLogic = (): TopMenuInterface => {
    const [ user, setUser ] = useState<UserClass | string>('')
    const { userData } = useUserSession()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /**
     * Efecto que se ejecuta cuando cambian los datos del usuario.
     * Formatea el nombre del usuario para mostrarlo en el menú,
     * usando el nombre y apellido si están disponibles, o el email como alternativa.
     */
    useEffect(() => {
        if(userData && userData?.first_name && userData?.last_name){
            setUser(userData.first_name + ' ' + userData.last_name)
        }else if(userData && userData?.email){
            setUser(userData.email)
        }else{
            setUser('')
        }
    },[userData])
    
    /**
     * Manejador para el evento de click en el botón de salir/logout.
     * Despacha la acción de logout, limpia el almacenamiento local y
     * redirige al usuario a la página de login.
     */
    const handlerExitClick = (): void => {
        dispatch(logOut())
        clearLocalStorage()
        navigate('/admin/login')
    }

    
  return (
    {
        user,
        handlerExitClick
    }
  )
}
