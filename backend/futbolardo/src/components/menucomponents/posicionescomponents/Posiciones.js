import React from 'react'
import { useSelector } from 'react-redux'

const Posiciones = (props) => {

  let fecha = useSelector(state => state.fecha.fecha);
  let miEquipo = useSelector(state => state.fecha.miEquipo);
  let mismoEquipo = props.equipo === miEquipo;


  let partidos = fecha - 1;

  const colorIndex = props.index


  return (
    <div className={`renglon grid grid-cols-[32%_17%_17%_17%_17%] py-1 justify-center items-center grid-flow-col text-center ${mismoEquipo ? 'border-l-4 border-gray-400' : '' } ${colorIndex % 2 === 0 ? 'color1' : 'color2'}`}>
        <a href={`/rivales/${props.equipo}`}>
          <span>{props.equipo}</span>
        </a>
        <span>{partidos}</span>
        <span>{props.puntos}</span>
        <span>{props.goles_favor}</span>
        <span>{props.goles_contra}</span>
    </div>
  )
}

export default Posiciones