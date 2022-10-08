import React from 'react'
var _ = require('underscore');

const ValoresEquipo = (props) => {

  const {titulares} = props

  // Poder
  let valores = _.values(titulares?.map(e => e.valoracion))
  let count = valores.length;
  let sum = 0;

  for (let i = 0; i < count; i++) {
    sum += valores[i];
  }
  let valoracion_general = sum/count


  return (
    <div>
      <span>VALORACION PROMEDIO: {valoracion_general}</span>
    </div>
  )
}

export default ValoresEquipo
