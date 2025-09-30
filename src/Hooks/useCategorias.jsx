import { useState } from 'react';
import { getCategorias as getCategoriasApi, getCategoria as getCategoriaApi, updateCategory, createCategory, deleteCategory } from '../axios/categorias';
import { getLocalStorage } from '../shared/storage';

export const useCategorias = () => {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [status, setStatus] = useState({ code: 0, message: null });
    const [categoria, setCategoria] = useState(null);

    const listarCategorias = async (searchTerm = '') => {
        try {
            setLoading(true);
            const response = await getCategoriasApi(searchTerm);
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
            setStatus({ code: response.status ?? 201, message: 'Categoría creada' });
        } catch (err) {
            setStatus({ code: err.response?.status || 500, message: 'Error al crear la categoría' });
        } finally {
            setLoading(false);
        }
    };

    const actualizarCategoria = async (categoryData) => {
        try {
            setLoading(true);
            const dataToSubmit = { ...categoryData };
            if (dataToSubmit.imageFile) {
                dataToSubmit.image = dataToSubmit.imageFile;
            }
            delete dataToSubmit.imageFile;
            delete dataToSubmit.imagePreview;
            
            const response = await updateCategory(dataToSubmit, getLocalStorage('access'));
            setStatus({ code: response.status ?? 200, message: 'Categoría actualizada' });
        } catch (err) {
            console.log(err)
            setStatus({ code: err.response?.status || 500, message: 'Error al actualizar la categoría' });
        } finally {
            setLoading(false);
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            setLoading(true);
            await deleteCategory(id, getLocalStorage('access'));
            setStatus({ code: 200, message: 'Categoría eliminada' });
        } catch (err) {
            setStatus({ code: err.response?.status || 500, message: 'Error al eliminar la categoría' });
        } finally {
            setLoading(false);
        }
    };

    const resetStatus = () => {
        setStatus({ code: 0, message: null });
    };


    return {
        loading,
        status,
        categorias,
        categoria,
        resetStatus,
        buscarCategoria,
        listarCategorias,
        actualizarCategoria,
        eliminarCategoria,
        nuevaCategoria,
    };
};
