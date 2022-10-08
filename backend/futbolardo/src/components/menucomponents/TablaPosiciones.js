import React, {useEffect, useState} from 'react'
import RecorriendoTablaPosiciones from './posicionescomponents/RecorriendoTablaPosiciones'

const TablaPosiciones = () => {

  const[posiciones, setPosiciones] = useState(null);
  
  useEffect(() =>{
    fetch('http://localhost:8000/liga-data/')
      .then(res => res.json())
      .then(res => setPosiciones(res));
  },[])

  return (
    <div className='posiciones-liga-container'>
        <div className='posiciones-liga-titulos'>
          <span>Equipo</span>
          <span>Puntos</span>
          <span>Goles</span>
          <span>Recibidos</span>
        </div>
        <RecorriendoTablaPosiciones posiciones={posiciones}/>
    </div>
  )
}

export default TablaPosiciones