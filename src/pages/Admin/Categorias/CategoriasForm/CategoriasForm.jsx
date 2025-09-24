import { useEffect, useState, useRef } from 'react';
import { useCategorias } from '../../../../Hooks/useCategorias';
import { Loader } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import { openModal } from '../../../../store/slices/ModalSlices';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CategoriasForm = () => {
    const param = useParams();
    const id = param.id ? param.id : null;
    const { status, loading, categoria, buscarCategoria, nuevaCategoria, actualizarCategoria, eliminarCategoria } = useCategorias();
    const [formData, setFormData] = useState({ name: '', description: '', image: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [accion, setAccion] = useState(null);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const imageUrl = imagePreview ? imagePreview : (formData.image ? (formData.image.startsWith('http') ? formData.image : `${backendUrl}${formData.image}`) : null);
    const modal = useSelector(state => state.modal);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if (id) {
            buscarCategoria(id);
        }
        // eslint-disable-next-line
    }, [id]);


    useEffect(() => {
        if (categoria) {
            setFormData(categoria);
            setImageFile(null);
            setImagePreview(null);
        } else {
            setFormData({ name: '', description: '', image: '' });
        }
    }, [categoria]);


    useEffect(() => {
        if (!modal.isOpen && modal.isOkClicked) { //Se seleccionó el botón de aceptar en el modal
            const dataToSubmit = { ...formData, imageFile };
            if (accion === 'crear') {
                nuevaCategoria(dataToSubmit).then((resp) => resultSuccess(resp)).catch((err) => resultError(err));
            } else if (accion === 'actualizar') {
                actualizarCategoria(dataToSubmit).then((resp) => resultSuccess(resp)).catch((err) => resultError(err));;
            } else if (accion === 'eliminar') {
                eliminarCategoria(id).then((resp) => resultSuccess(resp)).catch((err) => resultError(err));;
            }
        }
        // eslint-disable-next-line
    }, [modal.isOpen]);


    const resultSuccess = (resp) => {
        console.log(resp)
            toast.success(resp.message)
            navigate('/admin/categorias');
    }

    const resultError = (resp) => {
        toast.error(resp.message)
    }


    const handlerInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

                  
    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };


    const handleImageDeleteClick = () => {
        setImageFile(null);
        setImagePreview(null);
        setFormData({ ...formData, image: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };


    const handlerGrabarClick = (e) => {
        e.preventDefault();
        dispatch(openModal({
            title: !id ? 'Grabar categoría' : 'Actualizar categoría',
            message: !id ? '¿Desea grabar esta categoría?' : '¿Está seguro que desea actualizar esta categoría?',
            btnAceptarText: !id ? 'Grabar' : 'Actualizar',
            isOpen: true
        }));
        setAccion(!id ? 'crear' : 'actualizar');
        //setRedirect(true);
    };


    const handlerEliminarClick = (e) => {
        e.preventDefault();
        dispatch(openModal({
            title: 'Eliminar categoría',
            message: '¿Está seguro que desea eliminar esta categoría?',
            btnAceptarText: 'Eliminar',
            isOpen: true
        }));
        setAccion('eliminar');
        //setRedirect(true);
    };


    const handlerCancelarClick = (e) => {
        e.preventDefault();
        navigate('/admin/categorias');
    };

    if (loading && id) return (<Loader active inline='centered'>Cargando ...</Loader>);

    console.log(status)

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
                        <button type="button" className="btn btn-danger" onClick={handleImageDeleteClick}>Eliminar Imagen</button>
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

export default CategoriasForm;
