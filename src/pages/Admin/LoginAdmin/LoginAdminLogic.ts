import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginAccessToken, loginAdmin }    from '../../../axios/login'
import { validaEmail } from '../../../shared/index'
import { toast } from 'react-toastify';
import { getLocalStorage, setLocalStorage } from '../../../shared/storage'
import { useNavigate } from 'react-router-dom'
import { useUserSession } from '../../../Hooks/useUserSession';
import { setError } from '../../../store/slices/statusSlice';
import { UserClass } from '../../../class/UserClass';
import { AppDispatch, RootState } from '../../../store';

import "./LoginAdmin.scss";

const LoginAdminLogic = () => {
  const [ formData, setFormData ] = useState({email: '',password: ''});
  const [ formError, setFormError ] = useState({email: '',password: ''});
  const [ loading, setLoading ] = useState(true);
  
  const data = useSelector((state: RootState) => state.login);
  const error = useSelector((state: RootState) => state.status);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const user: { userData: UserClass | null, isUserlogued: boolean} = useUserSession();


  useEffect(() => {
    setLoading(false);
    if(error && error.message !== null){
        toast.error('Usuario o contraseña no válida!'); 
        dispatch(setError({message: null, code: null}));       
    }else if(data.isLogged === true){
        setLocalStorage('access', data.access);
        setLocalStorage('refresh', data.refresh);
        navigate('/admin/home');
    }else{
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [data.isLogged, error])

  useEffect(() => {
    if(user.isUserlogued){
      navigate('/admin/home');
    }else if( user.isUserlogued === undefined){
      const access = getLocalStorage('access');
      const refresh = getLocalStorage('refresh');
      if(access && refresh){
        dispatch(loginAccessToken(access, refresh));
      }
    }
    // eslint-disable-next-line
  },[user.isUserlogued])


  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>):void => {        
      setFormData({...formData, [e.target.name]: e.target.value});
      setFormError({...formError, [e.target.name]: e.target.value ? (e.target.name === 'email' && !validaEmail(e.target.value) ? `El email no es válido` : '') : `Campo ${e.target.name} es requerido`});
  }


  const handlerButton = ():void => {
      if(!formData.email || !validaEmail(formData.email)){            
          setFormError({...formError, email: `El email no es válido`});
          return;
      }
      if(formData.email && formData.password ){
        dispatch(loginAdmin(formData));
      }
  }

  return (
    {
      formData,
      formError,
      loading,
      data,
      handlerOnChange,
      handlerButton
    }
  )
}

export default LoginAdminLogic;