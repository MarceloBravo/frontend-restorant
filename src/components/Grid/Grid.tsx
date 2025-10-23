import { Icon } from 'semantic-ui-react';
import { GridLogic } from './GridLogic';
import { GridLogicPropsInterface } from '../../interfaces/Components/GridLogicPropsInterface';
import { JSX } from 'react';
import './Grid.scss'

export const Grid = (props: GridLogicPropsInterface): JSX.Element => {
    const { 
      sinBusqueda, 
      data, 
      cabeceras, 
      columnas, 
      formatValue,
      btnText, 
      placeholderText, 
      searchValue,
      handlerBtnNuevoClick, 
      handlerInputBuscarChange, 
      handlerInputBuscarKeyDown,
      handlerEditarClick, 
      handlerEliminarClick 
    } = GridLogic(props);

    
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
                    {cabeceras.length > 0 && cabeceras.map((header: string, index: number) => (
                      <th key={index} scope='col'>{header}</th>
                    ))}
                    <th scope='col'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {data?.length > 0 && data?.map((row: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                      {columnas.length > 0 && columnas.map((col: string, colIndex: number) => (
                          Object.keys(row).indexOf(col) > -1 && <td key={colIndex}>{formatValue(row, colIndex)}</td>
                      ))}
                      <td className="actions">
                        <div className="btn-group">
                          <button className="btn btn-sm btn-primary btn-edit" title="Editar" onClick={() =>handlerEditarClick(row[columnas[0]])}><Icon name='edit'/></button>
                          <button className="btn btn-sm btn-danger" title="Eliminar" onClick={() => handlerEliminarClick(row[columnas[0]])}><Icon name='trash'/></button>
                        </div>
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