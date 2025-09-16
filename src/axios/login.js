import axios from "axios";
import { login, setUserData, logOut } from "../store/slices/loginSlices";
import { clearLocalStorage } from "../shared/storage";
import { setError } from "../store/slices/errorSlice";

const host = process.env.REACT_APP_BACKEND_URL

export const loginAdmin = (formData) => (dispatch) =>{
    axios.post(`${host}/api/auth/login/`, {email: formData.email, password: formData.password}).then(resp => {
        dispatch(login({access: resp.data.access, refresh: resp.data.refresh}))
    }
    ).catch(error => {
        setError({message: 'Usuario o contraseña no válida', code: error.response ? error.response.status : '500'}) 
        dispatch(logOut())
    }
    )
}  

export const loginAccessToken = (access, refresh) => (dispatch) =>{
    const data = {headers: {Authorization: "Bearer "+access}}

    axios.get(`${host}/api/auth/me/`, data).then(resp => {
        dispatch(login({access: access, refresh: refresh}))
        dispatch(setUserData(resp.data))
    }).catch(error => {
        const msg = error.message === 'Network Error' ? 'Error de conección de red' : 'Token no válido!';
        dispatch(logOut())
        clearLocalStorage()
        console.log(msg)
    })
} 