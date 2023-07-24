import React from 'react'
import RecorriendoTablaPosiciones from './posicionescomponents/RecorriendoTablaPosiciones'
import { useSelector, useDispatch } from 'react-redux';
import { thunkPosiciones } from '../../store/slices/TablaPosiciones/thunkPosiciones';
import RestoResultados from './posicionescomponents/RestoResultados';

var _ = require('underscore');

const TablaPosiciones = () => {

  const dispatch = useDispatch();  
  
  // Hace la consulta a la API y la tabla de posiciones inicial en el store
  dispatch(thunkPosiciones());
  
  const posState = useSelector(state => state.estadisticas.posiciones)
  
  // Convertimos el objeto en un array por el mapeo que se hace en el componente 'RecorriendoTablaPosiciones'
  let posiciones = _.toArray(posState)
  posiciones = _.sortBy(posiciones, 'puntos_equipo').reverse()

  

  return (
    <div className='bg-components-menu border-2 border-black m-2 overflow-hidden'>
        <div className='grid grid-cols-[32%_17%_17%_17%_17%] p-2 justify-center items-center text-center grid-flow-col font-bold border-b-2 border-gray-50 bg-[#EAEAEA]'>
          <span>Equipo</span>
          <span>Partidos</span>
          <span>Puntos</span>
          <span>G+</span>
          <span>G-</span>
        </div>
        <RecorriendoTablaPosiciones posiciones={posiciones}/>
    </div>
  )
}

export default TablaPosiciones

// VER TABLA DE POSICIONES BUNDES

