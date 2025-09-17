import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginAdmin }    from '../../../axios/login.js'
import { validaEmail } from '../../../shared'
import { toast } from 'react-toastify';
import { getLocalStorage, setLocalStorage } from '../../../shared/storage.js'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../../../components/Admin'
import { useUser } from '../../../Hooks/useUser.js';
import { setError } from '../../../store/slices/errorSlice.js';

import "./LoginAdmin.scss"

export default function LoginAdmin() {
  const [ formData, setFormData ] = useState({email: '',password: ''})
  const [ formError, setFormError ] = useState({email: '',password: ''})
  const [ loading, setLoading ] = useState(true)
  
  const data = useSelector(state => state.login)
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useUser()


  useEffect(() => {
    setLoading(false)
    if(error.message !== null){
        toast.error('Usuario o contraseña no válida!')   
        dispatch(setError({message: null, code: null}))        
    }else if(data.isLogged === true){
        setLocalStorage('access', data.access)
        setLocalStorage('refresh', data.refresh)
        navigate('/admin/home')
    }else{
      setLoading(false) 
    }
    // eslint-disable-next-line
  }, [data.isLogged, error])

  useEffect(() => {
    if(user.isLogged === undefined){
      navigate('/admin/home')
    }else if( user.isLogged === undefined){
      const access = getLocalStorage('access')
      const refresh = getLocalStorage('refresh')
      if(access && refresh){
        dispatch(loginAdmin({access: access, refresh: refresh}))
      }
    }
    // eslint-disable-next-line
  },[user.isLogged])


  const handlerOnChange = (e) => {        
      setFormData({...formData, [e.target.name]: e.target.value})
      setFormError({...formError, [e.target.name]: e.target.value ? (e.target.name === 'email' && !validaEmail(e.target.value) ? `El email no es válido` : '') : `Campo ${e.target.name} es requerido`})
  }


  const handlerButton = () => {
      if(!formData.email || !validaEmail(formData.email)){            
          setFormError({email: `El email no es válido`})
          return
      }
      if(formData.email && formData.password ){
        dispatch(loginAdmin(formData))
      }
  }

  if(loading || (loading && !data.isLogged))return null

  return (
    <div className='login-admin'>
      <div className='login-admin__container'>
          <h1>Autenticación de usuario</h1>

          <LoginForm 
            formData={formData}
            formError={formError}
            handlerOnChange={handlerOnChange}
            handlerButton={handlerButton}
          />

      </div>
    </div>
  )
}
