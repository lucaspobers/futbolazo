import React from 'react'

const Posiciones = (props) => {
  return (
    <div className='posiciones-liga'>
        <span>{props.equipo}</span>
        <span>{props.puntos}</span>
        <span>{props.goles_favor}</span>
        <span>{props.goles_contra}</span>
    </div>
  )
}

export default Posiciones