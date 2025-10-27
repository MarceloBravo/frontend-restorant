import { useEffect, useState } from "react";
import { useMesas } from "../../../../Hooks/useMesas";
import { useNavigate, useParams } from "react-router-dom";
import { MesasClass } from "../../../../class/MesasClass";
import { toast } from "react-toastify";
import { openModal } from "../../../../store/slices/ModalSlices";
import { useDispatch, useSelector } from "react-redux";


export const MesasFormLogic = () => {
    const params = useParams();
    const id: number | null = params.id ? parseInt(params.id) : null;
    const { nuevo, actualizar, eliminar, buscarPorId } = useMesas('',id);
    const [ errors, setErrors ] = useState<{ number: string; capacity: string; active: string }>({ number: '', capacity: '', active: '' })
    const [ formData, setFormData ] = useState<MesasClass>(new MesasClass());
    const [ accion, setAccion ] = useState<string | null>(null)
    const modal = useSelector((state: any) => state.modal);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    useEffect(() => {
        if(id && accion === null){
            buscarPorId.refetch();
        }
        // eslint-disable-next-line
    },[id])


    useEffect(() => {
        if(buscarPorId?.data){
            setFormData(buscarPorId.data.data)
        }

        if(buscarPorId.error){
            toast.error('Error al buscar la información de la mesa');
        }
    },[buscarPorId.data, buscarPorId.error])

    useEffect(() => {
        if(!modal.isOkClicked)return;
        if(accion === 'crear'){
            nuevo.mutate(formData);
        }else if(accion === 'actualizar' && id){
            actualizar.mutate(formData);
        }else if(accion === 'eliminar' && id){
            eliminar.mutate(id ?? 0);
        }
        setAccion(null);
        // eslint-disable-next-line
    },[accion, id, modal.isOkClicked])


    useEffect(() => {
        if(nuevo.isError === true){
            const err: any = nuevo.error;
            obtenerErroresAPI(err.response.data);
            toast.error('Error al registrar la nueva mesa');
        }else{
            if(nuevo.isSuccess === true){
                toast.success('Mesa creada exitosamente');
                navigate('/admin/mesas');
            }
        }
        // eslint-disable-next-line
    },[nuevo.isError, nuevo.isSuccess])


    const obtenerErroresAPI = (err: Record<string, any>) => {
        Object.keys(err).forEach((k: string) => {
            const key = k as keyof typeof errors;
            setErrors(prev => ({ ...prev, [key]: err[k][0] }))
        })
    }


    useEffect(() => {
        if(actualizar.isError === true){
            toast.error('Ocurrió un error al intentar actualizar la mesa.');
        }else{
            if(actualizar.isSuccess === true){
                toast.success('Mesa actualizada exitosamente');
                navigate('/admin/mesas');
            }
        }
        // eslint-disable-next-line
    },[actualizar.isError, actualizar.isSuccess])


    useEffect(() => {
        if(eliminar.isError === true){
            toast.error('Ocurrió un error al intentar eliminar la mesa.');
        }else{
            if(eliminar.isSuccess === true){
                toast.success('Mesa eliminada exitosamente');
                navigate('/admin/mesas');
            }
        }
        // eslint-disable-next-line
    },[eliminar.isError, eliminar.isSuccess])

    


    const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData({ ...formData, [name]: name === 'active' ? checked : value });
        validaDatos(name, value);
    }


    const handlerGrabarClick = (): void => {   
        if(!validaDatos()){
            toast.error('Datos incompletos o no válidos.')
            return;
        }
        setAccion(id ? 'actualizar' : 'crear');
        dispatch(openModal({
            title: id ? 'Actualizar mesa' : 'Crear mesa',
            message: id ? '¿Está seguro que desea actualizar esta mesa?' : '¿Desea crear esta mesa?',
            btnAceptarText: id ? 'Actualizar' : 'Crear',
            isOpen: true
        }))
    }
    
    const handlerEliminarClick = (): void => {
        setAccion('eliminar');
        dispatch(openModal({
            title: 'Eliminar mesa',
            message: '¿Está seguro que desea eliminar esta mesa?',
            btnAceptarText: 'Eliminar',
            isOpen: true
        }))
    }


    const handlerCancelarClick = (): void => {
        setAccion(null);
        navigate('/admin/mesas');
    }

    const validaDatos = (field: string = '', value: any = null): boolean => {
        if(field === 'number' && value !== null){
            setErrors({...errors, number: (isNaN(value) || value <= 0) ? 'El número de mesa debe ser un número positivo.' : ''});
            return false;
        }
        if(field === 'capacity' && value !== null){
            setErrors({...errors, capacity: (isNaN(value) || value <= 0) ? 'La cantidad de sillas de la mesa debe ser un número.': ''});
            return false;
        }
        if(field === 'active'){
            setErrors({...errors, active: value === null ? 'Debe seleccionar si la mesa está activa o no.' : ''});
            return false;
        }
        return (isNaN(formData.number) || formData.number <= 0 || isNaN(formData.capacity) || formData.capacity <= 0 || formData.active === null) ? false : true;
    }


    return {
        id,
        errors,
        formData,
        handlerInputChange,
        handlerGrabarClick,
        handlerEliminarClick,
        handlerCancelarClick        
    }

}