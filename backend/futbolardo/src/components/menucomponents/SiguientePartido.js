import React, { useEffect, useState } from 'react'
import './style3.css'
import { useDispatch, useSelector } from 'react-redux';
import { getRival, getEquipo } from '../../store/slices/Fecha/sliceFecha';
var _ = require('underscore');

const SiguientePartido = () => {
    
  let fecha = useSelector(state => state.fecha.fecha);
  let valoracion = useSelector(state => state.fecha.valoracion_miEquipo)
  let dibujoTactico = useSelector(state => state.fecha.dibujo_formacion)

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
    <div className=' bg-components-menu flex flex-row m-2 p-2 border-2 border-black justify-around col-start-2 col-span-2 min-w-max items-center'>
      <span >{mi_equipo} vs {rival}</span>
      <span >Fecha {fecha}</span> 
      <span>Valoracion Equipo {valoracion}</span>
      <span>Dibujo tactico {dibujoTactico}</span>
      <span>Moral del equipo: Buena</span>
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
  
  PROBLEMA - Yo puse el ´en_uso' de manera manual, por lo tanto si esto no lo hace el usuario
              no va a funcionar. En un futuro tengo que actualizarlo.
*/
