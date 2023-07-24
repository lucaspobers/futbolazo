import { createSlice, current } from "@reduxjs/toolkit";

const slicePosiciones = createSlice({
    name: "slicePosiciones",
    initialState: {
        posiciones: [],
        firstLoad: false
    },
    reducers: {
        getPosiciones: (state, action) => {
            let actual = current(state.posiciones);
            
            console.log(actual);
            console.log(action.payload);
            console.log(state.posiciones)
        }
    }   
})

export const { getPosiciones } = slicePosiciones.actions

export default slicePosiciones.reducer