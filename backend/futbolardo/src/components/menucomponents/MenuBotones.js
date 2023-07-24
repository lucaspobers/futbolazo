import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { thunkRivales } from '../../store/slices/thunkRivales'

var _ = require('underscore');


const MenuBotones = () => {

  const dispatch = useDispatch()
  const resultados = useSelector(state => state.estadisticas.resultados)
  const equipo = useSelector(state => state.fecha.miEquipo)
  const rival = useSelector(state => state.fecha.rival)
  
  dispatch(thunkRivales())

  let resultadosRelevantes = []

  // Separo los resultados de los equipos en partidos anteriores
  _.mapObject(resultados, function(val, key) {
    _.mapObject(val, function(val2, key2) {
      if (val2.local === equipo || val2.visitante === equipo) {
        resultadosRelevantes.push(val2)
      }
      else if (val2.local === rival || val2.visitante === rival) {
        resultadosRelevantes.push(val2)
      }
    })
  })

  
  let formaEquipo = []
  let formaRival = []

  // Simplifico los resultados
  _.mapObject(resultadosRelevantes, function(val, key) {
    if (val.local === equipo) {
      if (val.goles_local > val.goles_visitante) {
        formaEquipo.push('V');
      } else if (val.goles_local < val.goles_visitante) {
        formaEquipo.push('D');
      } else {
        formaEquipo.push('E');
      }
    } else if (val.visitante === equipo) {
      if (val.goles_local > val.goles_visitante) {
        formaEquipo.push('D');
      } else if (val.goles_local < val.goles_visitante) {
        formaEquipo.push('V');
      } else {
        formaEquipo.push('E');
      }
    } else if (val.local === rival) {
      if (val.goles_local > val.goles_visitante) {
        formaRival.push('V');
      } else if (val.goles_local < val.goles_visitante) {
        formaRival.push('D');
      } else {
        formaRival.push('E');
      }
    } else if (val.visitante === rival) {
      if (val.goles_local > val.goles_visitante) {
        formaRival.push('D');
      } else if (val.goles_local < val.goles_visitante) {
        formaRival.push('V');
      } else {
        formaRival.push('E');
      }
    }
  })

  const forma = {
    equipo: formaEquipo,
    rival: formaRival
  }
  


  return (
    <div className='bg-green-500 p-2 row-[1/4] inline-flex flex-col max-w-xs bg-gradient-to-t' >
        <Link className='botones-menu' to={{ pathname: '/partido', state: forma }}>Siguiente Partido</Link>
        <Link className= 'botones-menu' to='/formacion'>Formacion</Link>
        <Link className= 'botones-menu' to='/competencias'>Competencias</Link>
        <Link className= 'botones-menu' to='/calendario'>Calendario</Link>
        <Link className= 'botones-menu' to='/fichajes'>Fichajes</Link>
        <button className= 'botones-menu'>Guardar</button>
        <button className= 'botones-menu'>Salir</button>
    </div>
  )
}

// window.localStorage.clear()
export default MenuBotones


/*
  THUNKRIVALES - Determina la formacion del rival, lo hago desde el menu porque si lo incluyo
  dentro del partido, el componente se renderiza dos veces retornando dos resultados distintos.

  Idea CSS  que el fondo sea como el dibujo del cesped de una cancha de futbol

  NO FUNCIONA PASARLE LA FORMA


*/