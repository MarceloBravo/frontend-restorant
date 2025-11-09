import axios, { AxiosResponse} from 'axios';
import { login, setUserData, logOut } from "../store/slices/loginSlices";
import { clearLocalStorage } from "../shared/storage";
import { setError, setStatus } from "../store/slices/statusSlice";
import { formDataInterface } from '../interfaces/axios/FormDataInterface';

const host = process.env.REACT_APP_BACKEND_URL

/**
 * Realiza el login de un administrador.
 * Es un thunk de Redux que despacha acciones para manejar el estado de la autenticación.
 * @param {formDataInterface} formData - Objeto con el email y la contraseña del usuario.
 * @returns {Function} Un thunk de Redux.
 */
export const loginAdmin = (formData: formDataInterface) => (dispatch: any): void => {
    axios.post(`${host}/api/auth/login/`, { email: formData.email, password: formData.password }).then((resp: AxiosResponse) => {
        dispatch(login({ access: resp.data.access, refresh: resp.data.refresh }))
        dispatch(setStatus(null));
    }
    ).catch((error: any) => {
        setError({ message: 'Usuario o contraseña no válida', code: error.response ? error.response.status : '500' })
        dispatch(logOut())
    }
    )
}

/**
 * Realiza el login usando un token de acceso existente para obtener los datos del usuario.
 * Es un thunk de Redux que despacha acciones para actualizar el estado del usuario y la autenticación.
 * @param {string} accessToken - El token de acceso del usuario.
 * @param {string} refresh - El token de refresco del usuario.
 * @returns {Function} Un thunk de Redux.
 */
export const loginAccessToken = (accessToken: string, refresh: string) => (dispatch: any): void => {
    const data = { headers: { Authorization: "Bearer " + accessToken } }

    axios.get(`${host}/api/auth/me/`, data).then((resp: AxiosResponse) => {
        dispatch(login({ access: accessToken, refresh: refresh }))
        dispatch(setUserData(resp.data))
    }).catch((error: Error) => {
        const msg = error.message === 'Network Error' ? 'Error de conección de red' : 'Token no válido!';
        dispatch(logOut())
        clearLocalStorage()
        setError({ message: msg, code: '500' })
    })
}