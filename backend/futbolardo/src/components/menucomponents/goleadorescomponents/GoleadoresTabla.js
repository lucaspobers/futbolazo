import React from 'react'

const GoleadoresTabla = (props) => {

  const colorIndex = props.index
  
  return (
    <div className={`renglon grid grid-cols-[40%_40%_20%] py-1 justify-center items-center grid-flow-col text-center max-h-10 ${colorIndex % 2 === 0 ? 'color1' : 'color2'}`}>
        <span>{props.nombre}</span>
        <span>{props.equipo}</span>
        <span>{props.goles}</span>
    </div>
  )
}

export default GoleadoresTabla