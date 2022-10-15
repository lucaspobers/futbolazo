import React, { useEffect } from 'react'
import RecorriendoFormacion from './RecorriendoFormacion'
import { useSelector, useDispatch } from 'react-redux' 
import { titularesThunk } from '../../../store/slices/thunkTitulares'
import { valoracionP1 } from '../../../store/slices/Fecha/sliceFecha'

const _ = require('underscore');

const FormacionMenu = () => {

  // Traemos del state la formacion titular
  let titulares = useSelector ((state) => state.jugadores.equipoTitular)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch (titularesThunk())
  }, [])
  
  // Calculamos la valoracion del equipo
  let valores = _.values(titulares?.map(e => e.valoracion))
  let count = valores.length;
  let sum = 0;

  for (let i = 0; i < count; i++) {
    sum += valores[i];
  }
  let valoracion_general = sum/count

  // Descuentos en la valoracion del equipo por tener jugadores fuera de posicion.
  if (titulares[0]?.posicion !== 'Arquero' ){
    valoracion_general = valoracion_general * 0.6
  }

  for (let i = 1; i < 5; i++) {
    if (titulares[i]?.posicion !== 'Defensor' ){
      valoracion_general = valoracion_general - 5
    }
  }
  
  for (let i = 5; i < 9; i++) {
    if (titulares[i]?.posicion !== 'Mediocampista' ){
      valoracion_general = valoracion_general - 5
    }
  }

  for (let i = 9; i < 11; i++) {
    if (titulares[i]?.posicion !== 'Delantero' ){
      valoracion_general = valoracion_general - 5
    }
  }
  
  // La mandamos la valoracion a la store
  dispatch(valoracionP1(valoracion_general))

  return (
    <div className='plantilla-container'>
      <RecorriendoFormacion jugadores={titulares}/>
    </div>
  )
}

export default FormacionMenu