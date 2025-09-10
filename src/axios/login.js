import axios from "axios";
import { login } from "../store/slices/loginSlices";
import { setToast } from "../store/slices/toastSlice";
const host = process.env.REACT_APP_BACKEND_URL

export const loginAdmin = (formData) => (dispatch) =>{
    axios.post(`${host}/api/auth/login/`, {email: formData.email, password: formData.password}).then(resp => {
        dispatch(login({access: resp.data.access, refresh: resp.data.refresh}))
    }
    ).catch(error => {
        const msg = error.message === 'Network Error' ? 'Error de conección de red' : 'Usuario o contraseña no válida!';
        dispatch(setToast({toastData:{mensaje: msg, titulo: 'Error de autenticación', tipo: 'bk-error'}}));
    }
    )
}  