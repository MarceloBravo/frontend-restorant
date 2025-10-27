import { MesasClass } from '../class/MesasClass';
import axios from 'axios';
const host = process.env.REACT_APP_BACKEND_URL;

/**
 * Obtiene una mesa por su ID.
 * @param id - El ID de la mesa a obtener.
 * @returns Una promesa que se resuelve con los datos de la mesa.
 */
export const getMesaById = async (id: number): Promise<any> => {
    return axios.get(`${host}/api/tables/${id}/`);
}

/**
 * Lista las mesas, opcionalmente filtradas por una cadena de búsqueda.
 * @param searchString - La cadena de búsqueda para filtrar las mesas.
 * @returns Una promesa que se resuelve con la lista de mesas.
 */
export const listarMesas = async (searchString: string): Promise<any> => {
    const options = searchString ? { params: { search: parseInt(searchString) } } : {};
    return axios.get(`${host}/api/tables/`, options)
}

/**
 * Crea una nueva mesa.
 * @param mesa - El objeto de la mesa a crear.
 * @param token - El token de autenticación.
 * @returns Una promesa que se resuelve con los datos de la mesa creada.
 */
export const crearMesa = async (mesa: MesasClass, token: string): Promise<any> => {
    const formData = prepareData(mesa);
    const config = prepareHeaders(token);
    return axios.post(`${host}/api/tables/`, formData, config);
}

/**
 * Actualiza una mesa existente.
 * @param mesa - El objeto de la mesa a actualizar.
 * @param token - El token de autenticación.
 * @returns Una promesa que se resuelve con los datos de la mesa actualizada.
 */
export const actualizarMesa = async (mesa: MesasClass, token: string): Promise<any> => {
    const formData = prepareData(mesa);
    const config = prepareHeaders(token);
    return axios.put(`${host}/api/tables/${mesa.id}/`, formData, config);
}

/**
 * Elimina una mesa por su ID.
 * @param id - El ID de la mesa a eliminar.
 * @param token - El token de autenticación.
 * @returns Una promesa que se resuelve cuando la mesa es eliminada.
 */
export const eliminarMesa = async (id: number, token: string): Promise<any> => {
    const config = prepareHeaders(token);
    return axios.delete(`${host}/api/tables/${id}/`, config);
}

/**
 * Prepara los encabezados para las solicitudes a la API.
 * @param token - El token de autenticación.
 * @returns El objeto de configuración de los encabezados.
 */
const prepareHeaders = (token: string): any => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token.replace(/^"(.*)"$/, '$1')
        }
    };
    return config;
}

/**
 * Prepara los datos de la mesa para ser enviados en una solicitud.
 * @param mesa - El objeto de la mesa.
 * @returns Un objeto FormData con los datos de la mesa.
 */
const prepareData = (mesa: MesasClass): {number: number, capacity: number, active: boolean} => {
    return {number: mesa.number, capacity: mesa.capacity, active: mesa.active};

    /*
    const formData = new FormData();
    debugger
    for (const key in mesa) {
        const value = mesa[key as keyof MesasClass];
        if (value !== undefined && value !== null) {
            if (value instanceof Blob) {
                formData.append(key, value);
            } else if (value instanceof Date) {
                formData.append(key, value.toISOString());
            } else if (typeof value === 'number' || typeof value === 'boolean') {
                formData.append(key, String(value));
            } else {
                formData.append(key, value as string);
            }
        }
    }
    return formData;
    */
}