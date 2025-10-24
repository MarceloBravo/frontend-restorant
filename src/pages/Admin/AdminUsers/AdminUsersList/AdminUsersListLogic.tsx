import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../../../axios/users'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../../../../shared/storage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetUser } from '../../../../store/slices/usersSlices'
import { openModal } from '../../../../store/slices/ModalSlices'
import { AdminUserListLogicInterface } from '../../../../interfaces/AdminUserListLogicInterface'

/**
 * Lógica del listado de usuarios para el panel de administración.
 * Se encarga de la carga, filtrado y eliminación de usuarios.
 * @returns {AdminUserListLogicInterface} - Funciones y estado para el listado de usuarios.
 */
const AdminUsersListLogic = (): AdminUserListLogicInterface => {
  const [ textoBuscado, setTextoBuscado ] = useState('')
  const [ eliminado, setEliminado ] = useState(false)
  const [users, setUsers] = useState([])
  const [ deleteId, setDeleteId ] = useState<number | null>(null)
  const data = useSelector((state: any) => state.users.users)
  const status = useSelector((state: any) => state.status)
  const modal = useSelector((state: any) => state.modal)
  const access: string | null = getLocalStorage('access')
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  
  

  useEffect(()=>{
    if(!access)return
      dispatch(getUsers(access))
      // eslint-disable-next-line
  },[access])

  
  useEffect(()=> {
    setUsers(data ?? [])
  },[data])
  

  /**
   * Efecto para manejar el resultado de las operaciones (especialmente la eliminación).
   * Se activa cuando el estado `status` de Redux cambia.
   * Si una eliminación fue exitosa (indicado por el flag `eliminado` y el status code 204),
   * muestra una notificación y vuelve a cargar la lista de usuarios para reflejar el cambio.
   * También maneja notificaciones de éxito/error para otras operaciones.
   */
  useEffect(() => {
    if(!status)return
    if(eliminado && status.code === 204){
      toast.success('Usuario eliminado con éxito')
      dispatch(getUsers(getLocalStorage('access')))
      setEliminado(false)
    }else if(status.message !== null ) {
      if(status.code >= 200 && status.code < 300){
        toast.success(status.message)
      }else{
        toast.error(status.message)
      }
    }
    // eslint-disable-next-line
  },[status?.code, eliminado])

  
  /**
   * Efecto que se activa tras la confirmación en el modal de eliminación.
   * Cuando el usuario hace clic en 'Aceptar' en el modal (`modal.isOkClicked`),
   * este hook despacha la acción `deleteUser` e inmediatamente establece el flag `eliminado` a `true`.
   * Este flag es utilizado por el `useEffect` anterior para manejar el resultado y mostrar la notificación final.
   */
  useEffect(() => {
    if(modal.isOkClicked && deleteId && access){  //Se seleccionó el botón de aceptar en el modal
      dispatch(deleteUser(deleteId, access))
      setEliminado(true)
      setDeleteId(null)
    }
    // eslint-disable-next-line
  },[modal])


  /**
   * Maneja el click en el botón de nuevo usuario.
   * Redirige al formulario de nuevo usuario.
   * @param {React.MouseEvent<HTMLButtonElement>} e - Evento del botón.
   */
  const handlerBtnNuevoClick = (): void => {
    dispatch(resetUser())
    navigate('/admin/users/nuevo')
  }


  /**
   * Maneja el click en el botón de editar usuario.
   * Redirige al formulario de edición de usuario.
   * @param {number} id - Id del usuario a editar.
   */
  const handlerEditarClick = (id: number): void => {
    navigate(`/admin/users/${id}`)
  }

  /**
   * Maneja el click en el botón de eliminar usuario.
   * Abre el modal de confirmación para eliminar el usuario.
   * @param {number} id - Id del usuario a eliminar.
   */
  const handlerEliminarClick = (id: number): void => {
    dispatch(openModal({
      title: 'Eliminar usuario', 
      message: '¿Está seguro que desea eliminar este usuario?', 
      btnAceptarText: 'Eliminar', 
      isOpen: true
    }))
    setDeleteId(id)
  }

  /**
   * Maneja el cambio en el input de búsqueda.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento del input.
   */
  const handlerInputBuscarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setTextoBuscado(e.target.value)
  }

  /**
   * Maneja el keydown en el input de búsqueda.
   * Si la tecla es Enter, realiza la búsqueda.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Evento del input.
   */
  const  handlerInputBuscarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
   if(e.key === 'Enter'){
         dispatch(getUsers(getLocalStorage('access'), textoBuscado))
    } 
  }

  return (
    {
      users,
      textoBuscado,
      handlerBtnNuevoClick,
      handlerInputBuscarChange,
      handlerEditarClick,
      handlerEliminarClick,
      handlerInputBuscarKeyDown
    }
  )
}

export default AdminUsersListLogic;