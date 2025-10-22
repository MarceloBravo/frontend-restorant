import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUserById, saveUser } from '../../../../axios/users'
import { getLocalStorage } from '../../../../shared/storage'
import { clearError } from '../../../../store/slices/statusSlice'
import { toast } from 'react-toastify'
import { openModal } from '../../../../store/slices/ModalSlices'

/**
 * Lógica del formulario de usuarios para el panel de administración.
 * Se encarga de la carga, guardado y eliminación de usuarios.
 * @returns {object} - Funciones y estado para el formulario de usuarios.
 */
const AdminUsersFormLogic = () => {
    const param = useParams()
    const id = param.id ? param.id : null
    const [ accion, setAccion ] = useState(null)
    const [ formData, setFormData ] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        is_active: false,
        is_staff: false,
    })
    const access = getLocalStorage('access')
    const user = useSelector(state => state.users.user)
    const status = useSelector(state => state.status)
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    dispatch(clearError())
    
    useEffect(() => {   
        if(id) {
            dispatch(getUserById(id, access))
        }
    }, [id])


    useEffect(() => {
        if(user) {
            setFormData(user)
        }
    }, [user])



    /**
     * Efecto para manejar los resultados de las operaciones CRUD (guardar, eliminar).
     * Se activa cuando el estado `status` de Redux cambia.
     * Muestra una notificación (toast) de éxito o error y, en caso de éxito,
     * redirige al usuario al listado de usuarios.
     */
    useEffect(() => {
        if(status.code !== null &&status?.message === null){            
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
        
    }, [ status])


    /**
     * Lectura de la opción seleccionada en el modal
     * Obtiene la opción seleccionada por el usuario en el modal de eliminación (Cancelar o Eliminar) 
     * y ejecuta la acción correspondiente
     */
    useEffect(() => {
        if(modal.isOkClicked){  //Se seleccionó el botón de aceptar en el modal
            if(accion === 'Nuevo' || accion === 'Editar'){
                // Grabar datos
                dispatch(saveUser(formData, access))
            }else if(accion === 'Eliminar'){
                // Eliminar usuario
                dispatch(deleteUser(id, access))
            }
        }
    },[modal])

    
    /**
     * Maneja el cambio en los inputs del formulario.
     * @param {object} e - Evento del input.
     */
    const handlerInputChange = (e) => {
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
    const handlerCancelarClick = () => {
        navigate('/admin/users')
    }

    /**
     * Maneja el click en el botón de grabar.
     * Valida los datos y abre el modal de confirmación.
     */
    const handlerGrabarClick = () => {
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
    const handlerEliminarClick = () => {
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