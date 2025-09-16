import './LoginForm.scss'

export const LoginForm = (props)=> {
    const { formData,formError, handlerOnChange, handlerButton } = props

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