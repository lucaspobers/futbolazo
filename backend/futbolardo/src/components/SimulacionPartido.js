import React from 'react'
import { useSelector } from 'react-redux';

var _ = require('underscore');

const SimulacionPartido = () => {

    const equipo = useSelector(state => state.fecha.miEquipo)
    const rival = useSelector(state => state.fecha.rival)
    const fecha = useSelector(state => state.fecha.fecha)
    
    // Variables de mi equipo
    const valoracion = useSelector(state => state.fecha.valoracion_miEquipo)
    let moral = 100
    let cohesion = 100
    let local = true
    let forma = 70

    let probabilidad_ganar = ((valoracion + moral + cohesion + forma) / 4)
    if (local) {
        probabilidad_ganar = probabilidad_ganar * 1.05
    }
    
    // Variables del rival
    let valoracion_rival = 65
    let moral_rival = 70
    let cohesion_rival = 80
    let local_rival = false
    let forma_rival = 70

    let probabilidad_ganar_rival = ((valoracion_rival + moral_rival + cohesion_rival + forma_rival) / 4)
    if (local_rival) {
        probabilidad_ganar_rival = probabilidad_ganar_rival * 1.05
    }

    let array_probabilidades = []
    
    // Por cada punto de probabilidad que tenga el equipo, se le suma un 1 al array
    for (let i = 0; i < probabilidad_ganar; i++) {
        array_probabilidades.push('A')
    }

    for (let i = 0; i < probabilidad_ganar_rival; i++) {
        array_probabilidades.push('B')
    }

    // Las probabilidades de empate son el que tenga menor probabilidad de ganar - la diferencia entre ambos
    let empate = 0

    if (probabilidad_ganar > probabilidad_ganar_rival) {
      let diferencia = probabilidad_ganar - probabilidad_ganar_rival
      empate = probabilidad_ganar_rival - diferencia

    } else if (probabilidad_ganar < probabilidad_ganar_rival) {
      let diferencia = probabilidad_ganar_rival - probabilidad_ganar
      empate = probabilidad_ganar - diferencia
    }

    for (let i = 0; i < empate; i++) {
        array_probabilidades.push('C')
    }


    // Se mezcla el array y se extrae un elemento al azar
    array_probabilidades = _.shuffle(array_probabilidades)
    console.log(array_probabilidades)
    let random = _.sample(array_probabilidades)

    let ganador = ''
    
    switch (random) {
      case 'A':
        ganador = equipo 
        break;
      case 'B':
        ganador = rival
        break;
      case 'C':
        ganador = 'Empate'
        break;
      default:
        ganador = 'Partido suspendido por incidentes'
        break;
    }
  
  
  return (
    <div>
        <h2>Fecha: {fecha}</h2>
        <h2>Equipo: {equipo}</h2>
        <h2>Rival: {rival}</h2>
        <h2>GANADOR: {ganador}</h2>
    </div>
  )
}

// window.localStorage.clear()
export default SimulacionPartido


/* 
  Cosas que influyen en el resultado de un partido:
  - Valoracion del equipo
  - Cohesion del equipo (Cuando se juega con jugadores que no estan acostumbrados a jugar juntos)
  - Moral del equipo (Influencia de los ultimos resultados, lesiones, etc)
  - Ultimos resultados
  - Forma del rival (Si viene de ganar o de perder)
  - Jugadores lesionados 
  - Jugadores sancionados
  - Jugadores en forma (Si estan jugando bien o mal)
  - Quien es local o visitante

  - Ver si se puede hacer algo con la formacion
  - Clima (Si esta lloviendo o nevando hacer un partido mas trabado)





*/
