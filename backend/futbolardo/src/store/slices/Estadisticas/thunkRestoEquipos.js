import { setRestoPosiciones, setResultados, setGoleadores, setGolesPorFecha } from "./sliceEstadisticas";

var _ = require('underscore');

export const thunkRestoEquipos = (resultado_equipo) => {
    return async (dispatch, getState) => {
        const response = await fetch('http://localhost:8000/calendario-data/')
        const data = await response.json()

        const response2 = await fetch('http://localhost:8000/planteles_rivales/')
        const data2 = await response2.json()
        
        const fecha = getState().fecha.fecha
        const miEquipo = getState().fecha.miEquipo
        let golesxfecha = getState().estadisticas.golesxfecha
        let actual = 'fecha_' + fecha

        // Separamos la key para reasignarsela posteriormente
        let keyActual
        

        // El resultado de mi equipo se calcula por otro lado, asi que ni lo paso por el payload    
        _.each(data[actual], (value, key) => {
            if (value.local === miEquipo || value.visitante === miEquipo) {
                keyActual = key
                delete data[actual][key]
            }
        })

        let resultados_fecha = data[actual]

        // Determino el resto de resultados y lo mando al calculo de posiciones
        resultados_fecha = _.mapObject(data[actual], (val, key) => {
            return {
              ...val, 
              goles_local: Math.floor(Math.random() * 5), 
              goles_visitante: Math.floor(Math.random() * 5)
            };
          });
        dispatch(setRestoPosiciones(resultados_fecha))



        // Determino que jugadores son titulares y suplentes
        _.mapObject(data2, (val, key) => {
            _.mapObject(val, (val2, key2) => {
                if (val2.posicion === 'Arquero') {
                    const arqueros = Object.values(val).filter((jugador) => jugador.posicion === 'Arquero')
                    const cantidad_arqueros = 1
                    while (arqueros.filter(jugador => jugador.titular).length < cantidad_arqueros) {
                        const randomIndex = Math.floor(Math.random() * arqueros.length);
                        const arqueroTitular = arqueros[randomIndex];
                        arqueroTitular.titular = true;
                    }
                
                } else if (val2.posicion === 'Defensor') {
                    const defensores = Object.values(val).filter((jugador) => jugador.posicion === 'Defensor')
                    const cantidad_defensores = 4
                    while (defensores.filter(jugador => jugador.titular).length < cantidad_defensores) {
                        const randomIndex = Math.floor(Math.random() * defensores.length);
                        const defensorTitular = defensores[randomIndex];
                        defensorTitular.titular = true;
                    }

                } else if (val2.posicion === 'Mediocampista') {
                    const mediocampistas = Object.values(val).filter((jugador) => jugador.posicion === 'Mediocampista')
                    const cantidad_mediocampistas = 4
                    while (mediocampistas.filter(jugador => jugador.titular).length < cantidad_mediocampistas) {
                        const randomIndex = Math.floor(Math.random() * mediocampistas.length);
                        const mediocampistaTitular = mediocampistas[randomIndex];
                        mediocampistaTitular.titular = true;
                    }
                
                } else if (val2.posicion === 'Delantero') {
                    const delanteros = Object.values(val).filter((jugador) => jugador.posicion === 'Delantero')
                    const cantidad_delanteros = 2
                    while (delanteros.filter(jugador => jugador.titular).length < cantidad_delanteros) {
                        const randomIndex = Math.floor(Math.random() * delanteros.length);
                        const delanteroTitular = delanteros[randomIndex];
                        delanteroTitular.titular = true;
                    }
                }
            })

        })

        // Se asigna la probabilidad de convertir goles a cada jugador dependiendo de su posicion y si es titular o no
        _.mapObject(data2, (val, key) => {      
            _.mapObject(val, (val2, key2) => {
                
                let posicion = val2.posicion
                let probabilidad

                switch (posicion) {
                    case 'Arquero':
                        probabilidad = val2.titular ? 0.05 : 0
                        break;
                    case 'Defensor':
                        probabilidad = val2.titular ? 0.2 : 0.05
                        break;
                    case 'Mediocampista':
                        probabilidad = val2.titular ? 0.3 : 0.1
                        break;
                    case 'Delantero':
                        probabilidad = val2.titular ? 0.4 : 0.15
                }

                val2.probabilidad = probabilidad
            })
        })

        
        // Si el jugador hizo un gol la fecha pasada aumenta sus probabilidades de convertir
        const newData2 = _.mapObject(data2, (jugadores, equipo) => {
            const updatedJugadores = _.map(jugadores, jugador => {
              const nombreCompleto = jugador.nombre + ' ' + jugador.apellido;
          
              const existeNombreYApellido = _.findWhere(golesxfecha, {
                nombre: nombreCompleto
              });
          
              if (existeNombreYApellido) {
                return { ...jugador, forma: 'BUENA' };
              }
          
              return jugador;
            });
          
            return updatedJugadores;
          });
                    

        // La forma no llega a cambiar porque entiendo que ninguno cumple la condicion        

        function elegir_goleador(data2, equipo) {     
            let total_probabilidad = 0

            _.mapObject(data2[equipo], (val, key) => {
                total_probabilidad += val.probabilidad
            })

            const numero_random = Math.random() * total_probabilidad
            
            let sumaProbabilidades = 0

            for (const jugador of data2[equipo]) {
                sumaProbabilidades += jugador.probabilidad
                
                if (sumaProbabilidades > numero_random) {
                    return jugador;
                }
            }
        }
        
        
        
        // Asigno los goles a los jugadores de los rivales y los mando a la tabla de goleadores
        let goles_rivales = []

        _.mapObject(resultados_fecha, (val, key) => {
            let local = val.local
            let visitante = val.visitante
            let goles_local = val.goles_local
            let goles_visitante = val.goles_visitante


            for (let i = 0; i < goles_local; i++) {
                let jugadorObj = elegir_goleador(data2, local)
                let jugador = `${jugadorObj.nombre} ${jugadorObj.apellido}`
            
                goles_rivales.push({
                  nombre: jugador,
                  equipo: local
                })
            }

            for (let i = 0; i < goles_visitante; i++) {
                let jugadorObj = elegir_goleador(data2, visitante)
                let jugador = `${jugadorObj.nombre} ${jugadorObj.apellido}`
            
                goles_rivales.push({
                  nombre: jugador,
                  equipo: visitante
                })
            }
        })
        
        goles_rivales.map((goleador) => {
            dispatch(setGoleadores(goleador))
        })

        // Envio los goles por fecha
        dispatch(setGolesPorFecha({fecha: fecha, goleadores: goles_rivales}))

        // Le agrego el resultado de mi equipo y lo mando al calendario
        resultados_fecha = {...resultados_fecha, ...resultado_equipo}

        // Le cambio la key al partido de mi equipo para no afectar el calendario
        _.mapObject(resultados_fecha, (val, key) => {
            if (key === 'partido_10') {
                resultados_fecha[keyActual] = val
                delete resultados_fecha[key]

            }
        })
        
        dispatch(setResultados(resultados_fecha))

    }
}

/* 
    - Como despachamos la 'data' donde se encuentra la totalidad del calendario, filtrando
    por la fecha, el codigo del slice queda mucho mas prolijo.

    - Despachamos por un lado para el calculo de puntos y del otro para que quede registrado
    en el calendario

    AGREGAR - Importar desde el state los goles por fecha y hacer que los 'jugadores en forma'
    tengan mas probabilidades de convertir goles

*/