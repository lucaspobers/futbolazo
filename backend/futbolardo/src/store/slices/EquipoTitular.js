import { createSlice, current } from "@reduxjs/toolkit";

var _ = require('underscore');

let sliceTitulares = createSlice({
    name: 'sliceTitulares',
    initialState: {
        equipoTitular: [],
        equipoSuplente: [],
        firstSet: false,
    },
    reducers: {
        setTitulares: (state, action) => {
            if (state.firstSet === false){
                state.equipoTitular = action.payload.titulares
                state.equipoSuplente = action.payload.suplentes
                state.firstSet = true
            }
            // state.equipoTitular = action.payload.titulares
            // state.equipoSuplente = action.payload.suplentes
        },
        cambioJugador: (state, action) => {
            // Recibe los ID de los jugadores a cambiar
            let uno = action.payload.uno
            let dos = action.payload.dos

            let cambio_uno
            let index_uno
            let cambio_dos
            let index_dos

            // Busca donde se encuentran los jugadores y los guarda en una variable
            if (uno !== undefined && dos !== undefined && uno !== dos) {
                let actualTitular = current(state.equipoTitular)
                let actualSuplente = current(state.equipoSuplente)

                if (_.findWhere(actualTitular, {id: uno}) !== undefined) {
                    cambio_uno = _.findWhere(actualTitular, {id: uno})
                    index_uno = _.findIndex(actualTitular, {id: uno})
                }
                else if (_.findWhere(actualSuplente, {id: uno}) !== undefined) {
                    cambio_uno = _.findWhere(actualSuplente, {id: uno})
                    index_uno = _.findIndex(actualSuplente, {id: uno})
                }
                if (_.findWhere(actualTitular, {id: dos}) !== undefined) {
                    cambio_dos = _.findWhere(actualTitular, {id: dos})
                    index_dos = _.findIndex(actualTitular, {id: dos})
                }
                else if (_.findWhere(actualSuplente, {id: dos}) !== undefined) {
                    cambio_dos = _.findWhere(actualSuplente, {id: dos})
                    index_dos = _.findIndex(actualSuplente, {id: dos})
                }

                // Hace los reemplazos sin ambos jugadores son del equipo titular
                if (_.findWhere(actualTitular, cambio_uno) && _.findWhere(actualTitular, cambio_dos)){
                    
                    if (index_uno > index_dos){
                        actualTitular = _.without(actualTitular, cambio_uno) 
                        actualTitular = _.without(actualTitular, cambio_dos)
                        
                        actualTitular.splice(index_dos, 0, cambio_uno)
                        actualTitular.splice(index_uno, 0, cambio_dos)
                    }
                    else{
                        actualTitular = _.without(actualTitular, cambio_uno) 
                        actualTitular = _.without(actualTitular, cambio_dos)
                        
                        actualTitular.splice(index_uno, 0, cambio_dos)
                        actualTitular.splice(index_dos, 0, cambio_uno)                        
                   }
                }
                // Hace los reemplazos sin ambos jugadores son del equipo suplente
                else if(_.findWhere(actualSuplente, cambio_uno) && _.findWhere(actualSuplente, cambio_dos)){    
                    
                    if (index_uno > index_dos){
                        actualSuplente = _.without(actualSuplente, cambio_uno) 
                        actualSuplente = _.without(actualSuplente, cambio_dos)
                        
                        actualSuplente.splice(index_dos, 0, cambio_uno)
                        actualSuplente.splice(index_uno, 0, cambio_dos)
                    }
                    else{
                        actualSuplente = _.without(actualSuplente, cambio_uno) 
                        actualSuplente = _.without(actualSuplente, cambio_dos)
                        
                        actualSuplente.splice(index_uno, 0, cambio_dos)
                        actualSuplente.splice(index_dos, 0, cambio_uno)                        
                }}
                // 'Cambio_uno' es del equipo titular y 'cambio_dos' del suplente 
                else if(_.findWhere(actualTitular, cambio_uno) && _.findWhere(actualSuplente, cambio_dos)){
                    actualTitular = _.without(actualTitular, cambio_uno) 
                    actualSuplente = _.without(actualSuplente, cambio_dos)
                        
                    actualSuplente.splice(index_dos, 0, cambio_uno)
                    actualTitular.splice(index_uno, 0, cambio_dos)                 
                }
                // 'Cambio_uno' es del equipo suplente y 'cambio_dos' del titular
                else if(_.findWhere(actualSuplente, cambio_uno) && _.findWhere(actualTitular, cambio_dos)){
                    actualSuplente = _.without(actualSuplente, cambio_uno)
                    actualTitular = _.without(actualTitular, cambio_dos)

                    actualTitular.splice(index_dos, 0, cambio_uno)
                    actualSuplente.splice(index_uno, 0, cambio_dos)

                }
                // Los guarda en el state
                state.equipoTitular = actualTitular
                state.equipoSuplente = actualSuplente

            }
        },
        modificarValoracion: (state, action) => {
            
            // Copia el state actual
            let actualTitular = current(state.equipoTitular)

            // Identifica el jugador a modificar y donde se encuentra
            let jugador = _.findWhere(actualTitular, {id: action.payload.id})
            let index = _.findIndex(actualTitular, {id: action.payload.id})

            // Recibe la valoración ya modificada
            let nuevaValoracion = action.payload.valoracion 

            // Cambia la valoración en el jugador
            jugador = {...jugador, valoracion: nuevaValoracion}

            // Lo elimina y agrega el nuevo
            let nuevardo = _.without(actualTitular, actualTitular[index])
            nuevardo.splice(index, 0, jugador)

            console.log(nuevardo)
            // state.equipoTitular = nuevardo

        },
    },
    extraReducers: (builder) => {
        builder
            .addDefaultCase((state, action) => {})
    }

})


export const { cambio, setTitulares, cambioJugador, modificarValoracion} = sliceTitulares.actions

export default sliceTitulares.reducer

/*
CURRENT - Pertenece a la libreria immer, incluida en redux, lo que hace es devolver el state en el momento de ser llamado

setTitulares - Se le pone un if al principio para que solo se ejecute una vez, ya que si no, vuelve
               a cargar el equipo entero, no permitiendo que se guarden los cambios en el store.

CambioJugador - Si 'uno' y 'dos' NO son undefined, significa que el usuario hizo click en dos jugadores a cambiar, por lo tanto, se ejecuta el codigo de cambio de jugadores
              - En el siguiente if busca si el jugador esta en el equipo titular o suplente, y al
                encontrarlo, lo guarda en la variable 'cambio_uno' y 'index_uno', y lo elimina del array
              - El ultimo if usa el tamaño del array para saber si los cambios se hacen dentro del mismo equipo
                (titular o suplente) o entre ambos equipos. Si el cambio es entre ambos equipos es necesario
                determinar si primero se hizo click en un titular o suplente, para eso se agregan las variables
                'clickTitu' y 'clickSupl'.

- Al activar el without por primera vez, cuando busca el segundo index lo devuelve mal. CAMBIAR
DE LUGAR EL WITHOUT




*/ 
