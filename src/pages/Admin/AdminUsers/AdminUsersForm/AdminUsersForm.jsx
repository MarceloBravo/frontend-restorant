import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUserById, saveUser } from '../../../../axios/users'
import { getLocalStorage } from '../../../../shared/storage'
import { clearError } from '../../../../store/slices/statusSlice'
import { toast } from 'react-toastify'

import './AdminUsersForm.scss'

const AdminUsersForm = () => {
    const param = useParams()
    const id = param.id ? param.id : null
    const [ accion, setAccion ] = useState(null)
    const [ formData, setFormData ] = React.useState({
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

    
    const handlerInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({
            ...formData,
            [e.target.id]: value
        })
    }

    const handlerCancelarClick = () => {
        navigate('/admin/users')
    }

    const handlerGrabarClick = () => {
        setAccion(id ? 'Editar' : 'Nuevo')
        // Validar datos
        if(!validaDatos()) return
        // Grabar datos
        dispatch(saveUser(formData, access))
    }

    const handlerEliminarClick = () => {
        setAccion('Eliminar')
        // Eliminar usuario
        dispatch(deleteUser(id, access))
    }

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
    <div className='form-page'>
        <div className='admin-users-form'>
            <h1>Mantenedor de usuarios</h1>
        </div>
        <div className='admin-users-form-container'>
            <div className="mb-3 row">
                <label htmlFor="first_name" className="col-sm-3 col-form-label">Nombre</label>
                <div className="col-sm-9">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="first_name" 
                        onChange={e => handlerInputChange(e)}
                        value={formData.first_name}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="last_name" className="col-sm-3 col-form-label">Apellido</label>
                <div className="col-sm-9">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="last_name" 
                        onChange={e => handlerInputChange(e)}
                        value={formData.last_name}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-3 col-form-label">Nombre de usuario</label>
                <div className="col-sm-9">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        onChange={e => handlerInputChange(e)}
                        value={formData.username}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                <div className="col-sm-9">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        onChange={e => handlerInputChange(e)}
                        value={formData.password}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        onChange={e => handlerInputChange(e)}
                        value={formData.email}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="is_active" className="col-sm-3 col-form-label">Activo</label>
                <div className="col-sm-9">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        onChange={e => handlerInputChange(e)}
                        id="is_active" 
                        value={formData.is_active}
                        checked={Boolean(formData.is_active)}/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="is_staff" className="col-sm-3 col-form-label">Es staff</label>
                <div className="col-sm-9">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        onChange={e => handlerInputChange(e)}
                        id="is_staff" 
                        value={formData.is_staff}
                        checked={Boolean(formData.is_staff)}/>
                </div>
            </div>
            <div className="btn-container">
                <button type="button" className="btn btn-primary" onClick={handlerGrabarClick}>Guardar</button>
                <button type="button" className="btn btn-danger" disabled={!id} onClick={handlerEliminarClick}>Eliminar</button>
                <button type="button" className="btn btn-success" onClick={handlerCancelarClick}>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default AdminUsersForm;