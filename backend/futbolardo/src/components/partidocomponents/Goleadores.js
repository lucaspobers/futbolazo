import React from 'react'
import { setGoleadores } from '../../store/slices/Estadisticas/sliceEstadisticas';
import { useDispatch, useEffect } from 'react-redux';
import Fichajes from '../menucomponents/Fichajes';


const Goleadores = (props) => {
    const goleadores = props.goleadores
    const dispatch = useDispatch()

    goleadores.map((goleador) => {
        dispatch(setGoleadores(goleador))
    })

  return (
    <div>
        {goleadores.map((goleador, index) => (
            <h2 key={index}>{goleador}</h2>
        ))}
    </div>
  )
}

export default Goleadores

/*
  Se resuelve el tema de la mala inclusión de los goleadores en el store, pero de todas formas

*/