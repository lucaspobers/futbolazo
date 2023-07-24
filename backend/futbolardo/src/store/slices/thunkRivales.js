import { setFormacionRival } from './Fecha/sliceFecha';

var _ = require('underscore')


export const thunkRivales = () => {
    return async (dispatch, getState) => {
        const res = await fetch('http://localhost:8000/planteles_rivales/')
        const data = await res.json()

        const rival = getState().fecha.rival
        let plantel_rival = []

        _.mapObject(data, function(val, key) {
          if (key === rival) {
            plantel_rival.push(val);
          }
        });

        let formacion_rival = []
    
        const arquero_rival = _.sample(plantel_rival[0]?.filter(jugador => jugador.posicion === 'Arquero'))
        const defensores_rival = _.sample(plantel_rival[0]?.filter(jugador => jugador.posicion === 'Defensor'), 4)
        const mediocampistas_rival = _.sample(plantel_rival[0]?.filter(jugador => jugador.posicion === 'Mediocampista'), 3)
        const delanteros_rival = _.sample(plantel_rival[0]?.filter(jugador => jugador.posicion === 'Delantero'), 3)
    
        formacion_rival.push(arquero_rival, ...defensores_rival, ...mediocampistas_rival, ...delanteros_rival)

        dispatch(setFormacionRival(formacion_rival))

    }
};