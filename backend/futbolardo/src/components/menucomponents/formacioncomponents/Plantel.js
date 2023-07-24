import React from 'react'
import { useDispatch } from 'react-redux'
import { cambioJugador } from '../../../store/slices/EquipoTitular'
import argentina from '../../../img/argentina.png'
import chile from '../../../img/chile.png'
import uruguay from '../../../img/uruguay.png'
import brasil from '../../../img/brasil.png'
import bolivia from '../../../img/bolivia.png'
import colombia from '../../../img/colombia.png'
import ecuador from '../../../img/ecuador.png'
import paraguay from '../../../img/paraguay.png'
import peru from '../../../img/peru.png'
import venezuela from '../../../img/venezuela.png'

let cambios = []

function resetCambios(){
  cambios = []
}

const Plantel = (props) => {

  const dispatch = useDispatch()
  
  let jugador_1
  let jugador_2 

  function cambiarJugador(props,cambios){
    cambios.push(props.id)
    
    if(cambios.length === 2){
      jugador_1 = cambios[0]
      jugador_2 = cambios[1]
      resetCambios()
      
      return dispatch(cambioJugador({uno: jugador_1, dos: jugador_2}))
    }
  }

  const colorIndex = props.index
  const fueraDePosicion = props.fueraDePosicion


  return (
    <div className={`grid grid-flow-col grid-cols-5 justify-items-center py-0.4 rounded-md hover:bg-green-500 ${colorIndex % 2 === 0 ? 'color1' : 'color2'} ${fueraDePosicion ? 'border border-red-500' : ''}`} onClick={()=> cambiarJugador(props, cambios)}>
        <span >{props.nombre}</span>
        <span >{props.apellido}</span>
        <span  className={fueraDePosicion ? 'text-red-500 font-bold' : 'text-black' }>{props.posicion}</span>
        <span >{props.valoracion}</span>
        {props.pais === 'AR' ? (
          <img src={argentina} className='max-h-5' />
        ) : props.pais === 'CH' ? (
          <img src={chile} className='max-h-5'/>
        ) : props.pais === 'UR' ? (
          <img src={uruguay} className='max-h-5'/>
        ) : props.pais === 'BR' ? (
          <img src={brasil} className='max-h-5'/>
        ) : props.pais === 'BO' ? (
          <img src={bolivia} className='max-h-5'/>
        ) : props.pais === 'CO' ? (
          <img src={colombia} className='max-h-5'/>
        ) : props.pais === 'EC' ? (
          <img src={ecuador} className='max-h-5'/>
        ) : props.pais === 'PA' ? (
          <img src={paraguay} className='max-h-5'/>
        ) : props.pais === 'PE' ? (
          <img src={peru} className='max-h-5'/>
        ) : props.pais === 'VE' ? (
          <img src={venezuela} className='max-h-5'/>
        ) : (
          <span>{props.pais}</span>
        )}
    </div>
  )
}


export default Plantel

/*
  Cambios - Definimos un array vacio que almacenara los id de los jugadores que se van a cambaiar; 
            en la siguiente linea definimos su reseteo.

  cambiarJugador - Recibe como parametro el jugador que se va a cambiar, y lo agrega al array de cambios.
                 - Si el array de cambios tiene dos jugadores, los asigna a las variables, resetea el array y lo despacha al slice.

  Lo que define el tamaño del componente en general es el 'py' que le asignamos a los jugadores                 
          
*/