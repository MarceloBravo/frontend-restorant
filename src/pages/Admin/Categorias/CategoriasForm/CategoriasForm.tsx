import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { openModal } from '../../../../store/slices/ModalSlices';
import { useCategorias } from '../../../../Hooks/useCategorias';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import CategoriasFormHtml from './CategoriasFormHtml'
import { CategoryClass } from '../../../../class/CategoryClass';


const CategoriasForm: React.FC = () => {
    const param = useParams();
    const id: string | null = param.id ? param.id : null;
    const { categoria, status, buscarCategoria, nuevaCategoria, actualizarCategoria, eliminarCategoria } = useCategorias();
    const [ formData, setFormData ] = useState(new CategoryClass());
    //const [ formData, setFormData ] = useState({ name: '', description: '', imageUrl: null, image: null});
    const [ imagePreview, setImagePreview ] = useState<File | string | null>(null);
    const [ accion, setAccion ] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const isOkClicked = useSelector((state: any) => state.modal.isOkClicked);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        if (id) {
            buscarCategoria(Number(id));
        }
        // eslint-disable-next-line
    }, [id]);


    useEffect(() => {
        if (categoria) {
            setFormData(categoria);
            setImagePreview(categoria.imageUrl ?? null);
        } else {
            setFormData({ name: '', description: '', imageUrl: null, image: null });
        }
    }, [categoria])

    
    useEffect(() => {
        if(!isOkClicked || !accion)return;
        // Cuando el usuario confirma en el modal, se ejecuta la acción correspondiente.
        const data = {...formData};
        if(data?.imageUrl === categoria?.imageUrl) delete data.imageUrl;
        if(accion === 'crear'){
            nuevaCategoria(data);
        }else if(accion === 'actualizar'){
            actualizarCategoria(data);
        }else if(accion === 'eliminar'){
            eliminarCategoria(Number(id));
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
    

    const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };


    const handleImageUploadClick = (): void => {
        if( fileInputRef.current )
            fileInputRef.current.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setFormData(prev => ({ ...prev, image: file }));
        }else{
            setImagePreview(null);
        }   

    }


    const handlerGrabarClick = (): void => {
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

    const handlerEliminarClick = (): void => {
        dispatch(openModal({
            title: 'Eliminar categoría',
            message: '¿Está seguro que desea eliminar esta categoría?',
            btnAceptarText: 'Eliminar',
            isOpen: true
        }))
        setAccion('eliminar');
    }


    const handlerCancelarClick = (): void => {
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
            case !formData.imageUrl && !formData.image:
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
