import { Grid } from '../../../../components/Grid'
import AdminUsersListLogic from './AdminUsersListLogic'

import './AdminUsersList.scss'

const AdminUsersList = () => {
    const { textoBuscado,
            users,
            handlerInputBuscarChange,
            handlerBtnNuevoClick,
            handlerEditarClick,
            handlerEliminarClick,
            handlerInputBuscarKeyDown } = AdminUsersListLogic()

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
            handlerInputBuscarKeyDown={handlerInputBuscarKeyDown}
          />
          
        </div>
  )
}

export default AdminUsersList;
