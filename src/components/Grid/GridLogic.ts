import React, { useEffect, useState } from 'react';
import { GridLogicPropsInterface } from '../../interfaces/Components/GridLogicPropsInterface';


/**
 * Hook de lógica para un componente de grilla (Grid) reutilizable.
 * Maneja la configuración de cabeceras, columnas y el formato de los datos.
 * @param {object} props - Propiedades para la grilla.
 * @param {boolean} [props.sinBusqueda=false] - Si es verdadero, no se muestra el campo de búsqueda.
 * @param {Array<object>} props.data - Los datos a mostrar en la grilla.
 * @param {Array<string>} [props.headers] - Las cabeceras de la grilla. Si no se proveen, se infieren de la primera fila de datos.
 * @param {Array<string>} [props.fields] - Los campos de los objetos de datos a mostrar. Si no se proveen, se infieren de la primera fila de datos.
 * @param {Array<string>} [props.types] - Los tipos de datos para cada columna, para aplicar formatos especiales (e.g., 'image', 'date-dma').
 * @param {string} [props.btnText] - Texto para el botón de "nuevo".
 * @param {string} [props.placeholderText] - Texto para el placeholder del campo de búsqueda.
 * @param {string} props.searchValue - El valor actual del campo de búsqueda.
 * @param {function} props.handlerBtnNuevoClick - Manejador para el evento click del botón "nuevo".
 * @param {function} props.handlerInputBuscarChange - Manejador para el evento change del input de búsqueda.
 * @param {function} props.handlerInputBuscarKeyDown - Manejador para el evento keydown del input de búsqueda.
 * @param {function} props.handlerEditarClick - Manejador para el evento click del botón "editar" en una fila.
 * @param {function} props.handlerEliminarClick - Manejador para el evento click del botón "eliminar" en una fila.
 * @returns {{sinBusqueda: boolean, data: Array<object>, cabeceras: Array<string>, columnas: Array<string>, handlerBtnNuevoClick: function, btnText: string, placeholderText: string, searchValue: string, handlerInputBuscarChange: function, handlerInputBuscarKeyDown: function, handlerEditarClick: function, handlerEliminarClick: function, formatValue: function, formatearValor: function}}
 */
export const GridLogic = (props: GridLogicPropsInterface): any => {
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

    /**
     * Efecto para actualizar las cabeceras y columnas dinámicamente.
     * Si las `headers` o `fields` no se proveen como props, este efecto
     * las infiere automáticamente a partir de las claves del primer
     * elemento en el array `data`. Se ejecuta cada vez que `data` cambia.
     */
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


    /**
     * Formatea un valor de una celda de la grilla basado en el tipo de dato de la columna.
     * @param {object} row - El objeto de datos de la fila actual.
     * @param {number} colIndex - El índice de la columna actual.
     * @returns {*} - El valor formateado, que puede ser un string o un elemento JSX (e.g., para imágenes).
     */
    const formatValue = (row: object, colIndex: number): any => {
      const value: any = obtenerValorDeColumna(row, colIndex);
      
      if(types?.length && Object.keys(columnas).length === types.length){
        return formatearValor(value, types[colIndex]);
      }else{
        return formatearValor(value)
      }
    }


    const obtenerValorDeColumna = (row: object, colIndex: number): any => {
      if(columnas.length === 0){
        const colName: string = Object.keys(row)[colIndex]
        return row[colName as keyof object];

      }else{
        return row[columnas[colIndex] as keyof object];
      }
    }




    /**
     * Formatea un valor individual basado en un tipo de dato específico.
     * @param {*} value - El valor a formatear.
     * @param {string|null} [type=null] - El tipo de dato para el formateo (e.g., 'image', 'boolean', 'date-dma'). Si es nulo, se infiere del `typeof` del valor.
     * @returns {*} - El valor formateado.
     */
    const formatearValor = (value: string | number | ImageBitmap | Date | boolean, type?: string | null): any => {
      const tipo: string = type ?? typeof value;
      switch(tipo){
        case 'image':
          return React.createElement('img', { src: value as any, alt: 'preview' });
        case 'boolean':
          return value ? 'Sí' : 'No'
        case 'date-d':
          const date = new Date(value.toString());
          return date.getDate().toString();
        case 'date-dm':
          const dateDm = new Date(value.toString());
          return (dateDm.getDate().toString().padStart(2, '0') + '/' + (dateDm.getMonth() + 1).toString().padStart(2, '0'));
        case 'date-dma':
          const dateDma = new Date(value.toString());
          return (dateDma.getDate().toString().padStart(2, '0') + '/' + (dateDma.getMonth() + 1).toString().padStart(2, '0') + '/' + dateDma.getFullYear().toString());
        case 'date-dmah':
          const dateDmah = new Date(value.toString());
          return (dateDmah.getDate().toString().padStart(2, '0') + '/' + (dateDmah.getMonth() + 1).toString().padStart(2, '0') + '/' + dateDmah.getFullYear().toString()+ dateDmah.getHours().toString().padStart(2, '0') + ':' + dateDmah.getMinutes().toString().padStart(2, '0'));
        case 'date':
        case 'number':
        case 'text':          
          return value
        case 'money':
          const price = new Intl.NumberFormat('es-CL', { useGrouping: true }).format(Number(value));
          return ('$ ' + price).replace(/\s/g, '\u00A0'); // Reemplaza espacios por espacios inseparables
        default:
          return value
      }
    }

    
  return (
    {
      sinBusqueda,
      data,
      cabeceras,
      columnas,
      handlerBtnNuevoClick,
      btnText,
      placeholderText,
      searchValue,
      handlerInputBuscarChange,
      handlerInputBuscarKeyDown,
      handlerEditarClick,
      handlerEliminarClick,
      formatValue,
      formatearValor
    }
  )
}

export default GridLogic;