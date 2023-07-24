import { createSlice, current } from "@reduxjs/toolkit";

var _ = require('underscore');


const sliceEstadisticas = createSlice({
    name: "sliceEstadisticas",
    initialState: {
        goleadores: [],
        posiciones: [],
        firstSet: false,
        resultados: [],
        golesxfecha: {},
    },
    reducers: {
        setGoleadores: (state, action) => {
            let goleadores = current(state.goleadores)

            // Se define un array unicamente con los nombres de los jugadores y diferencia si ya forman parte o no
            let nombres = _.pluck(goleadores, 'nombre')
            let existe = _.contains(nombres, action.payload.nombre)
            
            // En caso de que el jugador ya forme parte de los goleadores, se le suma un gol
            switch (existe) {
                case true:
                    let index = nombres.indexOf(action.payload.nombre)
                    let golesAnt = goleadores[index].goles
                    goleadores = _.without(goleadores, goleadores[index])
                    goleadores = [...goleadores, {nombre: action.payload.nombre, equipo: action.payload.equipo, goles: golesAnt + 1}]
                    break;

                case false:
                    goleadores = [...goleadores, {nombre: action.payload.nombre, equipo: action.payload.equipo, goles: 1}]
                    break;

                default:
                    break;
            }
                    
            
            state.goleadores = goleadores
        },
        setStorePosiciones: (state, action) => {
          switch (state.firstSet) {
            case false:
              state.posiciones = action.payload
              state.firstSet = true
              break;
            default:
              break;
          }
        },
        updatePosiciones: (state, action) => {            
            let tabla = current(state.posiciones)
            let tabla_actualizada

            let ganador = action.payload.ganador
            let equipo = action.payload.equipo
            let rival = action.payload.rival

            let goles_local = action.payload.goles_local
            let goles_visitante = action.payload.goles_rival

            let copia_equipo = _.findWhere(tabla, {nombre_equipo: equipo})
            let copia_rival = _.findWhere(tabla, {nombre_equipo: rival});
                      
            let index_equipo = _.findIndex(tabla, {nombre_equipo: equipo})
            let index_rival = _.findIndex(tabla, {nombre_equipo: rival});
            
                        
            switch(ganador){
              case equipo:
                _.map(tabla, (equipo) => {
                  if (equipo.nombre_equipo === copia_equipo.nombre_equipo) {
                    
                    // Obtengo cuantos puntos, goles a favor y goles en contra tiene el equipo
                    let puntos_act = copia_equipo.puntos_equipo + 3
                    let goles_f = copia_equipo.goles_favor + goles_local
                    let goles_c = copia_equipo.goles_contra + goles_visitante
          
                    // Los actualizo en el objeto
                    copia_equipo = {...copia_equipo, puntos_equipo: puntos_act, goles_favor: goles_f, goles_contra: goles_c}
                    copia_rival = {...copia_rival, goles_contra: goles_f, goles_favor: goles_c}

                    // Actualizo la tabla con el nuevo objeto
                    tabla_actualizada = tabla
                    tabla_actualizada = _.without(tabla, tabla[index_equipo], tabla[index_rival])
                    tabla_actualizada.splice(0, 0, copia_equipo)
                    tabla_actualizada.splice(0, 0, copia_rival)

                    state.posiciones = tabla_actualizada
  
                  }})
                break;
              
              case rival:
                _.map(tabla, (equipo) => {
                  if (equipo.nombre_equipo === copia_rival.nombre_equipo) {
                      
                      // Obtengo cuantos puntos, goles a favor y goles en contra tiene el equipo rival
                      let puntos_act = copia_rival.puntos_equipo + 3
                      let goles_f = copia_rival.goles_favor + goles_visitante
                      let goles_c = copia_rival.goles_contra + goles_local
            
                      // Los actualizo en el objeto
                      copia_rival = {...copia_rival, puntos_equipo: puntos_act, goles_favor: goles_f, goles_contra: goles_c}
                      copia_equipo = {...copia_equipo, goles_contra: goles_f, goles_favor: goles_c}
                      
                      // Actualizo la tabla con el nuevo objeto
                      tabla_actualizada = tabla
                      tabla_actualizada = _.without(tabla, tabla[index_equipo], tabla[index_rival])
                      tabla_actualizada.splice(0, 0, copia_equipo)
                      tabla_actualizada.splice(0, 0, copia_rival)

                      state.posiciones = tabla_actualizada

                  }})
                break;
              
              case 'Empate':
                _.map(tabla, (equipo) => {
                  if (equipo.nombre_equipo === copia_equipo.nombre_equipo) {
                        
                    // Obtengo cuantos puntos, goles a favor y goles en contra tienen ambos equipos
                    let puntos_act = copia_equipo.puntos_equipo + 1
                    let puntos_act_rival = copia_rival.puntos_equipo + 1
                    let goles_f = copia_equipo.goles_favor + goles_local
                    let goles_c = copia_equipo.goles_contra + goles_visitante
          
                    // Los actualizo en el objeto
                    copia_equipo = {...copia_equipo, puntos_equipo: puntos_act, goles_favor: goles_f, goles_contra: goles_c}
                    copia_rival = {...copia_rival, puntos_equipo: puntos_act_rival, goles_favor: goles_c, goles_contra: goles_f}
          
                    // Actualizo la tabla con el nuevo objeto
                    tabla_actualizada = tabla
                    tabla_actualizada = _.without(tabla, tabla[index_equipo], tabla[index_rival])
                    tabla_actualizada.splice(0, 0, copia_equipo)
                    tabla_actualizada.splice(0, 0, copia_rival)
                    
                    state.posiciones = tabla_actualizada 
                  }})
                break;
              
              default:
                break;
            }

        
        },
        setRestoPosiciones: (state, action) => {
          
          let calendario = action.payload
          let ganadores = []
          let empates = []
          let perdedores = []
          let tabla = current(state.posiciones)
          let copiedLiga = tabla
          
          // Del resto de equipos, obtengo los ganadores y los empates
          _.mapObject(calendario, (val, key) => {            
            if (val.goles_local > val.goles_visitante) {
                ganadores.push(val.local)
                perdedores.push(val.visitante)
            }
            else if (val.goles_local < val.goles_visitante) {
                ganadores.push(val.visitante)
                perdedores.push(val.local)
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

                // Agrega goles a favor y en contra
                _.mapObject(calendario, (val, key) => { 

                    if (val.local === equipo.nombre_equipo) {
                      equipo = {...equipo, goles_favor: equipo.goles_favor + val.goles_local, goles_contra: equipo.goles_contra + val.goles_visitante}
                      return equipo
                    }
                    else if (val.visitante === equipo.nombre_equipo){
                      equipo = {...equipo, goles_favor: equipo.goles_favor + val.goles_visitante, goles_contra: equipo.goles_contra + val.goles_local}
                      return equipo
                    }
                })
    
                copiedLiga = _.without(copiedLiga, copiedLiga[posicion])
                copiedLiga.push(equipo)
            }
            else if (empates.includes(val.nombre_equipo)) {
                let posicion = _.findIndex(copiedLiga, function(o) { return o.nombre_equipo === val.nombre_equipo; })
                let equipo = _.findWhere(copiedLiga, {nombre_equipo: val.nombre_equipo})
    
                equipo = {...equipo, puntos_equipo: equipo.puntos_equipo + 1}

                // Agrega goles a favor y en contra
                _.mapObject(calendario, (val, key) => {
                    if (val.local === equipo.nombre_equipo || val.visitante === equipo.nombre_equipo ) {
                        equipo = {...equipo, goles_favor: equipo.goles_favor + val.goles_local, goles_contra: equipo.goles_contra + val.goles_visitante}
                        return equipo
                      }
                })
    
                copiedLiga = _.without(copiedLiga, copiedLiga[posicion])
                copiedLiga.push(equipo)
            }
            else if (perdedores.includes(val.nombre_equipo)) {
                let posicion = _.findIndex(copiedLiga, function(o) { return o.nombre_equipo === val.nombre_equipo; })
                let equipo = _.findWhere(copiedLiga, {nombre_equipo: val.nombre_equipo})

                // Agrega goles a favor y en contra
                _.mapObject(calendario, (val, key) => {
                    if (val.local === equipo.nombre_equipo) {
                        equipo = {...equipo, goles_favor: equipo.goles_favor + val.goles_local, goles_contra: equipo.goles_contra + val.goles_visitante}
                        return equipo
                    }
                    else if(val.visitante === equipo.nombre_equipo){
                      equipo = {...equipo, goles_favor: equipo.goles_favor + val.goles_visitante, goles_contra: equipo.goles_contra + val.goles_local}
                    }
                }
                )
                copiedLiga = _.without(copiedLiga, copiedLiga[posicion])
                copiedLiga.push(equipo)
            }
          })

          state.posiciones = copiedLiga
        },
        setResultados: (state, action) => {
          state.resultados = [...state.resultados, action.payload]
        },
        setGolesPorFecha: (state, action) => {
          const { fecha, goleadores } = action.payload;
          
          if (state.golesxfecha[fecha]) {
            state.golesxfecha = {
              ...state.golesxfecha,
              [fecha]: [...state.golesxfecha[fecha], ...goleadores],
            };
          } else {
            state.golesxfecha = {
              ...state.golesxfecha,
              [fecha]: goleadores,
            };
          }
          // state.golesxfecha = {
          //   ...state.golesxfecha,
          //   [fecha]: goleadores,
          // };
        },
    }
}) 

export const { setGoleadores, setStorePosiciones, updatePosiciones, setRestoPosiciones, setResultados, setGolesPorFecha } = sliceEstadisticas.actions

export default sliceEstadisticas.reducer


/*

  Resto Equipos: 
    - Capaz conviene hacer primero esto y despues agregarle los resultados de mi equipo
    
    CAMBIAR EL IF POR UN SWITCH
    DEBE HABER UNA MANERA MAS EFICIENTE DE PASAR LOS GOLES A FAVOR Y EN CONTRA



      



  */
