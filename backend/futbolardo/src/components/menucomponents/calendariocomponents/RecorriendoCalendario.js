import React, { Component } from 'react'
import CalendarioFinal from './CalendarioFinal'

var _ = require('underscore');

export default class RecorriendoCalendario extends Component {
    render() { 
        const calendario = this.props.calendario
        const indicador = this.props.indicador
        const fecha = this.props.fecha
        const resultados = this.props.resultados
        const golesxfecha = this.props.golesxfecha
        
        let division_fecha = []
        let verdad

        _.mapObject(calendario, (e, i) => {
            division_fecha.push(e)
        })

        
        // En el caso de que indicador sea menor a la fecha mostramos los resultados ya consumados
        if (indicador < fecha) {
            verdad = true
        }
        else {
            verdad = false
        }

        switch (verdad) {
            case true:
                division_fecha = resultados
                break;
            case false:
                break;
            default:
                break;
        }

        
        // Ordenamos los resultados por sus keys para no afectar el css
        let objetoPartidos = _.clone(division_fecha[(indicador - 1)])

        const keysOrdenadas = _.keys(objetoPartidos);
        keysOrdenadas.sort();

        const objetoPartidosOrdenado = {};
        keysOrdenadas.forEach((key) => {
            objetoPartidosOrdenado[key] = objetoPartidos[key];
        });

        return (
        <div >
            {_.map(objetoPartidosOrdenado, (e, i ) => {
                return (
                    <CalendarioFinal 
                    key={i}
                    local={e.local}
                    goles_local={e.goles_local}
                    goles_visitante={e.goles_visitante}
                    visitante={e.visitante}
                    golesxfecha={golesxfecha}
                    indicador={indicador}
                    index={i}/>
                )
            })}
        </div>
    )
  }
}
