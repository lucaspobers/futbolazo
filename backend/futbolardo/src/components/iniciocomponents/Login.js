import React from 'react'
import LoginForm from './LoginForm'
import './style.css'

const Login = () => {
  return (
    <div className='login-container'>
      <h1>Creacion de Equipo</h1>
      <span>Bienvenido a la creacion de equipo</span>
      <LoginForm/>
    </div>
  )
}

export default Login