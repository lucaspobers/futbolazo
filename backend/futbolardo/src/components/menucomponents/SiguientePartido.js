import React, { useEffect, useState } from 'react'
import './style3.css'
import { useDispatch, useSelector } from 'react-redux';
import { getRival, getEquipo } from '../../store/slices/Fecha/sliceFecha';
var _ = require('underscore');

const SiguientePartido = () => {
    
  let fecha = useSelector(state => state.fecha.fecha);
  const dispatch = useDispatch()
  
  let fecha_corriente = fecha - 1

  // Hooks
  const[liga, setLiga] = useState(null);
  const[rivales, setRivales] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/liga-data/')
      .then(res => res.json())
      .then(res => setLiga(res));
  }, [])

  useEffect(() => {
    fetch('http://localhost:8000/calendario-data/')
      .then(res => res.json())
      .then(res => setRivales(res));
  } , [])

  
  // Filtro el equipo que esta en uso
  let mi_equipo = liga?.filter( e => e.en_uso === false ).map( e => e.nombre_equipo )
  
  // Lo convierto de un objeto a un string y corto los excedentes
  let mi_equipo_limpio = JSON.stringify(mi_equipo)
  mi_equipo_limpio = mi_equipo_limpio?.slice(2, -2)

  // Guardo por un lado todas las keys (fechas) y por el otro los valores (partidos) -UNDERSCORE- 
  let fechas = _.keys(rivales)
  let partidos = _.values(rivales?.[fechas[fecha_corriente]])
  let rival = ''

  // Recorro los partidos y donde juegue mi equipo extraigo el rival
  for (let i = 0; i < partidos.length; i++) {
    if (partidos[i].local === mi_equipo_limpio) {
      rival = partidos[i].visitante
    }
    else if (partidos[i].visitante === mi_equipo_limpio) {
      rival = partidos[i].local
    }
  }

  // Envio al state el rival y el equipo
  dispatch(getEquipo(mi_equipo_limpio))
  dispatch(getRival(rival))
  
  return (
    <div className='next-match'>
      <span>Siguiente Partido</span><br/>
      <span>{mi_equipo} vs {rival}</span><br/>
      <span>Fecha {fecha}</span> 
    </div>
  )
}

export default SiguientePartido


/* 
  Filtro - Filtra todos los equipos que tengan en uso 'false' y devuelve el nombre del equipo
          En uso esta en false  momentaneamente. Cuando actualice el login el equipo en uso 
          cambiara a true.

  underscore - Libreria de JS para trabajar con arrays y objetos. En la documentacion se explica
              como usarla a la perfeccion.

  fechas - Tenemos varias variables de fecha 'fecha_corriente'  y 'fecha_actual. 
             * La primera sirve para recorrer la data de la API
             * La segunda define la primera y controla el tiempo.
*/
