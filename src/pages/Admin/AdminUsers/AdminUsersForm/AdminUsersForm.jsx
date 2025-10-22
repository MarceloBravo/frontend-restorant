import AdminUsersFormLogic from './AdminUsersFormLogic'

import './AdminUsersForm.scss'

const AdminUsersForm = () => {
    const { handlerInputChange,
            handlerCancelarClick,
            handlerGrabarClick,
            handlerEliminarClick,
            formData,
            id } = AdminUsersFormLogic()


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