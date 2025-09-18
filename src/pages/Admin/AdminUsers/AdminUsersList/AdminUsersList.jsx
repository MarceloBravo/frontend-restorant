import { useEffect, useState } from 'react'
import { getUsers } from '../../../../axios/users'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../../../../shared/storage'
import './AdminUsersList.scss'

export const AdminUsersList = () => {
  const [users, setUsers] = useState([])
  const data = useSelector(state => state.users)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getUsers(getLocalStorage('access')))
  },[dispatch])

  useEffect(()=> {
    setUsers(data.users ?? [])
  },[data.users])


  return (
        <div className="main-container">
          <div>Este es AdminUsersList</div>

          <table className='table table-users'>
            <thead>
              <tr>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
              </tr>
          </thead>
          <tbody>
          {users.length > 0 && data.users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>  
              <td>{user.last_name}</td>
            </tr>
          ))}
          </tbody>
          </table>
        </div>
  )
}
