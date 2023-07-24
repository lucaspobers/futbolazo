import React from 'react'
import { useSelector } from 'react-redux'
import RecorriendoGoleadores from './goleadorescomponents/RecorriendoGoleadores'

const TablaGoleadores = () => {

    const goleadores = useSelector(state => state.estadisticas.goleadores)  
    
    // Hago una copia y lo ordeno de mayor a menor
    let copiaGoleadores =[...goleadores]
    copiaGoleadores.sort((a, b) => parseFloat(b.goles) - parseFloat(a.goles))

  return (
    <div className='bg-components-menu m-2 border-2 border-black overflow-hidden max-h-screen'>
        <div className='grid grid-cols-[40%_40%_20%] p-2 justify-center items-center text-center grid-flow-col font-bold border-b-2 border-gray-50 bg-[#EAEAEA]'>
          <span>Nombre</span>
          <span>Equipo</span>
          <span>Goles</span>
        </div>
        <RecorriendoGoleadores goleadores={copiaGoleadores}/>
    </div>
  )
}

export default TablaGoleadores