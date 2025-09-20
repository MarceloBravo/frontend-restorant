import { Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import './Grid.scss'

export const Grid = (props) => {
    const { sinBusqueda, data, headers, fields, btnText, placeholderText, handlerBtnNuevoClick, handlerInputBuscarChange, handlerEditarClick, handlerEliminarClick } = props;
    const [ cabeceras, setCabeceras ] = useState(headers ?? [])
    const [ columnas, setColumnas ] = useState(fields ?? [])

    useEffect(() => {
        if(data.length > 0 && !headers){
            setCabeceras(headers ?? Object.keys(data[0]));
        }else{
            setCabeceras(headers ?? [])
        }

        if(data.length > 0 && !fields){
            setColumnas(fields ?? Object.keys(data[0]))
        }else{
            setColumnas(fields ?? [])
        }
    }, [data]);


    const formateValue = (value) => {
        if(typeof value === 'boolean'){
            return value ? 'Sí' : 'No'
        }
        return value
    }
    
  return (
    <>
        {sinBusqueda !== true && <div className="Search-bar">
            <div className="new-record">
              <button 
                className='btn btn-primary' 
                onClick={handlerBtnNuevoClick} 
            >
                { btnText ?? 'Nuevo'} 
            </button>
            </div>
            <div className="search-record">
              <input 
                className="input form-control" 
                type="text" 
                placeholder={placeholderText ?? "Buscar..."} 
                onChange={handlerInputBuscarChange}
                />
            </div>
          </div>}

          <div style={{ overflowX: 'auto' }}>
            <table className='table table-users'>
              <thead>
                <tr>
                  {cabeceras.length > 0 && cabeceras.map((header, index) => (
                    <th key={index} scope='col'>{header}</th>
                  ))}
                  <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {data.length > 0 && data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                  {Object.keys(row).length > 0 && Object.keys(row).map((col, colIndex) => (
                      columnas.indexOf(col) > -1 && <td key={colIndex}>{formateValue(row[columnas[columnas.indexOf(col)]])}</td>
                  ))}
                  <td className="actions">
                      <button className="btn btn-sm btn-primary btn-edit" title="Editar" onClick={() =>handlerEditarClick(row[columnas[0]])}><Icon name='edit'/></button>
                      <button className="btn btn-sm btn-danger" title="Eliminar" onClick={() => handlerEliminarClick(row[columnas[0]])}><Icon name='trash'/></button>
                  </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
    </>
  )
}


export default Grid;