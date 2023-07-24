import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RecorriendoTablaPosiciones from './posicionescomponents/RecorriendoTablaPosiciones';
import RecorriendoGoleadores from './goleadorescomponents/RecorriendoGoleadores';

var _ = require('underscore');

const Competencias = () => {

    const posState = useSelector(state => state.estadisticas.posiciones)
    const fecha = useSelector(state => state.fecha.fecha);
    let goleadores = useSelector(state => state.estadisticas.goleadores)

    let partidos = fecha - 1;
    
    let posiciones = _.toArray(posState)
    posiciones = _.sortBy(posiciones, 'puntos_equipo').reverse()
    goleadores = _.sortBy(goleadores, 'goles').reverse()

  return (
    <div className='grid grid-cols-2 '>
        <div className='bg-components-menu m-2 p-2 border-2 border-black col-span-2 text-center font-bold bg-[#EAEAEA]'>
          COMPETENCIAS    
        </div>
        <div className='bg-components-menu m-2 border-2 border-black overflow-hidden '>
          <div className='grid grid-cols-[32%_17%_17%_17%_17%] p-2 justify-center items-center text-center grid-flow-col font-bold border-b-2 border-gray-50 bg-[#EAEAEA]'>
            <span>Equipo</span>
            <span>Partidos</span>
            <span>Puntos</span>
            <span>Goles</span>
            <span>Recibidos</span>
          </div>
          <RecorriendoTablaPosiciones posiciones={posiciones}/>
        </div>
        <div className='bg-components-menu m-2 border-2 border-black overflow-hidden'>
          <div className='grid grid-cols-[40%_40%_20%] p-2 text-center border-b-2 border-gray-50 bg-[#EAEAEA]'>
            <span className='font-bold'>Nombre</span>
            <span className='font-bold'>Equipo</span>
            <span className='font-bold'>Goles</span>
          </div>
          <div className='overflow-y-auto max-h-[calc(85vh-3.5rem)]'>
            <RecorriendoGoleadores goleadores={goleadores}/>
          </div>
        </div>
    <Link className='botones-menu col-span-2' to='/menu'>Menu</Link>
    </div>

    
  )
}

export default Competencias

/*
  Ayuda al paso - Lo que determina el tamaño de la tabla es el 'VH' de la tabla de goleadores
    - VH - Calcular segun los elementos que se agreguen
*/

