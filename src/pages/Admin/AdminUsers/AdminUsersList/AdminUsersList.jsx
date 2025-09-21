import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../../../axios/users'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../../../../shared/storage'
import { Grid } from '../../../../components/Grid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './AdminUsersList.scss'

const AdminUsersList = () => {
  const [ textoBuscado, setTextoBuscado ] = useState('')
  const [ eliminado, setEliminado ] = useState(false)
  const [users, setUsers] = useState([])
  const data = useSelector(state => state.users.users)
  const status = useSelector(state => state.status)
  const access = getLocalStorage('access')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
      dispatch(getUsers(getLocalStorage('access')))
  },[dispatch])

  
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
      toast.success(status.message)
    }
  },[status?.code, eliminado])

  useEffect(() => {
    console.log('Status -->', status)
  },[status?.code])

  const handlerBtnNuevoClick = (e) => {
    e.preventDefault()
    navigate('/admin/users/nuevo')
  }

  const handlerEditarClick = (id) => {
    navigate(`/admin/users/${id}`)
  }

  const handlerEliminarClick = (id) => {
    dispatch(deleteUser(id, access))
    setEliminado(true)
  }

  const handlerInputBuscarChange = (e) => {
    setTextoBuscado(e.target.value)
    console.log('Buscar usuario', e.target.value)
  }



  return (
        <div className="main-container">
          <h1>Listado de usuarios</h1>
          <Grid 
            data={users} 
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
