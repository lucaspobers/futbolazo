import React, {useEffect} from 'react'
import RecorriendoFormacion from './formacioncomponents/RecorriendoFormacion'
import RecorriendoPosiciones from './formacioncomponents/RecorriendoPosiciones'
import RecorriendoSuplentes from './formacioncomponents/RecorriendoSuplentes'
import { useSelector, useDispatch } from 'react-redux';
import { titularesThunk} from '../../store/slices/thunkTitulares'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { setDibujoFormacion } from '../../store/slices/Fecha/sliceFecha';
import { valoracionP1 } from '../../store/slices/Fecha/sliceFecha';


var _ = require('underscore');

const Formacion = () => {

  let formacion = useSelector ((state) => state.fecha.dibujo_formacion)
  const [formacionActiva, setFormacionActiva] = useState(formacion)

  let titulares = useSelector ((state) => state.jugadores.equipoTitular)
  let suplentes = useSelector ((state) => state.jugadores.equipoSuplente)

  let formaciones_disponibles = [442, 433, 343, 352, 541, 532]
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(titularesThunk())
  }, [])


 // Calculamos la valoracion del equipo
  let valores = _.values(titulares?.map(e => e.valoracion))
  let count = valores.length;
  let sum = 0;

  for (let i = 0; i < count; i++) {
    sum += valores[i];
  }
  let valoracion_general = sum/count

  if (titulares[0]?.posicion !== 'Arquero' ){
    valoracion_general = valoracion_general * 0.6
  }


  // Descuento de valoracion por jugadores fuera de posicion
  switch (formacionActiva) {
    case '442':
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
      break;
    case '433':
      for (let i = 1; i < 5; i++) {
        if (titulares[i]?.posicion !== 'Defensor' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 5; i < 8; i++) {      
        if (titulares[i]?.posicion !== 'Mediocampista' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 8; i < 11; i++) {
        if (titulares[i]?.posicion !== 'Delantero' ){
          valoracion_general = valoracion_general - 5
        }
      }
      break;
    case '343':
      for (let i = 1; i < 4; i++) {
        if (titulares[i]?.posicion !== 'Defensor' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 4; i < 8; i++) {
        if (titulares[i]?.posicion !== 'Mediocampista' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 8; i < 11; i++) {
        if (titulares[i]?.posicion !== 'Delantero' ){
          valoracion_general = valoracion_general - 5
        }
      }
      break;
    case '352':
      for (let i = 1; i < 4; i++) {
        if (titulares[i]?.posicion !== 'Defensor' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 4; i < 7; i++) {
        if (titulares[i]?.posicion !== 'Mediocampista' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 7; i < 11; i++) {
        if (titulares[i]?.posicion !== 'Delantero' ){
          valoracion_general = valoracion_general - 5
        }
      }
      break;
    case '541':
      for (let i = 1; i < 6; i++) {
        if (titulares[i]?.posicion !== 'Defensor' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 6; i < 9; i++) {
        if (titulares[i]?.posicion !== 'Mediocampista' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 9; i < 11; i++) {
        if (titulares[i]?.posicion !== 'Delantero' ){
          valoracion_general = valoracion_general - 5
        }
      }
      break;
    case '532':
      for (let i = 1; i < 6; i++) {
        if (titulares[i]?.posicion !== 'Defensor' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 6; i < 9; i++) {
        if (titulares[i]?.posicion !== 'Mediocampista' ){
          valoracion_general = valoracion_general - 5
        }
      }
      for (let i = 9; i < 11; i++) {
        if (titulares[i]?.posicion !== 'Delantero' ){
          valoracion_general = valoracion_general - 5
        }
      }
      break;
    default:
      break;
  }

  // Redondeamos sin decimales
  valoracion_general = Math.round(valoracion_general).toFixed(0)

  // Mandamos la formacion al state
  function dispatchFormacion(formacion){
    setFormacionActiva(formacion)
    dispatch(setDibujoFormacion(formacion))
  }

  const handleFormacionChange = (event) => {
    const valorSeleccionado = event.target.value;
    setFormacionActiva(valorSeleccionado);
    dispatchFormacion(valorSeleccionado);
  };
  
  // Me rompe el juego, capaz ponerlo en un useEffect, o ubiacarlo en otro lado
  // dispatch(valoracionP1(valoracion_general))

  return (
    <div >
      <div className='bg-components-menu m-2 flex justify-around border-2 border-black bg-[#EAEAEA]'>
        <div className='my-4 self-center'>
          <span className='text-lg'>VALORACION GENERAL</span>
          <span className='font-bold text-xl ml-4'>{valoracion_general}</span>
        </div>
        <div className='my-4 flex'>
          <span className='text-lg self-center mr-4'>FORMACION</span>
          <select name="formaciones" id="formaciones" value={formacionActiva} onChange={handleFormacionChange} className='block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring focus:ring-opacity-50'>
            {formaciones_disponibles.map(e => <option value={e}>{e}</option>)}
          </select>
        </div>
      </div>
      <div className='bg-components-menu border-2 border-black m-2 grid grid-cols-[5%_95%]'>
          <RecorriendoPosiciones formacion={formacionActiva}/>
          <RecorriendoFormacion jugadores={titulares}/>
      </div>
      <div className='bg-components-menu border-2 border-black m-2 grid grid-cols-[5%_95%]'>
        <RecorriendoSuplentes/>
        <RecorriendoFormacion jugadores={suplentes}/>
      </div>
        <Link className='botones-menu' to='/menu'>Menu</Link>
    </div>
  )
}


export default Formacion

/*
  <button className={`${formacionActiva === 442 ? 'botones-f-on' : 'botones-f-off'}`} onClick={() => dispatchFormacion(442)}>442</button>

  Esta calculando mal la valoracion general, ni si quiera la esta calculando, no entra al switch
*/
