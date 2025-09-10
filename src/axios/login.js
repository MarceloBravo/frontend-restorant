import axios from "axios";
import { login } from "../store/slices/loginSlices";
const host = process.env.REACT_APP_BACKEND_URL

export const loginAdmin = (formData) => (dispatch) =>{
    axios.post(`${host}/api/auth/login/`, {email: formData.email, password: formData.password}).then(resp => 
        dispatch(login({access: resp.data.access, refresh: resp.data.refresh}))
    ).catch(error => 
        console.log('error', error)
    )
}  