import React from 'react'
import './iniciocomponents/style.css'
import { Link } from 'react-router-dom'

const Inicio = () => {
  
  
  return (
    <div className='inicio-container'>
        <h1 className='inicio-title'>Futbolardo</h1>
        <Link className='inicio-button' to="/login">Nueva Partida</Link>
        <h4 className='inicio-button'>Cargar Partida</h4>
        <h4 className='inicio-button'>Opciones</h4>
        <h4 className='inicio-button'>Salir</h4>
    </div>
  )
}

export default Inicio