import React from 'react'
import { useSelector } from 'react-redux'

const RecorriendoPosiciones = (formacion) => {

    // const formacionActiva = formacion.formacion
    let formacionActiva = useSelector((state) => state.fecha.dibujo_formacion);
    formacionActiva = parseInt(formacionActiva)

    const f442 = ['AQ', 'DF', 'DF', 'DF', 'DF', 'MC', 'MC', 'MC', 'MC', 'DL', 'DL']
    const f433 = ['AQ', 'DF', 'DF', 'DF', 'DF', 'MC', 'MC', 'MC', 'DL', 'DL', 'DL']
    const f343 = ['AQ', 'DF', 'DF', 'DF', 'MC', 'MC','MC','MC', 'DL', 'DL', 'DL']
    const f352 = ['AQ', 'DF', 'DF', 'DF', 'MC', 'MC','MC','MC', 'MC', 'DL', 'DL']
    const f532 = ['AQ', 'DF', 'DF', 'DF', 'DF', 'DF', 'MC', 'MC', 'MC', 'DL', 'DL']
    const f541 = ['AQ', 'DF', 'DF', 'DF', 'DF', 'DF', 'MC', 'MC', 'MC', 'MC', 'DL']

  return (
  <div className='col-start-1 flex flex-col items-center border-r-2 border-black rounded-l-md overflow-hidden'>
    {formacionActiva === 442 && f442.map(e => (
      <span className={`py-0.4 min-w-full text-center opacity-90 flex-grow ${e === 'DL' ? 'bg-red-500' : (e === 'MC' ? 'bg-green-500' : (e === 'AQ' ? 'bg-yellow-500' : 'bg-blue-500'))}`}>{e}</span>
    ))}
    {formacionActiva === 433 && f433.map(e => (
      <span className={`py-0.4 min-w-full text-center opacity-90 flex-grow ${e === 'DL' ? 'bg-red-500' : (e === 'MC' ? 'bg-green-500' : (e === 'AQ' ? 'bg-yellow-500' : 'bg-blue-500'))}`}>{e}</span>
    ))}
    {formacionActiva === 343 && f343.map(e => (
      <span className={`py-0.4 min-w-full text-center opacity-90 flex-grow ${e === 'DL' ? 'bg-red-500' : (e === 'MC' ? 'bg-green-500' : (e === 'AQ' ? 'bg-yellow-500' : 'bg-blue-500'))}`}>{e}</span>
    ))}
    {formacionActiva === 352 && f352.map(e => (
      <span className={`py-0.4 min-w-full text-center opacity-90 flex-grow ${e === 'DL' ? 'bg-red-500' : (e === 'MC' ? 'bg-green-500' : (e === 'AQ' ? 'bg-yellow-500' : 'bg-blue-500'))}`}>{e}</span>
    ))}
    {formacionActiva === 532 && f532.map(e => (
      <span className={`py-0.4 min-w-full text-center opacity-90 flex-grow ${e === 'DL' ? 'bg-red-500' : (e === 'MC' ? 'bg-green-500' : (e === 'AQ' ? 'bg-yellow-500' : 'bg-blue-500'))}`}>{e}</span>
    ))}
    {formacionActiva === 541 && f541.map(e => (
      <span className={`py-0.4 min-w-full text-center opacity-90 flex-grow ${e === 'DL' ? 'bg-red-500' : (e === 'MC' ? 'bg-green-500' : (e === 'AQ' ? 'bg-yellow-500' : 'bg-blue-500'))}`}>{e}</span>
    ))}
  </div>

  )
}

export default RecorriendoPosiciones