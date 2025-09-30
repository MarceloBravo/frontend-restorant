const CategoriasFormHtml = (props) => {
    const { 
        id, 
        formData, 
        handlerInputChange, 
        imageUrl, 
        handleImageUploadClick, 
        handleFileChange, 
        handlerGrabarClick, 
        handlerEliminarClick, 
        handlerCancelarClick, 
        fileInputRef, 
    } = props;

  return (
        <div className='form-page'>
            <div className='admin-users-form'>
                <h1>Mantenedor de categorias</h1>
            </div>
            <div className='admin-users-form-container'>
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">Nombre</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={e => handlerInputChange(e)}
                            value={formData.name}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="description" className="col-sm-3 col-form-label">Descripción</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            onChange={e => handlerInputChange(e)}
                            value={formData.description}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="image" className="col-sm-3 col-form-label">Imagen</label>
                    <div className="col-sm-9">
                        {imageUrl && <img src={imageUrl} alt="preview" style={{ width: "150px", height: "150px", marginBottom: "10px" }} />}
                        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept="image/*" />
                        <button type="button" className="btn btn-primary me-2" onClick={handleImageUploadClick}>Cargar Imagen</button>
                    </div>
                </div>

                <div className="btn-container">
                    <button type="button" className="btn btn-primary" onClick={handlerGrabarClick}>Guardar</button>
                    <button type="button" className="btn btn-danger" disabled={!id} onClick={handlerEliminarClick}>Eliminar</button>
                    <button type="button" className="btn btn-success" onClick={handlerCancelarClick}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default CategoriasFormHtml
