/**
 * @file CategoriasFormLogic.ts
 * @description Lógica para el formulario de categorías, manejando el estado, 
 * la carga de datos y las interacciones del usuario.
 * @module pages/Admin/Categorias/CategoriasForm
 */

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../../store/slices/ModalSlices';
import { useCategorias } from '../../../../Hooks/useCategorias';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryClass } from '../../../../class/CategoryClass';
import { useParams } from 'react-router-dom';
import { CategoriasFormLogicInterface } from '../../../../interfaces/CategoriasFormLogicInterface';

/**
 * Hook personalizado que encapsula la lógica del formulario de categorías.
 * @returns {CategoriasFormLogicInterface} Un objeto con el estado y los manejadores de eventos del formulario.
 */
const CategoriasFormLogic = (): CategoriasFormLogicInterface => {
    const param = useParams();
    const id: string | null = param.id ? param.id : null;
    const { categoria, status, buscarCategoria, nuevaCategoria, actualizarCategoria, eliminarCategoria } = useCategorias();
    const [ formData, setFormData ] = useState(new CategoryClass());
    const [ imageUrl, setImageUrl ] = useState<string | null>(null);
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
            const imagePath = categoria.image && typeof categoria.image === 'string' ? categoria.image : null;
            setImageUrl(imagePath);
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
    
    /**
     * Maneja el cambio en los campos de entrada del formulario.
     * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio.
     */
    const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    /**
     * Simula un clic en el campo de entrada de tipo archivo para abrir el selector de archivos.
     */
    const handleImageUploadClick = (): void => {
        if( fileInputRef.current )
            fileInputRef.current.click();
    };

    /**
     * Maneja el cambio en el campo de entrada de tipo archivo.
     * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio.
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImageUrl(previewUrl);
            setFormData(prev => ({ ...prev, image: file }));
        }else{
            setImageUrl(null);
        }
    }

    /**
     * Maneja el clic en el botón de guardar, validando los datos y abriendo un modal de confirmación.
     */
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

    /**
     * Maneja el clic en el botón de eliminar, abriendo un modal de confirmación.
     */
    const handlerEliminarClick = (): void => {
        dispatch(openModal({
            title: 'Eliminar categoría',
            message: '¿Está seguro que desea eliminar esta categoría?',
            btnAceptarText: 'Eliminar',
            isOpen: true
        }))
        setAccion('eliminar');
    }

    /**
     * Maneja el clic en el botón de cancelar, navegando de vuelta a la lista de categorías.
     */
    const handlerCancelarClick = (): void => {
        navigate('/admin/categorias');
    }
    
    /**
     * Valida los datos del formulario antes de enviarlos.
     * @returns {boolean} `true` si los datos son válidos, `false` en caso contrario.
     */
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

  return {
    id,
    formData, 
    imageUrl, 
    fileInputRef, 
    handlerInputChange, 
    handleImageUploadClick, 
    handleFileChange, 
    handlerGrabarClick, 
    handlerEliminarClick, 
    handlerCancelarClick, 
  }
}

export default CategoriasFormLogic;