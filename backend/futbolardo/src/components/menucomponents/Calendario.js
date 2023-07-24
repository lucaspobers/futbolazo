import React, { useEffect, useState } from 'react'
import RecorriendoCalendario from './calendariocomponents/RecorriendoCalendario'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import flechaD from '../../img/flechaDer.png'
import flechaI from '../../img/flechaIzq.png'

var _ = require('underscore');

const Calendario = () => {

    const [calendario, setCalendario] = useState(null)
    const [indicador, setIndicador] = useState(1)
    const fecha = useSelector(state => state.fecha.fecha)
    const resultados = useSelector(state => state.estadisticas.resultados)
    const golesPorFecha = useSelector(state => state.estadisticas.golesxfecha)

    useEffect(() =>{
        fetch('http://localhost:8000/calendario-data/')
            .then(res => res.json())
            .then(res => setCalendario(res))
    },[])

    // No deja que baje de 1 o suba de 19
    if (indicador >= 20) {
      setIndicador(1)
    }
    else if (indicador <= 0) {
      setIndicador(19)
    }


    
  
  return (
    <div className='flex flex-col items-center text-center'>
      <span className='p-2 m-2'>Calendario</span>
      <div className='bg-components-menu border-2 border-black'> 
        <div className='flex justify-around p-3 font-bold border-b-2 border-gray-50 rounded-md bg-[#EAEAEA]'>
          <button className='mx-2' onClick={()=> setIndicador(indicador - 1)}><img src={flechaI} className='max-h-8' /></button>
          <span className='py-1'>Fecha {indicador}</span>
          <button className='mx-2' onClick={()=> setIndicador(indicador + 1)}><img src={flechaD} className='max-h-8'/></button>
        </div>
        
        <RecorriendoCalendario 
          calendario={calendario} 
          indicador={indicador} 
          fecha={fecha}
          resultados={resultados}
          golesxfecha={golesPorFecha}/>
      </div>
      <Link className='botones-menu m-4 max-w-min ' to='/menu'>Menu</Link>
    </div>
  )
}


export default Calendario
