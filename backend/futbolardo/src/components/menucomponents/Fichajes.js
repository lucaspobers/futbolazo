import React, { useEffect } from 'react'
import Pelota from '../../img/pelota.png'
import { useState} from 'react'
import { Link } from 'react-router-dom'

var _ = require('underscore');

const Fichajes = () => {

  const [cambios, setCambios] = useState('pre_animacion_partido')
  const [isGameStarted, setIsGameStarted] = useState(false);  

  const goleadores = ['Mario Luis', 'Leo Mattioli', 'Pablo Lescano']

  // Asigna un ID a cada elemento del array goleadores
  const diccionario = goleadores.reduce((acc, current, index) =>{
    acc[index + 1] = current;
    return acc;
  }, {})


  // Inicia el partido y la animacion
  const handleStartGame = () => {
    setIsGameStarted(true);
    setTimeout(()=> {
      setCambios('animacion_partido')
    }, "500") 
  };


  return (
      <div>
          {!isGameStarted ? (
          <div>
            <button className='botones-menu text-center' onClick={()=>handleStartGame()}>INICIAR PARTIDO</button>
            {/* <AnimacionGoledores dictionary={showComponent && diccionario} /> */}
          </div>
          ) : (
            <div>
              <div className='mt-40 ml-60 grid grid-cols-[90%_10%] items-center relative max-w-2xl'>
                <div className='border-2 border-black ml-2 max-w-xl max-h-1 bg-black '></div>
                <span className='text-center'>90'</span>
                <img className={cambios} src={Pelota} />
              </div>
              <button className='botones-menu' onClick={()=>setCambios('reversa')}>REVERSA</button>
            </div>

          )}
          <Link className='botones-menu' to='/menu'>MENU</Link>
      </div>

  )
}

export default Fichajes


/*
  Centrar barra sin usar margenes
  {showComponent && goleadoresPrueba} = si showComponent es true, entonces muestra goleadoresPrueba


*/

