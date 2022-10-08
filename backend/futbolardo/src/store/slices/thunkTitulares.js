import { setTitulares } from "./EquipoTitular"

var jugadores;
let titulares;
let suplentes;

let arquero = false
let defensores = 0
let mediocampista = 0
let delantero = 0

let realizado = false


let getJugadores = (data) => {
    jugadores = data;

    for (let i = 0; i < jugadores?.length; i++) {
        if (jugadores[i].posicion === 'Arquero' && arquero === false) {
            jugadores[i].titular = 'True'
            arquero = true
        }
        if (jugadores[i].posicion === 'Defensor' && defensores < 4) {
            jugadores[i].titular = 'True'
            defensores++
        }
        if (jugadores[i].posicion === 'Mediocampista' && mediocampista < 4) {
            jugadores[i].titular = 'True'
            mediocampista++
        }
        if (jugadores[i].posicion === 'Delantero' && delantero < 2) {
            jugadores[i].titular = 'True'
            delantero++
        }
    }

    titulares = jugadores?.filter(jugador => jugador.titular === 'True')
    suplentes = jugadores?.filter(jugador => jugador.titular == null)

    return titulares, suplentes
}


export const titularesThunk = () => {
    return async ( dispatch, getState ) => { 
        const resp = await fetch('http://localhost:8000/equipo/')
        const data = await resp.json()
        
        if (realizado === false){
            getJugadores(data)
            realizado = true
        }
        dispatch(setTitulares({titulares: titulares, suplentes: suplentes}))

    }
}


/* 
    1 - Como React ejecuta las acciones dos veces, en la segunda ejecucion del thunk se vuelve
    a realizar el filtro de los jugadores, por lo que se vuelven a cargar los datos MAL. El IF 
    lo soluciona pero debe haber alguna manera mas idonea de hacerlo.


    */