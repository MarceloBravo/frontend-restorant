import axios, { AxiosRequestConfig } from 'axios'
import { CategoryClass } from '../class/CategoryClass';
const host = process.env.REACT_APP_BACKEND_URL;

/**
 * Obtiene una lista de categorías, opcionalmente filtrada por un término de búsqueda.
 * @param {string} [searchTerm=''] - Término de búsqueda para filtrar las categorías.
 * @returns {Promise<any[]|any>} Una promesa que se resuelve con la lista de categorías o un array vacío en caso de error.
 */
export const getCategorias = async (searchTerm: string = ''): Promise<any[] | any>=> {
    try{
        const config: AxiosRequestConfig = {};
        if (searchTerm) {
            config.params = { search: searchTerm };
        }
        const resp = await axios.get(host+ '/api/categories/', config);
        // Si la respuesta es un objeto con la propiedad 'results' (común en respuestas paginadas o de búsqueda de DRF),
        // devolvemos solo el array de resultados. De lo contrario, devolvemos la data tal cual.
        if (resp.data && Array.isArray(resp.data.results)) {
            return resp.data.results;
        }
        return resp.data; // Para el caso en que la respuesta ya es un array.
    }catch(err){
        console.log(err);
        return [];
    }
}

/**
 * Obtiene una categoría específica por su ID.
 * @param {number} id - El ID de la categoría a obtener.
 * @returns {Promise<any|any[]>} Una promesa que se resuelve con los datos de la categoría o un array vacío si no se encuentra o hay un error.
 */
export const getCategoria = async (id: number) => {
    try{
        const resp = await axios.get(host+ '/api/categories/'+id);
        return resp.data;
    }catch(err){
        console.log(err);
        return [];
    }
}


/**
 * Actualiza una categoría existente.
 * @param {CategoryClass} category - El objeto de la categoría con los datos actualizados.
 * @param {string} token - El token de autenticación para la solicitud.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos de la categoría actualizada.
 * @throws {Error} Lanza un error si la actualización falla.
 */
export const updateCategory = async (category: CategoryClass, token: string): Promise<any> => {
    try {
        if(typeof category.image === 'string') category.image = null;
        const formData = createForm(category);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const resp = await axios.patch(`${host}/api/categories/${category.id}/`, formData, config);
        return resp.data;
    } catch (err: any) {
        console.error('Error updating category:', err.response?.data || err.message);
        throw err;
    }
}


/**
 * Elimina una categoría por su ID.
 * @param {number} id - El ID de la categoría a eliminar.
 * @param {string} token - El token de autenticación para la solicitud.
 * @returns {Promise<any|null>} Una promesa que se resuelve con los datos de la respuesta o null si ocurre un error.
 */
export const deleteCategory = async (id: number, token: string): Promise<any | null>=> {
    try{
        const config = { headers: { Authorization: `Bearer ${token}` }};
        const resp = await axios.delete(host+ `/api/categories/${id}/`, config);
        return resp.data;
    }catch(err){
        console.log(err);
        return null;
    }
}


/**
 * Crea una nueva categoría.
 * @param {CategoryClass} category - El objeto de la categoría a crear.
 * @param {string} token - El token de autenticación para la solicitud.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos de la categoría creada.
 * @throws {Error} Lanza un error si la creación falla.
 */
export const createCategory = async (category: CategoryClass, token: string): Promise<any> => {
    try {
        const formData = createForm(category);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        const resp = await axios.post(`${host}/api/categories/`, formData, config);
        return resp.data;
    } catch (err: any) {
        console.error('Error creating category:', err.response?.data || err.message);
        throw err;
    }
}


/**
 * Crea un objeto FormData a partir de un objeto de categoría.
 * @param {CategoryClass} category - El objeto de la categoría.
 * @returns {FormData} Un objeto FormData poblado con los datos de la categoría.
 */
const createForm = (category: CategoryClass): FormData => {
    const formData = new FormData();
    for (const id in Object.keys(category)) {
        const fieldName: string = Object.keys(category)[id];
        const value = category[fieldName as keyof CategoryClass];
        
        if (value !== null && value !== undefined) {
            if(value instanceof File) {
                formData.append(fieldName, value, value.name);
            } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                formData.append(fieldName, value);
            }else{
                // Manejo para otros tipos de datos si es necesario
                formData.append(fieldName, JSON.stringify(value));
            }
        }
    }
    return formData;
}

/*
export const uploadCategoryImage = async (imageFile: File, token: string) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        };

        const resp = await axios.post(host + '/api/categories/upload/', formData, config);
        return resp.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
*/