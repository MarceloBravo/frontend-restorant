import React from 'react'
import { MesasFormLogic } from './MesasFormLogic';

const MesasForm = () => {
    const { 
        id,
        errors,
        formData, 
        handlerInputChange, 
        handlerGrabarClick, 
        handlerEliminarClick, 
        handlerCancelarClick 
    } = MesasFormLogic();

  return (
    <div className='form-page'>
        <div className='admin-users-form'>
            <h1>Mantenedor de mesas</h1>
        </div>
        <div className='admin-users-form-container'>
            <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-3 col-form-label">Número de mesa</label>
                <div className="col-sm-9">
                    <div className="col-sm-2">
                        <input
                            type="text"
                            className="form-control col-sm-2"
                            name="number"
                            onChange={e => handlerInputChange(e)}
                            value={formData.number}
                        />
                    </div>
                    { errors.number.length > 0  && <label className='error'>{errors.number}</label>}
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="description" className="col-sm-3 col-form-label">Puestos</label>
                <div className="col-sm-9">
                    <div className="col-sm-2">
                        <input
                            type="text"
                            className="form-control"
                            name="capacity"
                            onChange={e => handlerInputChange(e)}
                            value={formData.capacity}
                        />
                    </div>
                    { errors.capacity.length > 0 && <label className='error'>{errors.capacity}</label>}
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="description" className="col-sm-3 col-form-label">Activa</label>
                <div className="col-sm-9">
                    <div className="col-sm-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="active"
                            onChange={e => handlerInputChange(e)}
                            value={formData.active ? 'true' : 'false'}
                            checked={formData.active}
                        />
                    </div>
                    { errors.active.length > 0  && <label className='error'>{errors.active}</label>}
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

export default MesasForm
