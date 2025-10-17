import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../../../axios/users'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../../../../shared/storage'
import { Grid } from '../../../../components/Grid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetUser } from '../../../../store/slices/usersSlices'
import { openModal } from '../../../../store/slices/ModalSlices'

import './AdminUsersList.scss'

const AdminUsersList = () => {
  const [ textoBuscado, setTextoBuscado ] = useState('')
  const [ eliminado, setEliminado ] = useState(false)
  const [users, setUsers] = useState([])
  const [ deleteId, setDeleteId ] = useState(null)
  const data = useSelector(state => state.users.users)
  const status = useSelector(state => state.status)
  const modal = useSelector(state => state.modal)
  const access = getLocalStorage('access')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  

  useEffect(()=>{
    if(!access)return
      dispatch(getUsers(access))
      // eslint-disable-next-line
  },[access])

  
  useEffect(()=> {
    setUsers(data ?? [])
  },[data])
  

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

  
  useEffect(() => {
    if(modal.isOkClicked && deleteId){  //Se seleccionó el botón de aceptar en el modal
      dispatch(deleteUser(deleteId, access))
      setEliminado(true)
      setDeleteId(null)
    }
    // eslint-disable-next-line
  },[modal])


  const handlerBtnNuevoClick = (e) => {
    e.preventDefault()
    dispatch(resetUser())
    navigate('/admin/users/nuevo')
  }


  const handlerEditarClick = (id) => {
    navigate(`/admin/users/${id}`)
  }

  const handlerEliminarClick = (id) => {
    dispatch(openModal({
      title: 'Eliminar usuario', 
      message: '¿Está seguro que desea eliminar este usuario?', 
      btnAceptarText: 'Eliminar', 
      isOpen: true
    }))
    setDeleteId(id)
  }

  const handlerInputBuscarChange = (e) => {
    e.preventDefault();
    setTextoBuscado(e.target.value)
    if(e.key === 'Enter'){
      console.log('Buscando...', textoBuscado)
         dispatch(getUsers(getLocalStorage('access'), textoBuscado))
    }
  }

  return (
        <div className="main-container">
          <h1>Listado de usuarios</h1>
          <Grid 
            data={users} 
            searchValue={textoBuscado} 
            headers={['ID', 'Nombre', 'Apellido', 'Usuario', 'Email', 'Activo', 'Staff']} 
            fields={['id', 'first_name', 'last_name', 'username', 'email', 'is_active', 'is_staff']} 
            btnText={"Nuevo Usuario"}
            placeholderText={"Buscar usuario..."}
            handlerBtnNuevoClick={handlerBtnNuevoClick}
            handlerInputBuscarChange={handlerInputBuscarChange}
            handlerEditarClick={handlerEditarClick}
            handlerEliminarClick={handlerEliminarClick}
          />
          
        </div>
  )
}

export default AdminUsersList;
