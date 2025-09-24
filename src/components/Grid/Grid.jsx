import { Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import './Grid.scss'

export const Grid = (props) => {
    const { sinBusqueda, data, headers, fields, types, btnText, placeholderText, handlerBtnNuevoClick, handlerInputBuscarChange, handlerEditarClick, handlerEliminarClick } = props;
    const [ cabeceras, setCabeceras ] = useState(headers ?? [])
    const [ columnas, setColumnas ] = useState(fields ?? [])

    useEffect(() => {
        if(data?.length > 0 && !headers){
            setCabeceras(headers ?? Object.keys(data[0]));
        }else{
            setCabeceras(headers ?? [])
        }

        if(data?.length > 0 && !fields){
            setColumnas(fields ?? Object.keys(data[0]))
        }else{
            setColumnas(fields ?? [])
        }
        // eslint-disable-next-line
    }, [data]);


    const formateValue = (row, col) => {
      const value = row[columnas[col]]
      if(types?.length && Object.keys(row).length === types.length){
        return formatearValor(value, types[col])
      }else{
        return formatearValor(value)
      }
    }


    const formatearValor = (value, type = null) => {
      const tipo = type || typeof value    
      switch(tipo){
        case 'image':
          return <img src={value} alt="preview" style={{"maxWidth": "100px", "height": "100px"}}/>
        case 'boolean':
          return value ? 'Sí' : 'No'
        case 'date':
        case 'number':
        case 'text':
          return value
        default:
          return value
      }
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

          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
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
                {data?.length > 0 && data?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                      {Object.keys(row).length > 0 && Object.keys(row).map((col, colIndex) => (
                          columnas.indexOf(col) > -1 && <td key={colIndex}>{formateValue(row, colIndex)}</td>
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
          </div>
    </>
  )
}

export default Grid;