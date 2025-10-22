import { LoginForm } from '../../../components/Admin'
import LoginAdminLogic from './LoginAdminLogic.js';

import "./LoginAdmin.scss"

export default function LoginAdmin() {
  const { formData,
          formError,
          loading,
          data,
          handlerOnChange,
          handlerButton } = LoginAdminLogic();

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
