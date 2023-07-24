import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementFecha } from '../store/slices/Fecha/sliceFecha';
import { getResultado } from '../store/slices/Fecha/sliceFecha';
import { updatePosiciones } from '../store/slices/Estadisticas/sliceEstadisticas';
import { thunkRestoEquipos } from '../store/slices/Estadisticas/thunkRestoEquipos';
import { setGolesPorFecha } from '../store/slices/Estadisticas/sliceEstadisticas';
import Pelota from '../img/pelota.png'
import { thunkGoleadores } from './partidocomponents/thunkGoleadores';
import BarraPartido from './partidocomponents/BarraPartido';

var _ = require('underscore');

const SimulacionPartido = () => {

    // Codigo que se ejecuta luego de presionar 'Iniciar partido'
    const [ejecutarCodigo, setEjecutarCodigo] = useState(false)
    const [activarDispatch, setActivarDispatch] = useState(false)
    const [cssDinamico , setCssDinamico] = useState('text-xl font-bold ml-2 opacity-0')

    // Luego del timeout se muestran los goles y se ejecuta los dispatch
    useEffect(() => {
      if (ejecutarCodigo) {
        setTimeout(() => {
          setCssDinamico('text-xl font-bold ml-2');
          setActivarDispatch(true)
        }, '1000');
      }
    }, [ejecutarCodigo]);

    // Era 5500 
    
    const equipo = useSelector(state => state.fecha.miEquipo)
    const rival = useSelector(state => state.fecha.rival)
    const fecha = useSelector(state => state.fecha.fecha)
    const formacion = useSelector(state => state.jugadores.equipoTitular)
    const formacion_rival = useSelector(state => state.fecha.formacion_rival)

    const dispatch = useDispatch()
    
    // Variables de mi equipo
    const valoracion = useSelector(state => state.fecha.valoracion_miEquipo)
    let moral = 100
    let cohesion = 100
    let local
    let forma = 70

    // Variables del rival
    let valoracion_rival = 65
    let moral_rival = 70
    let cohesion_rival = 80
    let local_rival
    let forma_rival = 70
    
    // Si la fecha es impar mi equipo juega de local
    fecha % 2 === 0 ? local = false : local = true
    fecha % 2 === 1 ? local_rival = true : local_rival = false


    let probabilidad_ganar = ((valoracion + moral + cohesion + forma) / 4)
    if (local) {
        probabilidad_ganar = probabilidad_ganar * 1.05
    }

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
    let random = _.sample(array_probabilidades)

    let ganador
    let goles_equipo
    let goles_rival
    
    
    if (activarDispatch){
      switch (random) {
        case 'A':
          ganador = equipo
          goles_equipo = Math.floor(Math.random() * 4) + 1
          goles_rival = Math.floor(Math.random() * goles_equipo)
          dispatch(getResultado({resultado: ganador, goles_local: goles_equipo, goles_visitante: goles_rival}))
          dispatch(updatePosiciones({equipo: equipo, rival: rival, ganador: ganador, goles_local: goles_equipo, goles_rival: goles_rival}))
          break;
        case 'B':
          ganador = rival
          goles_rival = Math.floor(Math.random() * 4) + 1
          goles_equipo = Math.floor(Math.random() * goles_rival)
          dispatch(getResultado({resultado: ganador, goles_local: goles_equipo, goles_visitante: goles_rival}))
          dispatch(updatePosiciones({equipo: equipo, rival: rival, ganador: ganador, goles_local: goles_equipo, goles_rival: goles_rival}))
          break;
        case 'C':
          ganador = 'Empate'
          goles_equipo = Math.floor(Math.random() * 3)
          goles_rival = goles_equipo
          dispatch(getResultado({resultado: ganador, goles_local: goles_equipo, goles_visitante: goles_rival}))
          dispatch(updatePosiciones({equipo: equipo, rival: rival, ganador: ganador, goles_local: goles_equipo, goles_rival: goles_rival}))
          break;
        default:
          ganador = 'Partido suspendido por incidentes'
          break;
      }
    }
    
    // Ponemos las posiciones de aquellos jugadores que estan jugando
    let posicionesRival = []
    let poscionesLocal = []
    
    _.mapObject(formacion, function(val, key) {
      switch (val.posicion) {
        case 'Arquero':
          poscionesLocal.push('ARQ')
          break;
        case 'Defensor':
          poscionesLocal.push('DEF')
          break;
        case 'Mediocampista':
          poscionesLocal.push('MED')
          break;
        case 'Delantero':
          poscionesLocal.push('DEL')
          break;
      }
    })
    
    _.mapObject(formacion_rival, function(val, key) {
      switch (val.posicion) {
        case 'Arquero':
          posicionesRival.push('ARQ')
          break;
        case 'Defensor':
          posicionesRival.push('DEF')
          break;
        case 'Mediocampista':
          posicionesRival.push('MED')
          break;
        case 'Delantero':
          posicionesRival.push('DEL')
          break;
      }
    })
    
  
    // Goleadores
    const createDistribution = (weights, size) => {
      const distribution = [];
      const sum = weights.reduce((a, b) => a + b);
      const quant = size / sum;
      
      for (let i = 0; i < weights.length; ++i) {
          const limit = quant * weights[i];
          for (let j = 0; j < limit; ++j) {
              distribution.push(i);
          }
      }
      return distribution;
    };

    const randomIndex = (distribution) => {
      const index = Math.floor(distribution.length * Math.random());
      return distribution[index];
    };

    const randomItem = (array, distribution) => {
      const index = randomIndex(distribution);
      return array[index];
    };

    // Dependiendo el 'weight' de cada jugador, es la probabilidad que tiene de hacer un gol
    const array = formacion
    const weights = [0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2];

    const distribution = createDistribution(weights, 10);

    let goleadores = []
    let goleadores_rival = []
    let jugador = []
    
    
    for (let i = 0; i < goles_equipo; ++i) {
        goleadores.push(randomItem(array, distribution))
    }
    
    if (goles_equipo > 0) {
      goleadores.map((goleador) => {
        if (goleador && goleador.nombre && goleador.apellido) {
          jugador = [...jugador, goleador.nombre + ' ' + goleador.apellido];
        }
      });
    }

    for (let i = 0; i < goles_rival; ++i) {
      goleadores_rival.push(randomItem(formacion_rival, distribution))
    }

    if (goles_rival > 0) {
      goleadores_rival.map((goleador) => {
        if (goleador && goleador.nombre && goleador.apellido) {
          jugador = [...jugador, goleador.nombre + ' ' + goleador.apellido];
        }
      });
    }
    
    // Creamos un objeto para pasarlo por el thunk
    let resultado_equipo 
    
    switch (local){
      case true:
        resultado_equipo = {
          partido_10:{      
            local: equipo,
            goles_local: goles_equipo,
            goles_visitante: goles_rival,
            visitante: rival}
        }
        break;
      case false:
        resultado_equipo = {
          partido_10:{
            local: rival,
            goles_local: goles_rival,
            goles_visitante: goles_equipo,
            visitante: equipo}
        }
        break;
      default:
        break;
      }

      // Goles por fecha para la forma de los jugadores y el calendario
      let golesPorFecha = []
      
      _.mapObject(goleadores, function(val, key) {
        golesPorFecha.push({
          nombre: val.nombre + ' ' + val.apellido,
          equipo: equipo
        })
      });

      _.mapObject(goleadores_rival, function(val, key) {
        golesPorFecha.push({
          nombre: val.nombre + ' ' + val.apellido,
          equipo: rival
        })
      })
    
    // Se determinan los resultados restantes de la jornada (Le paso el resultado de mi equipo como parametro)
    if (activarDispatch){        
      dispatch(thunkRestoEquipos(resultado_equipo))
      dispatch(thunkGoleadores(goleadores, goleadores_rival))
      dispatch(setGolesPorFecha({fecha: fecha, goleadores: golesPorFecha}))
    }

    
  return (
    <div className='grid grid-cols-2 justify-items-center'>
      <h2 className='col-span-2 my-2 py-2 font-bold text-xl'>Fecha {fecha}</h2>
      <div className='contenedor-partido'>
        <div className='col-span-2 grid grid-cols-2 w-[80vh] justify-items-center rounded-md bg-[#EAEAEA]'>
          <div className='flex flex-row my-2 py-2 col-start-1'>
            <h2 className='text-xl font-bold '>{equipo}</h2>
            <h2 className={cssDinamico}>{goles_equipo}</h2>
          </div>
          <div className='flex flex-row my-2 py-2 col-start-2'>
            <h2 className='text-xl font-bold'>{rival}</h2>
            <h2 className={cssDinamico}>{goles_rival}</h2>
          </div>  
        </div>
        <div className='w-full border-r-2 '>
          {_.map(formacion, (jugador, index) => {
            return (
              <div className={`grid grid-cols-[20%_50%_30%] col-start-1 rounded-md ${index % 2 === 0 ? 'color1' : 'color2'}`} key={jugador.id}>
                <h3 className='border-r-2 text-center self-center' >{poscionesLocal[index]}</h3>
                <h3 className='py-1 ml-2'>{jugador.nombre} {jugador.apellido}</h3>
                <div className='flex justify-end'>
                  {_.map(goleadores, (goleador) => {
                      if (goleador.id === jugador.id) {
                          return <img src={Pelota} className='max-h-5 col-start-2 row-start-1 mr-6 self-center' />
                      }
                      else {
                          return null
                      }
                  })}  
                </div>
              </div>
            )
          })}
        </div>
        <div className='w-full' >
          {_.map(formacion_rival, (jugador, index) => {
            if (jugador && jugador.nombre) {
              return (
                <div className={`grid grid-cols-[20%_50%_30%] col-start-2 rounded-md ${index % 2 === 0 ? 'color1' : 'color2'}`} key={jugador.id}>
                  <h3 className='border-r-2 text-center self-center'>{posicionesRival[index]}</h3>
                  <h3 className='py-1 ml-2'>{jugador.nombre} {jugador.apellido}</h3>
                  <div className='flex justify-end'>
                    {_.map(goleadores_rival, (goleador) => {
                      if (goleador && goleador.id === jugador.id) {
                        return <img src={Pelota} className='max-h-5 col-start-2 row-start-1 mr-6 self-center' />
                      }
                      else {
                        return null
                      }
                    })}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div> 
      {!ejecutarCodigo && (
        <button className='botones-menu col-span-2 m-4' onClick={() => setEjecutarCodigo(true)}>INICIAR PARTIDO</button>
      )}
      {ejecutarCodigo && (
        <div className='col-span-2 mt-8'>
          <div className='flex justify-center'>
            <BarraPartido ejecutarCodigo={ejecutarCodigo}/>
          </div>
          <div className='flex justify-center'>
            <Link className='botones-menu w-1/6 m-4' to='/menu' onClick={()=> dispatch(incrementFecha())}>Menu</Link>
          </div>
        </div>
      )}
    </div>
  )
}

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

  ESTADO DE SITUACION:
    - Podria hacer una animacion para que caiga papel picado cuando se hace un gol / se gana
    - Podria hacer que mientras se vaya cargando la barra del partido aparezca otras barras
      con la posesion de la pelota, los tiros al arco, etc
    - Creo que el mr-6 de las pelotas generaria un problema si un jugador hace 4 goles




  */
