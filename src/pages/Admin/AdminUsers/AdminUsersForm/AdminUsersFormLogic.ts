import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUserById, saveUser } from '../../../../axios/users'
import { getLocalStorage } from '../../../../shared/storage'
import { clearError } from '../../../../store/slices/statusSlice'
import { toast } from 'react-toastify'
import { openModal } from '../../../../store/slices/ModalSlices'
import { UserClass } from '../../../../class/UserClass'

/**
 * Lógica del formulario de usuarios para el panel de administración.
 * Se encarga de la carga, guardado y eliminación de usuarios.
 * @returns {object} - Funciones y estado para el formulario de usuarios.
 */
const AdminUsersFormLogic = () => {
    const param = useParams()
    const id: string | null = param.id ? param.id : null
    const [ accion, setAccion ] = useState<string | null>(null)
    const [ formData, setFormData ] = useState(new UserClass())
    const access: string | null= getLocalStorage('access')
    const user = useSelector((state: any) => state.users.user)
    const status = useSelector((state: any) => state.status)
    const modal = useSelector((state: any) => state.modal)
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    dispatch(clearError())
    
    useEffect(() => {   
        if(id && access) {
            dispatch(getUserById(Number(id), access))
        }
        // eslint-disable-next-line
    }, [id])


    useEffect(() => {
        if(user) {
            setFormData(user)
        }
        // eslint-disable-next-line
    }, [user])



    /**
     * Efecto para manejar los resultados de las operaciones CRUD (guardar, eliminar).
     * Se activa cuando el estado `status` de Redux cambia.
     * Muestra una notificación (toast) de éxito o error y, en caso de éxito,
     * redirige al usuario al listado de usuarios.
     */
    useEffect(() => {
        if(status.code !== null &&status?.message === null && accion){            
            switch(accion){
                case 'Nuevo':
                    toast.success('Usuario creado con éxito')
                    break
                case 'Editar':
                    toast.success('Usuario actualizado con éxito')
                    break
                case 'Eliminar':
                    toast.success('Usuario eliminado con éxito')
                    break
                default:
                    return
            }   
            navigate('/admin/users')

        }else{
            toast.error(status?.message)
        }
        // eslint-disable-next-line
    }, [ status])


    /**
     * Lectura de la opción seleccionada en el modal
     * Obtiene la opción seleccionada por el usuario en el modal de eliminación (Cancelar o Eliminar) 
     * y ejecuta la acción correspondiente
     */
    useEffect(() => {
        if(modal.isOkClicked && access){  //Se seleccionó el botón de aceptar en el modal
            if(accion === 'Nuevo' || accion === 'Editar'){
                // Grabar datos
                dispatch(saveUser(formData, access))
            }else if(accion === 'Eliminar'){
                // Eliminar usuario
                dispatch(deleteUser(Number(id), access))
            }
        }
        // eslint-disable-next-line
    },[modal])

    
    /**
     * Maneja el cambio en los inputs del formulario.
     * @param {object} e - Evento del input.
     */
    const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({
            ...formData,
            [e.target.id]: value
        })
    }

    /**
     * Maneja el click en el botón de cancelar.
     * Redirige al listado de usuarios.
     */
    const handlerCancelarClick = (): void => {
        navigate('/admin/users')
    }

    /**
     * Maneja el click en el botón de grabar.
     * Valida los datos y abre el modal de confirmación.
     */
    const handlerGrabarClick = (): void => {
        // Configura la acción a realizar (nuevo o editar)
        setAccion(id ? 'Editar' : 'Nuevo')
        // Validar datos
        if(!validaDatos()) return
        // Abrir modal
        dispatch(openModal({
            title: accion === 'Nuevo' ? 'Nuevo usuario' : 'Editar usuario', 
            message: accion === 'Nuevo' ? '¿Desea crear el nuevo usuario?' :'¿Está seguro que desea guardar los cambios?', 
            btnAceptarText: 'Guardar', 
            isOpen: true})
        )
    }

    /**
     * Maneja el click en el botón de eliminar.
     * Abre el modal de confirmación para eliminar el usuario.
     */
    const handlerEliminarClick = (): void => {
        setAccion('Eliminar')
        dispatch(openModal({
            title: 'Eliminar usuario', 
            message: '¿Está seguro que desea eliminar este usuario?', 
            btnAceptarText: 'Eliminar', 
            isOpen: true
        }))
    }

    /**
     * Valida los datos del formulario.
     * @returns {boolean} - True si los datos son válidos, false en caso contrario.
     */
    const validaDatos = () => {
        // Validar datos del formulario
        let isValid = true
        if(!formData.first_name) {
            isValid = false
        }
        if(!formData.last_name) {
            isValid = false
        }
        if(!formData.username) {
            isValid = false
        }
        if(!formData.email) {
            isValid = false
        }
        if(!isValid){
            toast.error('Por favor, complete todos los campos obligatorios')
        }
        return isValid
    }


    return (
    {
        handlerInputChange,
        handlerCancelarClick,
        handlerGrabarClick,
        handlerEliminarClick,
        formData,
        id
    }
  )
}

export default AdminUsersFormLogic;