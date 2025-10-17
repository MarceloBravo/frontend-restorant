import { Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import './Grid.scss'

export const Grid = (props) => {
    const { 
      sinBusqueda, 
      data, 
      headers, 
      fields, 
      types, 
      btnText, 
      placeholderText, 
      searchValue,
      handlerBtnNuevoClick, 
      handlerInputBuscarChange, 
      handlerInputBuscarKeyDown,
      handlerEditarClick, 
      handlerEliminarClick 
    } = props;
    const [ cabeceras, setCabeceras ] = useState(headers ?? []);
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


    const formatValue = (row, colIndex) => {
      const value = row[columnas[colIndex]]
      if(types?.length && Object.keys(columnas).length === types.length){
        return formatearValor(value, types[colIndex])
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
        case 'date-d':
          const date = new Date(value);
          return date.getDate().toString();
        case 'date-dm':
          const dateDm = new Date(value);
          return (dateDm.getDate().toString().padStart(2, '0') + '/' + (dateDm.getMonth() + 1).toString().padStart(2, '0'));
        case 'date-dma':
          const dateDma = new Date(value);
          return (dateDma.getDate().toString().padStart(2, '0') + '/' + (dateDma.getMonth() + 1).toString().padStart(2, '0') + '/' + dateDma.getFullYear().toString());
        case 'date-dmah':
          const dateDmah = new Date(value);
          return (dateDmah.getDate().toString().padStart(2, '0') + '/' + (dateDmah.getMonth() + 1).toString().padStart(2, '0') + '/' + dateDmah.getFullYear().toString()+ date.getHours().toString().padStart(2, '0') + ':' + dateDmah.getMinutes().toString().padStart(2, '0'));
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
              <form onSubmit={e => e.preventDefault()}>
                <input 
                  className="input form-control" 
                  type="text" 
                  placeholder={placeholderText ?? "Buscar..."} 
                  onChange={e => handlerInputBuscarChange(e)}
                  onKeyUp={e =>handlerInputBuscarChange(e)}
                  onKeyDown={e =>handlerInputBuscarKeyDown(e)}
                  value={searchValue}
                />
              </form>
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
                      {columnas.length > 0 && columnas.map((col, colIndex) => (
                          Object.keys(row).indexOf(col) > -1 && <td key={colIndex}>{formatValue(row, colIndex)}</td>
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