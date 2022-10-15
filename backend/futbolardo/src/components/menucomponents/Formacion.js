import React, {useEffect} from 'react'
import RecorriendoFormacion from './formacioncomponents/RecorriendoFormacion'
import { useSelector, useDispatch } from 'react-redux';
import { titularesThunk} from '../../store/slices/thunkTitulares'
import { modificarValoracion } from '../../store/slices/EquipoTitular';
import { Link } from 'react-router-dom';


var _ = require('underscore');

const Formacion = () => {
  let titulares = useSelector ((state) => state.jugadores.equipoTitular)
  let suplentes = useSelector ((state) => state.jugadores.equipoSuplente)
  
  let formacionActiva = 442

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(titularesThunk())
  }, [])

  function setFormacion(dibujo){
    formacionActiva = dibujo
  }
  
  if (formacionActiva === 442 && titulares[0]?.posicion !== 'Arquero' ){
    dispatch(modificarValoracion({valoracion: titulares[0]?.valoracion * 0.6, id: titulares[0]?.id}))
  }    

  return (
    <div>
      <div className='dibujo-tactico'>
        <button onClick={()=> setFormacion(442)}>442</button>
        <button onClick={()=> setFormacion(433)}>433</button>
        <button onClick={()=> setFormacion(343)}>343</button>
      </div>
      <div className='plantilla-container-titular'>
        <div className='pct-formacion'>
          <RecorriendoFormacion jugadores={titulares}/>
        </div>
      </div>
      <div className='plantilla-container'>
        <span>Suplentes</span>
        <RecorriendoFormacion jugadores={suplentes}/>
      </div>
        <Link to='/menu'>Menu</Link>
    </div>
  )
}


export default Formacion
