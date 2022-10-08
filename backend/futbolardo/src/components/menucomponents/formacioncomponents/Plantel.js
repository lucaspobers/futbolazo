import React from 'react'
import { useDispatch } from 'react-redux'
import { cambioJugador } from '../../../store/slices/EquipoTitular'

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


  return (
    <div className='formacion' onClick={()=> cambiarJugador(props, cambios)}>
        <span >{props.nombre}</span>
        <span >{props.apellido}</span>
        <span >{props.posicion}</span>
        <span >{props.valoracion}</span>
        <span >{props.pais}</span>
        <br/>
    </div>
  )
}


export default Plantel

/*
  Cambios - Definimos un array vacio que almacenara los id de los jugadores que se van a cambaiar; 
            en la siguiente linea definimos su reseteo.

  cambiarJugador - Recibe como parametro el jugador que se va a cambiar, y lo agrega al array de cambios.
                 - Si el array de cambios tiene dos jugadores, los asigna a las variables, resetea el array y lo despacha al slice.
          
*/