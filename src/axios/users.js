import axios from 'axios';
import { setUsers } from '../store/slices/usersSlices';
import { setError } from '../store/slices/errorSlice';

const host = process.env.REACT_APP_BACKEND_URL;

export const getUsers = (token) => (dispatch)=> {
    const config = { headers: { Authorization: `Bearer ${token}` }};
    axios.get(`${host}/api/users/`, config).then(resp => {
        console.log(resp.data);
        dispatch(setUsers({users: resp.data}));
    }).catch(error => {
        console.log(error);
        dispatch(setUsers({users: []}));
        dispatch(setError({message: 'Error al cargar los usuarios', code: error.response ? error.response.status : '500'}));
    })
}