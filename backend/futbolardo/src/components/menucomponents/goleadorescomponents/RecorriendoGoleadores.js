import React from 'react'
import GoleadoresTabla from './GoleadoresTabla'

const RecorriendoGoleadores = (props) => {

    return (
    <div>
        { props.goleadores?.map((e, index) =>
            <GoleadoresTabla
                e={e}
                key={e.id}
                nombre={e.nombre}
                goles={e.goles}
                equipo={e.equipo}
                index={index}
                />)}
    </div>
  )
}


export default RecorriendoGoleadores