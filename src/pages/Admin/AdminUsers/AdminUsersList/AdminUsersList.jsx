import { useEffect, useState } from 'react'
import { getUsers } from '../../../../axios/users'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../../../../shared/storage'
import { Grid } from '../../../../components/Grid'
import './AdminUsersList.scss'

export const AdminUsersList = () => {
  const[ textoBuscado, setTextoBuscado ] = useState('')
  const [users, setUsers] = useState([])
  const data = useSelector(state => state.users)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getUsers(getLocalStorage('access')))
  },[dispatch])

  useEffect(()=> {
    setUsers(data.users ?? [])
  },[data.users])

  const handlerBtnNuevoClick = (e) => {
    e.preventDefault()
    console.log('Nuevo usuario')
  }

  const handlerEditarClick = (id) => {
    console.log('Editar usuario', id)
  }

  const handlerEliminarClick = (id) => {
    console.log('Eliminar usuario', id)
  }

  const handlerInputBuscarChange = (e) => {
    console.log('Buscar usuario', e.target.value)
  }



  return (
        <div className="main-container">
          <div>Este es AdminUsersList</div>
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
