import React, { useEffect, useRef, useState } from 'react';
import ProductoFormHtml from './ProductoFormHtml'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductoClass } from '../../../../class/ProductoClass';
import { useCategorias } from '../../../../Hooks/useCategorias';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../store/slices/ModalSlices';
import { UseProducto } from '../../../../Hooks/UseProducto';
import { toast } from 'react-toastify';
import './ProductosForm.scss';

const ProductoForm: React.FC = () => {
  const param = useParams()
  const id: number | null = param.id ? parseInt(param.id) : null; // Aquí podrías obtener el ID del producto si estás editando uno existente.
  const [accion, setAccion] = useState<string>('');
  const [formData, setFormData] = useState<ProductoClass>(new ProductoClass());
  const [ errors, SetErrors ] = useState<{ [key: string]: string }>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {categorias, listarCategorias} = useCategorias();
  const { ver, nuevo, actualizar, eliminar } = UseProducto('',id ? id : null);
  const isOkClicked = useSelector((state: any) => state.modal.isOkClicked);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      if(ver.fetchStatus === 'idle' && ver.isLoading === false) {
        ver.refetch()
      }

      if(ver.error){
        toast.error('Ocurrió un error al obtener el producto.');
      }
    }
  
    listarCategorias();
  }, []);

  useEffect(()=>{
    if(ver.fetchStatus === 'idle' && ver.isSuccess === true && id){
        setFormData(ver.data.data);
        setImageUrl(ver.data.data.image || null);
      }
  }, [ver.fetchStatus]);

  useEffect(() => {
    if(
      (nuevo.isSuccess && accion === 'crear') || 
      (actualizar.isSuccess && accion === 'actualizar') || 
      (eliminar.isSuccess && accion === 'eliminar')
    ){
      toast.success(`Producto ${accion.replace('ar', 'ado')} con éxito.`);
      navigate('/admin/productos');
    }
    
    if(
      (nuevo.isError && accion === 'crear') || 
      (actualizar.isError && accion === 'actualizar') || 
      (eliminar.isError && accion === 'eliminar')
    ){
      console.log('ERROR EN LA ACCIÓN = ', actualizar);
      nuevo.reset();
      actualizar.reset();
      eliminar.reset();
      toast.error(`Ocurrió un error al ${accion} el producto.`);
    }

  },[nuevo, actualizar, eliminar]);

  useEffect(() => {
    if (isOkClicked) {
      switch (accion) {
        case 'crear':
          // Lógica para crear el producto
          nuevo.reset();
          nuevo.mutate(formData);
          break;
        case 'actualizar':
          // Lógica para actualizar el producto
          actualizar.reset();
          actualizar.mutate(formData);
          break;
        case 'eliminar':
          // Lógica para eliminar el producto
          eliminar.reset();
          eliminar.mutate(id ?? '');
          break;
        default:
          break;
      }
    }
  }, [isOkClicked]);

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target as HTMLInputElement | HTMLSelectElement;
    let value: any;

    // Si es un checkbox, usar la propiedad checked
    if ((e.target as HTMLInputElement).type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    } else {
      value = (e.target as HTMLInputElement).value;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateOnInput(name, value);
  }

  const handlerGrabarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();    
    if(validateOnSave()){
      dispatch(openModal({
                      title: !id ? 'Grabar categoría' : 'Actualizar categoría',
                      message: !id ? '¿Desea grabar esta categoría?' : '¿Está seguro que desea actualizar esta categoría?',
                      btnAceptarText: !id ? 'Grabar' : 'Actualizar',
                      isOpen: true
                  }))
      setAccion(!id ? 'crear' : 'actualizar');
    }
  }

  const handlerEliminarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(openModal({
      title: 'Eliminar producto', 
      message: '¿Está seguro que desea eliminar este producto?', 
      btnAceptarText: 'Eliminar', 
      isOpen: true
    }))
    setAccion('eliminar');  
  }

  const handlerCancelarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/admin/productos');

  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const urlImage = URL.createObjectURL(file);
      setImageUrl(urlImage);
      setFormData(prevState => ({
        ...prevState,
        image: file
      }));
    }

    SetErrors(prevState => ({
      ...prevState,
      image: (file || imageUrl) ? '' : 'La imagen es obligatoria.'
    }));
  };

  
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  }

  const validateOnInput = (name: string, value: string | number | boolean) => {
    let error = '';
    switch (true) {
      case name === 'title' && !value:
        error = 'El título es obligatorio.';
        break;  
      case name === 'description' && !value:
        error = 'La descripción es obligatoria.';
        break;
      case name === 'price':
        if (!value) {
          error = 'El precio es obligatorio.';
        }

        if (isNaN(Number(value)) || Number(value) <= 0) {
          error = 'El precio debe ser un número positivo.';
        }
        break;
      case name === 'category' && !value:
          error = 'La categoría es obligatoria.';
        break;
      default:
        break;
    }
    SetErrors(prevState => ({
      ...prevState,
      [name]: error
    }));
    return error;
  }

  const validateOnSave = (): boolean => {
    if (formData.title.trim() === '' || formData.description.trim() === '' || formData.price <= 0 || !formData.category || (!formData.image && !imageUrl)) {
      dispatch(openModal(openModal({
        title: 'Error de validación',
        message: 'Por favor, complete todos los campos obligatorios.',
        btnAceptarText: 'Aceptar',
        isOpen: true
      })));
      return false;
    }
    return true;
  }

    
  return (
    <ProductoFormHtml 
      formData={formData}
      handlerInputChange={handlerInputChange}
      handlerGrabarClick={handlerGrabarClick}
      handlerEliminarClick={handlerEliminarClick}
      handlerCancelarClick={handlerCancelarClick}
      id={id}
      imageUrl={imageUrl}
      fileInputRef={fileInputRef}
      handleFileChange={handleFileChange}
      handleImageUploadClick={handleImageUploadClick}
      categorias={categorias}
      errors={errors}
    />
  )
}

export default ProductoForm;
