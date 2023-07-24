import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

var _ = require('underscore');

const PlantelesRivales = () => {

  const [planteles, setPlanteles] = useState([])
  const [plantel, setPlantel] = useState(null)

  const { rival } = useParams()
  
  useEffect(() => {
    fetch('http://localhost:8000/planteles_rivales/')
      .then(res => res.json())
      .then(res => setPlanteles(res))
  }, [])

  useEffect(() => {
    _.mapObject(planteles, function(val, key) {
      if (key === rival) {
        setPlantel(val);
      }
    });
  }, [planteles, rival]);  



  return (
    <div>
        <h2 className='text-center font-bold text-2xl'>{rival}</h2>
        <div className='m-2 border-2 border-black'>
          {plantel?.map(e =>{
            return (
              <div key={e.id} className='grid grid-cols-4 m-2 justify-center items-center grid-flow-col text-center'>
                <span>{e.nombre}</span>
                <span>{e.apellido}</span>
                <span>{e.posicion}</span>
                <span>{e.valoracion}</span>
              </div>
            )
          })}
        </div>
        <Link className='botones-menu' to='/menu'>Menu</Link>
    </div>
  )
}





export default PlantelesRivales