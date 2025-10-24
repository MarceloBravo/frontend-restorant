import axios, { AxiosResponse} from 'axios';
import { setUser, setUsers } from '../store/slices/usersSlices';
import { setError, setStatus } from '../store/slices/statusSlice';
import { UserClass } from '../class/UserClass';

const host = process.env.REACT_APP_BACKEND_URL;

/**
 * Obtiene una lista de usuarios, opcionalmente filtrada por un término de búsqueda.
 * Es un thunk de Redux que despacha acciones para actualizar el estado de los usuarios o manejar errores.
 * @param {string} token - El token de autenticación.
 * @param {string} [searchTerm=''] - Término de búsqueda para filtrar los usuarios.
 * @returns {Function} Un thunk de Redux.
 */
export const getUsers = (token: string, searchTerm: string = '') => (dispatch: any): void=> {
    const config: Object = {
        headers: { Authorization: `Bearer ${token}` },
        params: searchTerm ? {search: searchTerm} : {}
    };
    axios.get(`${host}/api/users/`, config).then((resp: AxiosResponse) => {
        dispatch(setUsers({users: resp.data}));
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch((error: any) => {
        dispatch(setUsers({users: []}));
        dispatch(setError({message: 'Error al cargar los usuarios', code: error.response ? error.response.status : '500'}));
    })
}

/**
 * Obtiene un usuario específico por su ID.
 * Es un thunk de Redux que despacha acciones para actualizar el estado del usuario o manejar errores.
 * @param {number} id - El ID del usuario a obtener.
 * @param {string} token - El token de autenticación.
 */
export const getUserById = (id: number, token: string) => (dispatch: any): void => {
    const config: Object = { headers: { Authorization: `Bearer ${token}` }};    
    axios.get(`${host}/api/users/${id}/`, config).then((resp: AxiosResponse) => {
        dispatch(setUser({user: resp.data}));
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch((error: any) => {
        dispatch(setUser({user: null}));
        dispatch(setError({message: 'Error al obtener el usuario', code: error.response ? error.response.status : '500'}));
    })
}

/**
 * Guarda (crea o actualiza) un usuario.
 * Si el usuario tiene un ID, lo actualiza; de lo contrario, crea uno nuevo.
 * Es un thunk de Redux que despacha acciones para actualizar el estado o manejar errores.
 * @param {UserClass} user - El objeto del usuario a guardar.
 * @param {string} token - El token de autenticación.
 * @returns {Function} Un thunk de Redux.
 */
export const saveUser = (user: UserClass, token: string) => (dispatch: any): void => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    if(user.id) {
        // Actualizar usuario
        axios.put(`${host}/api/users/${user.id}/`, user, config).then((resp: AxiosResponse) => {
            console.log(resp.data);
            dispatch(setUser({user: resp.data}));
            dispatch(setStatus({code: resp.status, message: null}));
        }).catch((error: any) => {
            dispatch(setError({message: 'Error al actualizar el usuario', code: error.response ? error.response.status : '500'}));
        })
    } else {
        // Crear usuario
        axios.post(`${host}/api/users/`, user, config).then((resp: AxiosResponse) => {
            dispatch(setUser({user: resp.data}));
            dispatch(setStatus({code: resp.status, message: null}));
        }
        ).catch((error: any) => {
            dispatch(setError({message: 'Error al crear el usuario', code: error.response ? error.response.status : '500'}));
        })
    }
}

/**
 * Elimina un usuario por su ID.
 * Es un thunk de Redux que despacha acciones para actualizar el estado o manejar errores.
 * @param {number} id - El ID del usuario a eliminar.
 * @param {string} token - El token de autenticación.
 * @returns {Function} Un thunk de Redux.
 */
export const deleteUser = (id: number, token: string) => (dispatch: any): void => {
    const config: Object = { headers: { Authorization: `Bearer ${token}` }};
    axios.delete(`${host}/api/users/${id}/`, config).then((resp: AxiosResponse) => {
        dispatch(setUser({user: null}));
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch((error: any) => {
        dispatch(setError({message: 'Error al eliminar el usuario', code: error.response ? error.response.status : '500'}));
    })
}

/**
 * Obtiene todos los usuarios sin paginación (para filtros, etc.).
 * Es un thunk de Redux que despacha acciones para actualizar el estado de los usuarios o manejar errores.
 * @param {string} token - El token de autenticación.
 * @returns {Function} Un thunk de Redux.
 */
export const getFiltersUsers = (token: string) => (dispatch: any): void => {
    const config: Object = { headers: { Authorization: `Bearer ${token}` }};
    axios.get(`${host}/api/users/`, config).then((resp: AxiosResponse) => {
        dispatch(setUsers({users: resp.data}));
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch((error: any) => {
        dispatch(setUsers({users: []}));
        dispatch(setError({message: 'Error al cargar los usuarios', code: error.response ? error.response.status : '500'}));
    })
}