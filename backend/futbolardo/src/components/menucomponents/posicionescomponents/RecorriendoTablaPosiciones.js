import React, { Component } from 'react'
import Posiciones from './Posiciones'

export default class RecorriendoTablaPosiciones extends Component {
    render() {
        
        return (
        <div>
            { this.props.posiciones?.map((e, index)=> 
                <Posiciones
                    e={e}
                    key={e.id}
                    equipo={e.nombre_equipo}
                    puntos={e.puntos_equipo}
                    goles_favor={e.goles_favor}
                    goles_contra={e.goles_contra}
                    index={index}
                    />)}

        </div>
    )
  }
}