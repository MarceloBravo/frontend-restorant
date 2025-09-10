import React from 'react'
import { LoginForm } from '../../../components/Admin'
import "./LoginAdmin.scss"

export default function LoginAdmin() {
  return (
    <div className='login-admin'>
      <div className='login-admin__container'>
          <h1>Autenticación de usuario</h1>
          <LoginForm/>
      </div>
    </div>
  )
}
