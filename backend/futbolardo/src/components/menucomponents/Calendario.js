import React, { useEffect, useState } from 'react'
import RecorriendoCalendario from './calendariocomponents/RecorriendoCalendario'


const Calendario = () => {

    const [calendario, setCalendario] = useState(null)

    useEffect(() =>{
        fetch('http://localhost:8000/calendario-data/')
            .then(res => res.json())
            .then(res => setCalendario(res));
    },[])


  return (
    <div>
        <RecorriendoCalendario calendario={calendario}/>
    </div>
  )
}

export default Calendario