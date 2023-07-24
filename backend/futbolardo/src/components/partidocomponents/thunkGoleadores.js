import { setGoleadores } from "../../store/slices/Estadisticas/sliceEstadisticas"

var _ = require('underscore');

export const thunkGoleadores = (goleadores, goleadores_rival) => {
    
    return async (dispatch, getState) => {

        const miEquipo = getState().fecha.miEquipo
        const rival = getState().fecha.rival
    
        goleadores.map((goleador) => {
            
            const {nombre, apellido} = goleador
            const goleadorModificado = { nombre: `${nombre} ${apellido}`, equipo: miEquipo }
            
            dispatch(setGoleadores(goleadorModificado))
        })
        goleadores_rival.map((goleador) => {
            const {nombre, apellido} = goleador
            const goleadorModificado = { nombre: `${nombre} ${apellido}`, equipo: rival }
            
            dispatch(setGoleadores(goleadorModificado))
        })
    }
}
