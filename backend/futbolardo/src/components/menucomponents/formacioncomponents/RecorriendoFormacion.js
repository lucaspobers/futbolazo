import React, { Component } from 'react'
import Plantel from './Plantel'

export default class RecorriendoFormacion extends Component {
    render() {
    
        return (
        <div>
            { this.props.jugadores?.map(e =>
                <Plantel
                    e={e}
                    key={e.id}
                    id={e.id}
                    nombre={e.nombre} 
                    apellido={e.apellido}
                    pais={e.pais}
                    valoracion={e.valoracion}
                    posicion={e.posicion}
                    // formacion={this.props.formacion}
                    />)}
        </div>
    )
  }
}

// A RecorriendoFOrmacion le tiene que llegar como props desde Formacion el json y pasarselo a plantel