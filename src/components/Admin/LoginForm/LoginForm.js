import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  loginAdmin }    from '../../../axios/login.js'
import { validaEmail } from '../../../shared'
import './LoginForm.scss'

export const LoginForm = ()=> {
    const [ formData, setFormData ] = useState({email: '',password: ''})
    const [ formError, setFormError ] = useState({email: '',password: ''})
    const data = useSelector(state => state.login)
    const dispatch = useDispatch()


    useEffect(() => {
        if(data?.isLogged === true){
            console.log('usuario logueado exitosamente', data)
        }
    }, [data])


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
            console.log('formData', formData)
            dispatch(loginAdmin(formData))
        }
    }



  return (
    <div className='login-form'>
        <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="form-control" 
            onChange={e => handlerOnChange(e)}
            value={formData.email}/>
        {formError.email && <label className='error'>{formError.email}</label>}
            
        <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="form-control" 
            onChange={e => handlerOnChange(e)}
            value={formData.password}
        />
        {formError.password && <label className='error'>{formError.password}</label>}

        <button 
            onClick={handlerButton} 
            className="btn btn-primary" 
            type='button' 
            disabled={!formData.email || !formData.password}
        >
            Ingresar
        </button>
    </div>
  )
}