import React from 'react'
import Boton from './Boton'
import { incrementFecha } from '../../store/slices/Fecha/sliceFecha'
import { useDispatch } from 'react-redux'

const MenuBotones = () => {

  const dispatch = useDispatch()
  return (
    <div className='menu'>
        <button onClick={()=> dispatch(incrementFecha())}>Siguiente Partido</button><br/>
        <button>Competencias</button><br/>
        <button>Calendario</button><br/>
        <button>Fichajes</button><br/>
        <button>Guardar</button><br/>
        <button>Salir</button><br/>
    </div>
  )
}

export default MenuBotones