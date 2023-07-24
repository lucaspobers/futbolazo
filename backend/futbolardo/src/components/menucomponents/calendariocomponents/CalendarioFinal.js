import React, { useState } from 'react'

var _ = require('underscore');

const CalendarioFinal = (props) => {
  
  const [ExtraRow, setExtraRow] = useState(false)
  const golesxfecha = props.golesxfecha
  let indicador = props.indicador

  const handleExtraRow = () => {
    setExtraRow(!ExtraRow)
  }

  const colorIndex = props.index.slice(-1)

  
  return (
    <div className={`grid grid-cols-5 border-b p-2 rounded-md ${colorIndex % 2 === 0 ? 'color1' : 'color2'}`} onClick={handleExtraRow}>
       <a href={`/rivales/${props.local}`}>
        <span>{props.local}</span>
      </a>
      <span> {props.goles_local} </span>
      <span> VS </span>
      <span> {props.goles_visitante} </span>
      <a href={`/rivales/${props.visitante}`}>
        <span>{props.visitante}</span>
      </a>
      {ExtraRow && golesxfecha && golesxfecha[indicador] && (
        <div className='col-span-5 grid grid-cols-2 gap-1'>
          <h3 className='col-span-2 underline m-2'>Goleadores</h3>
          <div>
            {Object.entries(golesxfecha[indicador]).map(([key, val]) => {
              if (props.local === val.equipo) {
                return (
                  <div key={key} className='text-center mx-16'>{val.nombre}</div>
                );
              }
              return null;
            })}
          </div>
          <div className='border-l-2'>
            {Object.entries(golesxfecha[indicador]).map(([key, val]) => {
              if (props.visitante === val.equipo) {
                return (
                  <div key={key} className='text-center mx-16'>{val.nombre} </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        )
      }
    </div>
  )
}


export default CalendarioFinal

