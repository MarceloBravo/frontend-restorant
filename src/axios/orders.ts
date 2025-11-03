import axios from 'axios'
import { OrdersClass } from '../class/OrdersClass';
import { prepareHeaders } from '../shared/axios';
const host = process.env.REACT_APP_BACKEND_URL;

/**
 * Obtiene una orden específica por su ID.
 * @param {number} id - El ID de la orden a obtener.
 * @returns {Promise<OrdersClass>} Una promesa que se resuelve con los datos de la orden.
 */
export const getOrdersById = (id: number): Promise<OrdersClass> => {
    return axios.get(host + '/api/orders/' + id + '/')
}


/**
 * Obtiene una lista de órdenes, opcionalmente filtrada por un término de búsqueda.
 * @param {string} [searchTerm=''] - Término de búsqueda para filtrar las órdenes.
 * @returns {Promise<OrdersClass[]>} Una promesa que se resuelve con la lista de órdenes.
 */
export const listarOrdenes = (searchTerm: string = ''): Promise<any[]> => {
    console.log(host + '/api/orders/'+searchTerm);
    return axios.get(host + '/api/orders/'+searchTerm);
}


/**
 * Crea una nueva orden.
 * @param {OrdersClass} order - El objeto de la orden a crear.
 * @param {string} token - El token de autenticación para la solicitud.
 * @returns {Promise<OrdersClass>} Una promesa que se resuelve con los datos de la orden creada.
 */
export const crearOrden = (order: OrdersClass, token: string): Promise<OrdersClass> => {
    const headers = prepareHeaders(token);
    const data = { ...order };
    return axios.post(host + '/api/orders/', data, headers);
}


/**
 * Actualiza una orden existente.
 * @param {OrdersClass} order - El objeto de la orden con los datos actualizados.
 * @param {string} token - El token de autenticación para la solicitud.
 * @returns {Promise<OrdersClass>} Una promesa que se resuelve con los datos de la orden actualizada.
 */
export const actualizarOrden = (order: OrdersClass, token: string): Promise<OrdersClass> => {
    const headers = prepareHeaders(token);
    const data = { ...order };
    return axios.put(host + '/api/orders/' + order.id + '/', data, headers);
}

/**
 * Elimina una orden por su ID.
 * @param {number} id - El ID de la orden a eliminar.
 * @param {string} token - El token de autenticación para la solicitud.
 * @returns {Promise<any>} Una promesa que se resuelve cuando la orden ha sido eliminada.
 */
export const eliminarOrden = (id: number, token: string): Promise<any> => {
    const headers = prepareHeaders(token);
    return axios.delete(host + '/api/orders/' + id + '/', headers);
}