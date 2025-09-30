import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { openModal } from '../../../../store/slices/ModalSlices';
import { useCategorias } from '../../../../Hooks/useCategorias';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import CategoriasFormHtml from './CategoriasFormHtml'


const CategoriasForm = () => {
    const param = useParams();
    const id = param.id ? param.id : null;
    const { categoria, status, buscarCategoria, nuevaCategoria, actualizarCategoria, eliminarCategoria } = useCategorias();
    const [ formData, setFormData ] = useState({ name: '', description: '', image: null, imageFile: null});
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ accion, setAccion ] = useState(null);
    const fileInputRef = useRef(null);
    const isOkClicked = useSelector(state => state.modal.isOkClicked);
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
            setImagePreview(categoria.image ?? null);
        } else {
            setFormData({ name: '', description: '', image: null, imageFile: null });
        }
    }, [categoria])

    
    useEffect(() => {
        if(!isOkClicked || !accion)return;
        // Cuando el usuario confirma en el modal, se ejecuta la acción correspondiente.
        const data = {...formData};
        if(data?.image === categoria?.image) delete data.image;
        if(accion === 'crear'){
            nuevaCategoria(data);
        }else if(accion === 'actualizar'){
            actualizarCategoria(data);
        }else if(accion === 'eliminar'){
            eliminarCategoria(id);
        }
        // eslint-disable-next-line
    },[isOkClicked])

    useEffect(() => {
        if(!accion)return;
        // Reacciona al cambio de 'status' después de una operación (crear, actualizar, eliminar).
        if (status.code >= 200 && status.code < 300) {
            toast.success(status.message);
            navigate('/admin/categorias');
        }else{
            toast.error(status.message);
        }
        setAccion(null);
        // eslint-disable-next-line
    }, [status])
    

    const handlerInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };


    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setFormData(prev => ({ ...prev, imageFile: file }));
        }else{
            setImagePreview(null);
        }   

    }


    const handlerGrabarClick = (e) => {
        e.preventDefault();
        if(validaDatos()){
            dispatch(openModal({
                title: !id ? 'Grabar categoría' : 'Actualizar categoría',
                message: !id ? '¿Desea grabar esta categoría?' : '¿Está seguro que desea actualizar esta categoría?',
                btnAceptarText: !id ? 'Grabar' : 'Actualizar',
                isOpen: true
            }))
            setAccion(!id ? 'crear' : 'actualizar');
        }
    }

    const handlerEliminarClick = (e) => {
        e.preventDefault();
        dispatch(openModal({
            title: 'Eliminar categoría',
            message: '¿Está seguro que desea eliminar esta categoría?',
            btnAceptarText: 'Eliminar',
            isOpen: true
        }))
        setAccion('eliminar');
    }


    const handlerCancelarClick = (e) => {
        e.preventDefault();
        navigate('/admin/categorias');
    }
    

    const validaDatos = () => {
        switch(true){
            case formData.name.length < 3:
                toast.error('El nombre debe tener al menos 3 caracteres');
                break;
            case formData.description.length < 3:
                toast.error('La descripción debe tener al menos 3 caracteres');
                break;
            case !formData.image && !formData.imageFile:
                toast.error('La imagen es requerida');
                break;
            default:
                return true;
        }
        return false;
    }


  return <CategoriasFormHtml 
            id={id}
            formData={formData}
            imageUrl={imagePreview || ''}
            fileInputRef={fileInputRef}
            handlerInputChange={handlerInputChange}
            handleImageUploadClick={handleImageUploadClick}
            handleFileChange={handleFileChange}
            handlerGrabarClick={handlerGrabarClick}
            handlerEliminarClick={handlerEliminarClick}
            handlerCancelarClick={handlerCancelarClick}
    />
}

export default CategoriasForm
