import React from 'react'

const CalendarioFinal = (props) => {
  return (
    <div >
      <span>{props.local}</span>
      <span> VS </span>
      <span>{props.visitante}</span>
    </div>
  )
}


export default CalendarioFinal