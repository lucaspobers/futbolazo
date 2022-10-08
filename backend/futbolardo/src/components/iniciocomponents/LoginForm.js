import React from 'react'

const LoginForm = () => {
  return (
    <form>
        <input 
            name="user"
            type="text"
            placeholder="Usuario"/>
        <br/>
        <input 
            name="password" 
            type="text" 
            placeholder="Contraseña"/>
        <br/>
        <input 
            name='teamName'
            type='text'
            placeholder='Nombre de Equipo'/>
        <br/>
        <input 
            type="submit"  
            placeholder='Enviar'/>         
    </form>
  )
}

export default LoginForm