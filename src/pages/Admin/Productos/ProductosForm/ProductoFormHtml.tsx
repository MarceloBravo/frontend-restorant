import React from 'react';
import { ProductoFormHtmlInterface } from '../../../../interfaces/ProductoFormHtmlInterface';
import '../../../../scss/error.scss';

const ProductoFormHtml: React.FC<ProductoFormHtmlInterface> = (props) => {
  const { 
    formData, 
    handlerInputChange, 
    handlerGrabarClick, 
    handlerEliminarClick, 
    handlerCancelarClick, 
    id, 
    imageUrl, 
    fileInputRef, 
    handleFileChange, 
    handleImageUploadClick,
    categorias,
    errors
  } = props;



  return (
    <div className='form-page'>
        <div className='admin-users-form'>
            <h1>Mantenedor de productos</h1>
        </div>
        <div className='admin-users-form-container'>
            <div className="mb-3 row">
                <label htmlFor="name" className="col-sm-3 col-form-label">Nombre</label>
                <div className="col-sm-9">
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={e => handlerInputChange(e)}
                            value={formData.title}
                        />
                        {errors.title && <p className="error-message">{errors.title}</p>}
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="description" className="col-sm-3 col-form-label">Descripción</label>
                <div className="col-sm-9">
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            onChange={e => handlerInputChange(e)}
                            value={formData.description}
                        />
                    </div>
                    {errors.description && <p className="error-message">{errors.description}</p>}
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="description" className="col-sm-3 col-form-label">Precio</label>
                <div className="col-sm-9">
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            name="price"
                            onChange={e => handlerInputChange(e)}
                            value={formData.price}
                        />
                    </div>
                    {errors.price && <p className="error-message">{errors.price}</p>}
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="category" className="col-sm-3 col-form-label">Categoría</label>
                <div className="col-sm-9">
                    <div>
                        <select
                            className="form-control"
                            name="category"
                            onChange={e => handlerInputChange(e)}
                            value={formData.category?.toString() || ''}
                        >
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria, key) => (
                                categoria.id && <option key={key} value={categoria.id}>
                                    {categoria.name}
                                </option>
                            
                            ))}
                        </select>
                    </div>
                    {errors.category && <p className="error-message">{errors.category}</p>}
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="active" className="col-sm-3 col-form-label">Activo</label>
                <div className="col-sm-9">
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="active"
                            onChange={e => handlerInputChange(e)}
                            checked={formData.active}
                        />  
                    </div>
                    {errors.active && <p className="error-message">{errors.active}</p>}
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="image" className="col-sm-3 col-form-label">Imagen</label>
                <div className="col-sm-9">
                    {imageUrl && <img src={imageUrl} alt="preview" style={{ width: "150px", height: "150px", marginBottom: "10px" }} />}
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
                    <button type="button" className="btn btn-primary me-2" onClick={handleImageUploadClick}>Cargar Imagen</button>
                </div>
                {errors.image && <p className="error-message">{errors.image}</p>}
            </div>

            <div className="btn-container">
                <button type="button" className="btn btn-primary" onClick={handlerGrabarClick}>Guardar</button>
                <button type="button" className="btn btn-danger" disabled={!id} onClick={handlerEliminarClick}>Eliminar</button>
                <button type="button" className="btn btn-success" onClick={handlerCancelarClick}>Cancelar</button>
            </div>
        </div>
    </div>
  );
};

export default ProductoFormHtml;
