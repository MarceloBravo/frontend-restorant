import { useState } from 'react';
import { getCategorias as getCategoriasApi, getCategoria as getCategoriaApi, updateCategory, createCategory, deleteCategory } from '../axios/categorias';
import { getLocalStorage } from '../shared/storage';

export const useCategorias = () => {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [status, setStatus] = useState({ code: 0, message: null });
    const [categoria, setCategoria] = useState(null);

    const listarCategorias = async () => {
        try {
            setLoading(true);
            const response = await getCategoriasApi();
            setCategorias(response);
            setStatus({ code: 200, message: 'ok' });
        } catch (err) {
            setStatus({ code: err.response?.status || 500, message: err.message });
        } finally {
            setLoading(false);
        }
    };

    const buscarCategoria = async (id) => {
        try {
            setLoading(true);
            const response = await getCategoriaApi(id);
            setCategoria(response);
            setStatus({ code: 200, message: 'ok' });
        } catch (err) {
            setStatus({ code: err.response?.status || 500, message: 'Error al buscar categoría' });
        } finally {
            setLoading(false);
        }
    };

    const nuevaCategoria = async (categoryData) => {
        try {
            setLoading(true);
            const dataToSubmit = { ...categoryData };

            if (dataToSubmit.imageFile) {
                dataToSubmit.image = dataToSubmit.imageFile;
            }

            delete dataToSubmit.imageFile;
            delete dataToSubmit.imagePreview;

            const response = await createCategory(dataToSubmit, getLocalStorage('access'));
            const resp = { code: response.status ?? 201, message: 'Categoría creada' }
            setLoading(false);
            setStatus(resp);
            return resp;
        } catch (err) {
            const resp = { code: err.response?.status || 500, message: 'Error al crear la categoría' }
            setLoading(false);
            setStatus(resp);
            return resp;
        }
    };

    const actualizarCategoria = async (categoryData) => {
        try {
            setLoading(true);
            const dataToSubmit = { ...categoryData };

            // If a new image file is present, move it to the 'image' property for FormData
            if (dataToSubmit.imageFile) {
                dataToSubmit.image = dataToSubmit.imageFile;
            }
            
            // Clean up properties that should not be sent to the backend
            delete dataToSubmit.imageFile;
            delete dataToSubmit.imagePreview;
            
            const response = await updateCategory(dataToSubmit, getLocalStorage('access'));
            const resp = { code: response.status ?? 200, message: 'Categoría actualizada' }
            setLoading(false);
            setStatus(resp);
            return resp;
        } catch (err) {
            const resp = { code: err.response?.status || 500, message: 'Error al actualizar la categoría' }
            setLoading(false);
            setStatus(resp);
            return resp;
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            setLoading(true);
            await deleteCategory(id, getLocalStorage('access'));
            const resp = { code: 200, message: 'Categoría eliminada' }
            setLoading(false);
            setStatus(resp);
            return resp;
        } catch (err) {
            const resp = { code: err.response?.status || 500, message: 'Error al eliminar la categoría' }
            setLoading(false);
            setStatus(resp);
            return resp;
        };
    };

    return {
        loading,
        status,
        categorias,
        categoria,
        buscarCategoria,
        listarCategorias,
        actualizarCategoria,
        eliminarCategoria,
        nuevaCategoria,
    };
};
