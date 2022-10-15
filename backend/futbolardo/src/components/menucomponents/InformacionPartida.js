import React from 'react'
import { useSelector } from 'react-redux'

const InformacionPartida = () => {

  const valoracion = useSelector(state => state.fecha.valoracion_miEquipo)

  return (
    <div className='game-data'>
        <span>Informacion Partida</span><br/>
        <span>Valoracion Equipo: {valoracion}</span><br/>
        <span>Cohesion del Equipo: Media</span><br/>
        <span>Moral del equipo: Buena</span>
    </div>
  )
}

export default InformacionPartida