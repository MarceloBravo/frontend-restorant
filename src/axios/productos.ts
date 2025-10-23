import axios from "axios"
import { ProductoClass } from "../class/ProductoClass";
const host = process.env.REACT_APP_BACKEND_URL;

/**
 * Obtiene un producto específico por su ID.
 * @param {number} id - El ID del producto a obtener.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos del producto.
 */
export const getProductById = (id: number): Promise<any> => {
    return axios.get(host + '/api/products/' + id + '/');
}


/**
 * Obtiene una lista de productos, opcionalmente filtrada por un término de búsqueda.
 * @param {string} [searchTerm=''] - Término de búsqueda para filtrar los productos.
 * @returns {Promise<any>} Una promesa que se resuelve con la lista de productos.
 */
export const getProducts = (searchTerm: string = ''): Promise<any> => {
    let options = {};
    if (searchTerm) {
        options = { params: { search: searchTerm } };
    }
    return axios.get(host + '/api/products/', options);
}


/**
 * Crea un nuevo producto.
 * @param {ProductoClass} product - El objeto del producto a crear.
 * @param {string} token - El token de autenticación.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos del producto creado.
 */
export const createProduct = async (product: ProductoClass, token: string): Promise<any> => {
    const {formData, config} = configData(product, token);
    return axios.post(host + '/api/products/', formData, config);
}


/**
 * Actualiza un producto existente.
 * @param {any} product - El objeto del producto con los datos actualizados.
 * @param {string} token - El token de autenticación.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos del producto actualizado.
 */
export const updateProduct = async (product: any, token: string): Promise<any> => {
    const {formData, config} = configData(product, token);
    return axios.put(host + '/api/products/' + product.id + '/', formData, config);
}


/**
 * Elimina un producto por su ID.
 * @param {number} id - El ID del producto a eliminar.
 * @param {string} token - El token de autenticación.
 * @returns {Promise<any>} Una promesa que se resuelve al completar la eliminación.
 */
export const deleteProduct = async (id: number, token: string) => {
    const {config} = configData(null, token);
    return axios.delete(host + '/api/products/' + id + '/', config);
}


/**
 * Prepara los datos y la configuración para las solicitudes de productos (crear/actualizar).
 * @param {ProductoClass | any} data - Los datos del producto.
 * @param {string} token - El token de autenticación.
 * @returns {{formData: FormData, config: any}} Un objeto que contiene el FormData y la configuración de la solicitud.
 */
const configData = (data: ProductoClass | any, token: string): {formData: FormData, config: any} => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer '+token.replace(/^"(.*)"$/, '$1')
        }
    }
    const formData = new FormData();
    for(const key in data){
        if (data[key] === undefined || data[key] === null) {
            continue;
        }

        if (key === 'image') {
            if (data[key] instanceof File) {
                formData.append('image', data[key]);
            }
        } else if (key === 'category') {
            formData.append('category', (data[key]).toString());
        } else {
            formData.append(key, data[key]);
        }
    }
    return {formData, config};
}