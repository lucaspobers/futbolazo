import React, { Component } from 'react'
import CalendarioFinal from './CalendarioFinal'
var _ = require('underscore');

export default class RecorriendoCalendario extends Component {
    render() { 
        const calendario = this.props.calendario
        return (
        <div>
            {_.map(calendario, (e, i) => {
                return (
                    <div key={i}>
                        <span>------------------------------</span>
                        <br/><span>{i}</span><br/>
                        <span>------------------------------</span>
                        {_.map(e, (e, i) => {
                            return (
                                <CalendarioFinal 
                                key={i} 
                                local={e.local} 
                                visitante={e.visitante}/>
                            )
                        })}    
                    </div>
                )
            })}
        </div>
    )
  }
}

// En el primer mapeo devuelve todaas las fechas
// En el segundo mapeo devuelve todos los partidos de una fecha