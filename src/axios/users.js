import axios from 'axios';
import { setUser, setUsers } from '../store/slices/usersSlices';
import { setError, setStatus } from '../store/slices/statusSlice';

const host = process.env.REACT_APP_BACKEND_URL;

export const getUsers = (token, searchTerm = '') => (dispatch)=> {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: searchTerm ? {search: searchTerm} : {}
    };
    axios.get(`${host}/api/users/`, config).then(resp => {
        dispatch(setUsers({users: resp.data}));
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch(error => {
        dispatch(setUsers({users: []}));
        dispatch(setError({message: 'Error al cargar los usuarios', code: error.response ? error.response.status : '500'}));
    })
}

export const getUserById = (id, token) => (dispatch) => {
    const config = { headers: { Authorization: `Bearer ${token}` }};    
    axios.get(`${host}/api/users/${id}/`, config).then(resp => {
        dispatch(setUser({user: resp.data}));
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch(error => {
        dispatch(setUser({user: null}));
        dispatch(setError({message: 'Error al obtener el usuario', code: error.response ? error.response.status : '500'}));
    })
}

export const saveUser = (user, token) => (dispatch) => {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    if(user.id) {
        // Actualizar usuario
        axios.put(`${host}/api/users/${user.id}/`, user, config).then(resp => {
            console.log(resp.data);
            dispatch(setUser({user: resp.data}));
            dispatch(setStatus({code: resp.status, message: null}));
        }).catch(error => {
            dispatch(setError({message: 'Error al actualizar el usuario', code: error.response ? error.response.status : '500'}));
        })
    } else {
        // Crear usuario
        axios.post(`${host}/api/users/`, user, config).then(resp => {
            console.log(resp.data);
            dispatch(setUser({user: resp.data}));
            dispatch(setStatus({code: resp.status, message: null}));
        }
        ).catch(error => {
            dispatch(setError({message: 'Error al crear el usuario', code: error.response ? error.response.status : '500'}));
        })
    }
}

export const deleteUser = (id, token) => (dispatch) => {
    debugger
    const config = { headers: { Authorization: `Bearer ${token}` }};
    axios.delete(`${host}/api/users/${id}/`, config).then(resp => {
        dispatch(setUser({user: null}));
        console.log('RESPONSE => ',resp.status);
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch(error => {
        dispatch(setError({message: 'Error al eliminar el usuario', code: error.response ? error.response.status : '500'}));
    })
}

export const getFiltersUsers = (token) => (dispatch)=> {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    axios.get(`${host}/api/users/`, config).then(resp => {
        dispatch(setUsers({users: resp.data}));
        dispatch(setStatus({code: resp.status, message: null}));
    }).catch(error => {
        console.log(error);
        dispatch(setUsers({users: []}));
        dispatch(setError({message: 'Error al cargar los usuarios', code: error.response ? error.response.status : '500'}));
    })
}