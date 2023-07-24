import { setStorePosiciones } from "../Estadisticas/sliceEstadisticas"

export const thunkPosiciones = () => {
    return async (dispatch, getState) => {
        const response = await fetch('http://localhost:8000/liga-data/')
        const data = await response.json()

        dispatch(setStorePosiciones(data))
        // s
    }
}