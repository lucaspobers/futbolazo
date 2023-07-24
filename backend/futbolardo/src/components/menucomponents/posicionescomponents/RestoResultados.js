import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

var _ = require('underscore');

const RestoResultados = () => {

    const [restoLiga, setrestoLiga] = useState()

    useEffect(() => {
        fetch('http://localhost:8000/calendario-data/')
        .then(response => response.json())
        .then(response => setrestoLiga(response))
    }, [])

    let liga = useSelector(state => state.estadisticas.posiciones)
    let copiedLiga = _.clone(liga)

    
    let ganadores = []
    let empates = []
    
    _.mapObject(restoLiga?.fecha_1, (val, key) => {
        // Asigna de manera aleatoria goles a cada equipo
        val.goles_local = Math.floor(Math.random() * 5)
        val.goles_visitante = Math.floor(Math.random() * 5)

        if (val.goles_local > val.goles_visitante) {
            ganadores.push(val.local)
        }
        else if (val.goles_local < val.goles_visitante) {
            ganadores.push(val.visitante)
        }
        else if (val.goles_local === val.goles_visitante) {
            empates.push(val.local)
            empates.push(val.visitante)
        }
    })


    _.mapObject(copiedLiga, (val, key) => {
        if (ganadores.includes(val.nombre_equipo)) {
            let posicion = _.findIndex(copiedLiga, function(o) { return o.nombre_equipo === val.nombre_equipo; })
            let equipo = _.findWhere(copiedLiga, {nombre_equipo: val.nombre_equipo})
            
            equipo = {...equipo, puntos_equipo: equipo.puntos_equipo + 3}

            _.without(copiedLiga, copiedLiga[posicion])
            copiedLiga.splice(posicion, 1, equipo)
        }
        else if (empates.includes(val.nombre_equipo)) {
            let posicion = _.findIndex(copiedLiga, function(o) { return o.nombre_equipo === val.nombre_equipo; })
            let equipo = _.findWhere(copiedLiga, {nombre_equipo: val.nombre_equipo})

            equipo = {...equipo, puntos_equipo: equipo.puntos_equipo + 1}

            _.without(copiedLiga, copiedLiga[posicion])
            copiedLiga.splice(posicion, 1, equipo)
        }
    })


    
    return (
    <div>

    </div>
  )
}

export default RestoResultados


/*
    En este punto ya tengo la tabla con los puntos sumados ahora deberia:
    - Sumarle los goles
    - Pasarla a tabla del menu
*/