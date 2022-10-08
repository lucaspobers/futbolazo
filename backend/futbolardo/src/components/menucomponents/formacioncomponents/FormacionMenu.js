import React, { useEffect } from 'react'
import RecorriendoFormacion from './RecorriendoFormacion'
import { useSelector, useDispatch } from 'react-redux' 
import { titularesThunk } from '../../../store/slices/thunkTitulares'

const FormacionMenu = () => {

  let titulares = useSelector ((state) => state.jugadores.equipoTitular)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch (titularesThunk())
  }, [])


  return (
    <div className='plantilla-container'>
      <RecorriendoFormacion jugadores={titulares}/>
    </div>
  )
}

export default FormacionMenu