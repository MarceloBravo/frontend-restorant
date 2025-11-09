import Select from 'react-select'
import { OptionSelectInterface } from '../../interfaces/Components/OptionSelectInterface';
import { formatNumber } from '../../shared/functions';
import { ModalAgregarOrdenProps } from '../../interfaces/ModalAgregarOrdenInterface';
import { useModalAgregarOrden } from './useModalAgregarOrden';
import './ModalAgregarOrden.scss'

export const ModalAgregarOrden: React.FC<ModalAgregarOrdenProps> = (props): React.ReactElement => {
  const { 
    isVisible,
    title,
    optionsSelect,
    customStyles,
    selectedItems,
    handleSelectChange,
    handleEliminarItem,
    handleAceptar,
    handleCancelar
   } = useModalAgregarOrden(props)
  

  return (
    <>
        {isVisible &&
          <> 
            <div className="modal-background"></div>
            <div className="modal-container">
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <div className="modal-body">
                    
                    <div>
                      <Select 
                        options={optionsSelect} 
                        styles={customStyles}
                        onChange={handleSelectChange}
                        value={null}
                      />
                      
                    </div>
                    <div className='modal-selected-list'>
                      {selectedItems.length > 0 && selectedItems.map((product: OptionSelectInterface, index: number ) => 
                          <div className="modal-selected-item">
                            <img className='img-product' src={product.image?.toString() ?? ''} alt=''/>
                            <div className='modal-selected-product-info'>
                              <label>{product.label}</label>
                              <label>$ {formatNumber(product.price)}</label>
                            </div>
                           <button className='btn btn-outline-danger' onClick={() => handleEliminarItem(index)}>Eliminar</button>
                          </div>
                      )
                      }
                    </div>
                </div>
                <div className='container-buttons'>
                  <button className='btn btn-primary'onClick={handleAceptar} >Agregar</button>
                  <button className='btn btn-secondary' onClick={handleCancelar}>Cancelar</button>
                </div>
            </div>
          </>
        }   
    </>
  )
}